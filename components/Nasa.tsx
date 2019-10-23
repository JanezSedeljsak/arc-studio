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
            data: { 
                "date":"2019-10-23",
                "explanation":"The painting Starry Night is one of the most famous icons of the night sky ever created.   The scene was painted by Vincent van Gogh in southern France in 1889.   The swirling style of Starry Night appears, to many, to make the night sky come alive.   Although van Gogh frequently portrayed real settings in his paintings, art historians do not agree on precisely what stars and planets are being depicted in Starry Night.   The style of Starry Night is post-impressionism, a popular painting style at the end of the nineteenth century.  The original Starry Night painting hangs in the Museum of Modern Art in New York City, New York, USA.   New: APOD Read to You by AI",
                "hdurl":"https://apod.nasa.gov/apod/image/1910/StarryNight_VanGogh_30000.jpg",
                "media_type":"image",
                "service_version":"v1",
                "title":"Starry Night by Vincent van Gogh",
                "url":"https://apod.nasa.gov/apod/image/1910/StarryNight_VanGogh_970.jpg"
            }
        };
    }

    componentWillMount() {
        /*fetch(
            'https://api.nasa.gov/planetary/apod?api_key=bzYdhe9wEL2NXaCklkQWwoMMXVBeouzkTKA0qYXA'
        )
            .then(x => x.json())
            .then(result => this.setState({ data: result }));*/
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
