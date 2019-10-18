import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import SearchInput, { createFilter } from 'react-native-search-filter'
import Dashboard from 'react-native-dashboard'
import NewsAPI from "newsapi"
import moment from "moment"


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
            news: [
                {
                    "source": {
                        "id": null,
                        "name": "Letstalkbitcoin.com"
                    },
                    "author": "adam@letstalkbitcoin.com (The LTB Network), The LTB Network",
                    "title": "Yoni Assia: eToro '\" The Social Trading Platform",
                    "description": "We're joined by Yoni Assia, Founder and CEO of eToro. The concept behind this worldleading social trading platform is users invest smarter by automatically copying the top traders in the community. With over 10 million users, over a trillion dollars traded o…",
                    "url": "https://letstalkbitcoin.com/blog/post/epicenteryoniassiaetorothesocialtradingplatform?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+TheDailyBitcoinShow+%28Let%27s+Talk+Bitcoin+Network+Feed%29",
                    "urlToImage": "https://doughroller-wpengine.netdna-ssl.com/wp-content/uploads/2018/05/etoro-screenshot.jpg",
                    "publishedAt": "20191015T17:21:00Z",
                    "content": "Click to download audio version\r\nWere joined by Yoni Assia, Founder and CEO of eToro. The concept behind this worldleading social trading platform is users invest smarter by automatically copying the top traders in the community. With over 10 million users, … [+1397 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Forbes.com"
                    },
                    "author": "Justin O'Connell, Contributor, Justin O'Connell, Contributor https://www.forbes.com/sites/justinoconnell/",
                    "title": "MLB Crypto Bobbleheads Are Selling For Thousands of Dollars",
                    "description": "During the 2018 MLB baseball season, Lucid Sight released MLB Crypto Baseball, a beta version of MLBChampions, a digital collecting game in which fantasy players buy and sell collectibles that  earn rewards based on the results of real life baseball games.",
                    "url": "https://www.forbes.com/sites/justinoconnell/2019/10/15/mlbcryptobobbleheadsaresellingforthousandsofdollars/",
                    "urlToImage": "https://cdn.vox-cdn.com/thumbor/NwaDaHcae4J4dLYFWYGDEsLwfYQ=/0x0:787x390/1200x800/filters:focal(332x133:456x257)/cdn.vox-cdn.com/uploads/chorus_image/image/60361731/Screen_Shot_2018_07_13_at_12.07.28_PM.0.png",
                    "publishedAt": "20191015T17:18:43Z",
                    "content": "A 2018 digital figure of thenWashington Nationals outfielder Bryce Harper stamped on the Ethereum blockchain has sold for $7,300 (25 Eth), while a figure of LA Dodgers ace Clayton Kershaw sold for $3,500 (12.2 Eth).&amp;nbsp;The figures, bought and sold on t… [+25030 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Cyberciti.biz"
                    },
                    "author": "Vivek Gite",
                    "title": "8 Linux Commands: To Find Out Wireless Network Speed, Signal Strength And Other Information",
                    "description": "Linux operating systems comes with various set of tools allowing you to manipulate the Wireless Extensions and monitor wireless networks. Here is a list of Linux tools used for wireless network monitoring tools that can be used from your laptop or desktop sys…",
                    "url": "https://www.cyberciti.biz/tips/linuxfindoutwirelessnetworkspeedsignalstrength.html",
                    "urlToImage": "https://images.techhive.com/images/article/2016/11/linux-penguin-security-100694867-large.jpg",
                    "publishedAt": "20191015T17:15:00Z",
                    "content": "Linux operating systems come with a various set of tools allowing you to manipulate the Wireless Extensions and monitor wireless networks. Here is a list of Linux tools used for wireless network monitoring tools that can be used from your laptop or desktop sy… [+13930 chars]"
                },
                {
                    "source": {
                        "id": null,
                        "name": "Bitcoinist.com"
                    },
                    "author": "Christine Vasileva",
                    "title": "Nick Szabo: Ethereum (ETH) is Becoming a “Centralized Cult”",
                    "description": "The Ethereum (ETH) leadership is showing signs of becoming a force to be reckoned with, commented bitcoin pioneer Nick Szabo. While Ethereum was inherently democratic, the need to perform a series of hard forks and upgrades has put the developer team in charg…",
                    "url": "https://bitcoinist.com/nickszaboethereumethisbecomingacentralizedcult/",
                    "urlToImage": "https://miro.medium.com/max/3200/1*TgKD2N_ZldnnOfaNztZiWQ.png",
                    "publishedAt": "20191015T17:00:04Z",
                    "content": "The Ethereum (ETH) leadership is showing signs of becoming a force to be reckoned with, commented bitcoin pioneer Nick Szabo. While Ethereum was inherently democratic, the need to perform a series of hard forks and upgrades has put the developer team in charg… [+2765 chars]"
                },
                {
                    "source": {
                        "id": "thenextweb",
                        "name": "The Next Web"
                    },
                    "author": "Yessi Bello Perez",
                    "title": "An overview of Facebook’s ‘cryptocurrency’ supporters — who’s in and who’s out",
                    "description": "Facebook sent the world into a frenzy when it announced its intention to enter the payments space with the launch of its controversial ‘cryptocurrency‘ Libra earlier this year. Initially, Facebook said it had garnered support from 28 companies, including some…",
                    "url": "https://thenextweb.com/hardfork/2019/10/15/anoverviewoffacebookscryptocurrencysupporterswhosinandwhosout/",
                    "urlToImage": "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1071837022%2F960x0.jpg%3Ffit%3Dscale",
                    "publishedAt": "20191015T16:46:31Z",
                    "content": "Facebook sent the world into a frenzy when it announced its intention to enter the paymentsspace with the launch of its controversial cryptocurrency Libra earlier this year.\r\nInitially, Facebook said it had garnered support from 28 companies, including some o… [+6645 chars]"
                }]
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

    goInDepth = cArticle => this.setState({ inDepthView: cArticle })

    goBack = () => this.setState({ inDepthView: {} })

    updateSearch = text => this.setState({ filter: text })

    render() {
        const { news, filter } = this.state
        return (
            <View>
                {news.length ?
                    <ScrollView style={{ marginTop: 15, marginBottom: 20, padding: 20 }}>
                        <SearchInput
                            onChangeText={(term) => { this.updateSearch(term) }}
                            style={styles.searchInput}
                            placeholder="Type a message to search"
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
                                        title='READ STORY'
                                        onPress={() => this.goInDepth(article)}
                                    />
                                </Card>
                            )}
                    </ScrollView>
                    : <Text>{"Couldn't get news!"}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1
    }
})
