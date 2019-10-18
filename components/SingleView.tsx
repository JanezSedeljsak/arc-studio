import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { Card, ListItem, Button, Icon, SearchBar } from 'react-native-elements'
import moment from "moment"


export interface Props { article: any }
interface State {}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    goBack = () => console.log("go back");

    render() {
        const { article } = this.props
        return (
            <View>
                <Card
                    key={"_singleView"}
                    image={{ uri: article.urlToImage }}
                    title={article.title}>
                    <Text style={{ marginBottom: 10 }}>
                        {article.description}
                    </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='GO BACK'
                        onPress={this.goBack}
                    />
                </Card>
            </View>
        )
    }
}
