import React, { FunctionComponent } from 'react'
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    FlatList,
    ScrollView
} from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from 'moment'

export interface Props {
    back: any
}

interface State {
    latitude: Number,
    longitude: Number,
    forecast: any,
    error: any
}

export default class Weather extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            forecast: [],
            error: ''
        };
    }

    componentDidMount() {
        // Get the user's location
        this.getLocation();
    }

    getLocation() {

        // Get the current position of the user
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState(
                    (prevState) => ({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }), () => { this.getWeather(); }
                );
                console.log(this.state.forecast)
            },
            (error) => this.setState({ forecast: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    getWeather() {

        // Construct the API url to call
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&units=metric&appid=` + "70ef7d1ecc959f4ef1a91a8a4ab7a914";

        // Call the API, and set the state of the weather forecast
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState((prevState, props) => ({
                    forecast: data
                }));
            })
    }

    render() {
        const { forecast } = this.state
        return (
            <ScrollView style={{ marginTop: 20, marginBottom: 50, padding: 20 }}>
                {forecast.list && <View>
                        {forecast.list.map((item : any, _index: String ) =>
                            <Card
                                key={_index}
                                image={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
                                title={`${moment(new Date(item.dt * 1000)).format("HH:mm")}`}>
                                <Text style={{ marginBottom: 10 }}>
                                    {"Weather: "}
                                    <Text style={{ fontWeight: 'bold' }}>{item.weather[0].description}{"\n"}</Text>
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    {"Temperature: "}
                                    <Text style={{ fontWeight: 'bold' }}>{Math.round(item.main.temp * 10) / 10}&#8451;{"\n"}</Text>
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    {"Humidity: "}
                                    <Text style={{ fontWeight: 'bold' }}>{item.main.humidity}{"%\n"}</Text>
                                </Text>
                                <Text numberOfLines={1}>{"_________________________________________________________________________________"}</Text>
                            </Card>
                        )}
                    </View>
                }
            </ScrollView>
        )
    }
}