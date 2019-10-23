import React, { FunctionComponent } from 'react'
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
    ImageBackground,
    FlatList
} from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from 'moment'
import ForecastCard from './ForecastCard';

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
            },
            (error) => this.setState({ forecast: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    getWeather() {

        // Construct the API url to call
        let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=' + "70ef7d1ecc959f4ef1a91a8a4ab7a914";

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
        return (
            <FlatList data={this.state.forecast.list} style={{ marginTop: 20 }} keyExtractor={(item : any) => item.dt_txt} renderItem={({ item }) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} />
        );
    }
}