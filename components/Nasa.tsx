import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from 'moment'

export interface Props {
    back: any;
}

interface State {
    isLoading: boolean;
    data: any;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            data: {}
        };
    }

    componentWillMount() {
        this.fetchFromNasa()
    }

    fetchFromNasa = async() => {
        fetch(
            'https://api.nasa.gov/planetary/apod?api_key=bzYdhe9wEL2NXaCklkQWwoMMXVBeouzkTKA0qYXA'
        )
            .then(x => x.json())
            .then(result => this.setState({ data: result }))
    }



    render() {
        const { data } = this.state
        return (
            <View>
                {typeof data === 'object' &&
                    <Card key={'_dashCard'} image={{ uri: data.url }} title={data.title}>
                        
                        <Text>{data.date}</Text>
                        <Text>{"\n"}{data.explanation}</Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0
                            }}
                            title='Back'
                            onPress={this.props.back}
                        />
                    </Card>
                }
            </View>
        );
    }
}
