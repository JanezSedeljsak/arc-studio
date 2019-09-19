import React, { Component } from 'react';
import {Alert, Text, View, StyleSheet, Button, Image } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { timesClicked: 0};
  }
  click() {
    this.setState({ timesClicked: ++this.state.timesClicked })
    if(this.state.timesClicked === 50)  {
      Alert.alert(
         "bravo ful si gey"
      )
    } else if(this.state.timesClicked === 100) {
        Alert.alert(
          "bravo še bol vlek gey si"
        ) 
    }
  }
  reset(){
   this.setState({ timesClicked: 0 }) 
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={{fontSize: 40, fontWeight: "bold", color: "#599"}}>{"cuki clicker BOI"}</Text>
          <Button
            title="Press me"
            onPress={() => this.click()}
          />
          <Text>{"___________"}</Text>
        <Button
            title="Reset boi"
            onPress={() => this.reset()}
          />
          
          <Text style={{fontSize: 20}}>{"Times clicked: "}{this.state.timesClicked}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});
