import * as React from 'react'
import { StyleSheet, Text, View, Alert, BackHandler } from 'react-native'
import { Card } from 'react-native-elements'
import Dashboard from 'react-native-dashboard'
import Spinner from 'react-native-loading-spinner-overlay'
import GestureRecognizer from 'react-native-swipe-gestures'

// my components
import Nasa from './components/Nasa'
import Weather from './components/Weather'
import News from './components/News'

export interface Props { /* no props for the main component */ }

interface State {
    isLoading: boolean,
    currView: any
} 

const items: Array<Object> = [
    { name: 'Weather', background: '#b5cc92', icon: 'cloud' },
    { name: 'Nasa', background: '#9de0ad', icon: 'space-shuttle' },
    { name: 'News', background: '#45ada8', icon: 'folder-open' },
    { name: 'Close', background: '#547980', icon: 'close' }
]

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isLoading: false,
            currView: null
        }
    }

    gotoHome = () => this.setState({ currView: null })

    // when component starts loading
    componentWillMount = () => this.setState({ isLoading: true })

    //when it's done loading
    componentDidMount = () => setTimeout(() => this.setState({ isLoading: false }), 2000)


    switchView = view => (view.name === 'Close') ?
        BackHandler.exitApp()
        : this.setState({ currView: view.name })

    render() {
        const components : Object = { 
            Nasa: <Nasa back={this.gotoHome} />, 
            Weather: <Weather back={this.gotoHome}/>, 
            News: <News back={this.gotoHome}/> 
        }
        return (
            <View style={styles.container}>
                <View>
                    <Spinner
                        visible={this.state.isLoading}
                        textContent={'Loading...'}
                        textStyle={{ color: '#FFF' }}
                    />
                    {!this.state.currView && !this.state.isLoading ?
                        <View>
                            <Card
                                key={'_dashCard'}
                                image={{ uri: 'https://arcstudiopro.com/img/og.png' }}>
                                <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                                    {'Welcome to my app for viewing the latest news, checking weather around the world... Or even looking at a cool post from NASA each day.'}
                                </Text>
                                <Text style={{ fontWeight: 'bold' }}>{'Hope you enjoy!\n\n-Janez'}</Text>
                            </Card>
                            <Dashboard items={items} background={true} card={(el: any) => this.switchView(el)} column={2} />
                        </View>
                        :
                        <GestureRecognizer onSwipeLeft={this.gotoHome}>
                            <View>{components[this.state.currView]}</View>
                        </GestureRecognizer>
                        
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
