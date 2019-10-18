import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from "moment"


export interface Props { /* no props for the main component */ }

interface State {
    isLoading: boolean
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render() {
        return (
            <View>
                <Text>{"Weather"}</Text>
            </View>
        )
    }
}
