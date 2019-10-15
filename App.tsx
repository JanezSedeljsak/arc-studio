import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import NewsAPI from "newsapi"
import moment from "moment"


export interface Props { /* no props for the main component */ }

interface State {
    filter: string,
    news: Array<any>
    inDepthView: Object
    isLoading: boolean
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            filter: "",
            inDepthView: {
                isView: false,
                index: null
            },
            isLoading: false,
            news: []
        }
    }

    componentWillMount() {
        /*this.setState({ isLoading: true })
        const newsapi : any = new NewsAPI("8717edacdc164636841ed4b6c551b178")
        newsapi.v2.topHeadlines({ sources: 'bbcnews,theverge', language: "en" })
            .then(response => {
                this.setState({ news: response.articles, isLoading: false })
            })*/
    }

    updateSearch = filter => this.setState({ filter })

    render() {
        const { news, filter } = this.state
        return (
            <View style={styles.container}>
                {news.length ?
                    <ScrollView style={{ marginTop: 15, marginBottom: 20, padding: 20 }}>
                        <SearchBar
                            placeholder="Filter articles..."
                            onChangeText={this.updateSearch}
                            value={filter}
                        />
                        {news
                            .filter(article => article.title.includes(filter))
                            .map((article, _index) =>
                            
                                <Card
                                    key={_index}
                                    image={{ uri: article.urlToImage }}
                                    title={article.title}>
                                    <Text style={{ marginBottom: 10 }}>
                                        {article.description}
                                    </Text>
                                    <Button
                                        icon={<Icon name='code' color='#ffffff' />}
                                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                        title='READ STORY' />
                                </Card>
                            )}

                    </ScrollView>
                    : <Text>{"Couldn't get news!"}</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
