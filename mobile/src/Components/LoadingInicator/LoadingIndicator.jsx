import * as React from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

const styles = StyleSheet.create({ root: { marginTop: 50 } })

export const LoadingIndicator = () => {
    return (
        <View style={styles.root}>
            <ActivityIndicator
                color="#0083ff"
                size="large"
            />
        </View>
    )
}
