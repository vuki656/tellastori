import {
    FontAwesome,
    Foundation,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

import { CreateNewPostScreen } from './screens/CreateNewPostScreen'
import { PostsScreen } from './screens/PostsScreen'

const Tab = createBottomTabNavigator()

enum Tabs {
    STORIES = 'Stories',
    POST = 'Post'
}

export default function AppRoot() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={(props) => ({
                    tabBarIcon: (iconProps) => {
                        switch (props.route.name) {
                            case Tabs.STORIES:
                                return (
                                    <FontAwesome
                                        color={iconProps.focused ? 'black' : '#cccccc'}
                                        name="newspaper-o"
                                        size={24}
                                    />
                                )
                            case Tabs.POST:
                                return (
                                    <Foundation
                                        color={iconProps.focused ? 'black' : '#cccccc'}
                                        name="pencil"
                                        size={24}
                                    />
                                )
                        }
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: '#cccccc',
                    labelStyle: {
                        fontWeight: 'bold',
                        paddingTop: 15,
                    },
                    style: {
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        height: 60,
                        padding: 20,
                    },
                }}
            >
                <Tab.Screen
                    component={PostsScreen}
                    name={Tabs.STORIES}
                />
                <Tab.Screen
                    component={CreateNewPostScreen}
                    name={Tabs.POST}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
