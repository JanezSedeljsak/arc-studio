import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from 'moment'


export interface Props {
    back: any
}

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

    componentWillMount() {
        fetch('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22')
            .then(x => x.json).then(response => console.log(response));
    }

    render() {
        return (
            <View>
                <Text>{'Weather'}</Text>
                <Button onPress={this.props.back} title='Back' />
            </View>
        )
    }
}
