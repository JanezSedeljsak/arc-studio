import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default function App() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={{width: "100%"}}>
                    <CardImage
                        source={{ uri: 'http://bit.ly/2GfzooV' }}
                        title="Top 10 South African beaches"
                    />
                    <CardTitle
                        subtitle="Number 6"
                    />
                    <CardContent text="Clifton, Western Cape" />
                    <CardAction
                        separator={true}
                        inColumn={false}>
                        <CardButton
                            onPress={() => { }}
                            title="Share"
                            color="#FEB557"
                        />
                        <CardButton
                            onPress={() => { }}
                            title="Explore"
                            color="#FEB557"
                        />
                    </CardAction>
                </Card>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
