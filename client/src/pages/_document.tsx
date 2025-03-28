import type {
    DocumentContext,
    DocumentInitialProps,
} from 'next/document'
import Document, {
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import { GA_TRACKING_ID } from '../lib/useGoogleAnalitics/googleTag'

class CustomDocument extends Document {
    static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = context.renderPage

        try {
            context.renderPage = () => {
                return originalRenderPage({
                    enhanceApp: (App) => {
                        return (props) => {
                            return sheet.collectStyles(<App {...props} />)
                        }
                    },
                })
            }

            const initialProps = await Document.getInitialProps(context)

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    public render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        content="#febb01"
                        name="theme-color"
                    />
                    <script
                        async={true}
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_TRACKING_ID}', {
                                  page_path: window.location.pathname,
                                });
                          `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument
