import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import SearchInput, { createFilter } from 'react-native-search-filter'
import Dashboard from 'react-native-dashboard'
import NewsAPI from "newsapi"
import moment from "moment"
import SingleView from "./SingleView"


export interface Props { back: any }

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
            inDepthView: {},
            isLoading: false,
            news: []
        }
    }

    componentWillMount() {
        this.getNewsFrom()
    }

    getNewsFrom  = async() => {
        fetch('https://newsapi.org/v2/everything?q=bitcoin&from=2019-10-07&sortBy=publishedAt&apiKey=8717edacdc164636841ed4b6c551b178')
            .then(x => x.json())
            .then(result => this.setState({ news: result.articles }))
    }

    goInDepth = cArticle => {
        this.setState({ inDepthView: cArticle })
        console.log(cArticle, "blablabla");
    }

    goBack = () => this.setState({ inDepthView: {} })

    updateSearch = text => this.setState({ filter: text })

    render() {
        const { news, filter, inDepthView } = this.state
        if(Object.getOwnPropertyNames(inDepthView).length === 0) {
            return (
                <View>
                    {news.length ?
                        <ScrollView style={{ marginTop: 20, marginBottom: 50, padding: 20 }}>
                            <SearchInput
                                onChangeText={(term) => { this.updateSearch(term) }}
                                style={styles.searchInput}
                                placeholder="Filter articles..."
                            />
                            {news
                                .filter(article => article.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
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
                                            title='READ STORY'
                                            onPress={() => this.goInDepth(article)}
                                        />
                                    </Card>
                                )}
                        </ScrollView>
                        : <Text>{"Loading...."}</Text>
                    }
                </View>
            )    
        } else {
            return (
                <SingleView article={inDepthView} back={this.goBack}/>
            )
        }

    }
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    }
})
