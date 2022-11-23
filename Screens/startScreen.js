import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context";
import PercentageObject from "../percentage";
import React, { Component } from "react";


export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = { socketObject: null };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.Tittle}>MyDocKe</Text>
          <Text style={styles.greeting}>Hello and welcome to the myDocKe App</Text>
          <TouchableOpacity activeOpacity={0.85}  onPress={()=>{this.props.navigation.navigate("Login")}}>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>GET STARTED NOW</Text>
              </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  btnContainer: {
      backgroundColor: "#2f855a",
      padding: 10,
      width: PercentageObject.WidthPercentage(60),
      alignItems: "center",
      marginTop: PercentageObject.HeightPercentage(5),
      borderRadius: 25,
      alignSelf: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "500",
  },
  Tittle: {
    alignSelf: "center",
    color: "#2f855a",
    fontSize: 30,
    fontWeight: "500",
    margin: PercentageObject.HeightPercentage(2),
  },
  greeting: {
    alignSelf: "center",
    color: "gray",
    fontSize: 18,
  }
});
