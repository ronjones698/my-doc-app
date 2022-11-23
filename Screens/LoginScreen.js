import { View, Text, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context";
import PercentageObject from "../percentage";
import React, { Component } from "react";
import StateTree from "./state"


export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = { socketObject: null, email: null, password:null, loggedIn:true };
  }
  submit() {
      const payload = {
          email: this.state.email,
          password: this.state.password
      }
      fetch("http://192.168.137.43:8000/api/token/obtain/", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type':'application/json',
        },
      }).then((data)=>{
          return data.json()
      }).then((data)=>{
          if(data.access){
              StateTree.set_user(this.state.email)
              this.props.navigation.navigate("profile")
          }else {
              this.setState({...this.state,loggedIn:false,password:null,email:null});
              console.log(data);
          }
        
      })

  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
                  <View style={styles.ImageView}>
                     <Text style={{color:"#fff",marginVertical:40,fontSize:28,fontWeight:'600'}}>MyDocKe</Text>
                  </View>
                  
            <View style={styles.Form}>
                <TouchableOpacity style={styles.opacityHeader} onPress={()=>{navigation.navigate("Home")}} activeOpacity={0.8}>
                    <View style={styles.btnHeader}>
                        <Text style={{color:"#fff",marginVertical:10,fontSize:24,fontWeight:'600'}}>MyDocKe</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.ErrorMessage}>{this.state.loggedIn ? "":"Incorrect login credentials"}</Text>
                <View style={styles.FormField}>
                    <Text style={styles.FieldHeader}>Email</Text>
                    <TextInput onChangeText={(e)=>this.setState({...this.state,email:e})} style={styles.FieldInput} value={this.state.email} placeholder="Enter your Email adress or Id number"/>
                </View>
                <View style={styles.FormField}>
                    <Text style={styles.FieldHeader}>Password</Text>
                    <TextInput secureTextEntry={true} value={this.state.password} onChangeText={(e)=>this.setState({...this.state,password:e})} style={styles.FieldInput} placeholder="Enter your Login Password"/>
                </View>
                <Text style={styles.Agreement}>By signing-in to your account, you agree to adhere to our policy and guidelines and accept the courtesy requirements of the platform</Text>
                <TouchableOpacity style={styles.opacity} onPress={()=>{this.submit()}} activeOpacity={0.8}>
                    <View style={styles.btn}>
                        <Text style={styles.btnTittle}>SIGN-IN TO ACCOUNT</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:50,
    backgroundColor:'#2f855a',
    zIndex: -1,
    flexGrow:1,
},
RegisterImage:{
    height:PercentageObject.HeightPercentage(20),
    width:PercentageObject.WidthPercentage(40),
},
FormImage:{
    height:PercentageObject.HeightPercentage(10),
    width:PercentageObject.WidthPercentage(80),
    borderRadius:PercentageObject.WidthPercentage(2),
    marginVertical:PercentageObject.HeightPercentage(0.2)
},
Form:{
    width:PercentageObject.WidthPercentage(90),
    backgroundColor:'#fff',
    borderRadius:5,
    elevation:20,
},
FormField:{
    paddingHorizontal:20,
    paddingVertical:5,
},
FieldInput:{
    padding:10,
    height:50,
    color:'grey',
    borderWidth:2,
    borderColor:'#2f855a',
    borderRadius:10
},
FieldHeader:{
    padding:5,
    color:'grey',
    fontWeight:'600'
},
ImageView:{
    height:PercentageObject.HeightPercentage(20),
},
Agreement:{
    maxWidth:PercentageObject.WidthPercentage(83),
    color:'grey',
    fontSize:16,
    padding:5,
    marginHorizontal:PercentageObject.WidthPercentage(5)
},
ErrorMessage:{
    padding:3,
    color:'#2f855a',
    fontWeight:'600',
    marginLeft: "auto",
    marginRight:"auto"
},
btnTittle:{
    fontWeight:'500',
    color:'#ffff',
    fontSize:18,
},
SecondarybtnTittle:{
    fontWeight:'500',
    color:'rgb(1,180,82)',
    fontSize:17,
},
btn:{
    backgroundColor:"#2f855a",
    padding:10,
    width:PercentageObject.WidthPercentage(81),
    borderRadius:PercentageObject.WidthPercentage(2),
    display:'flex',
    alignItems:'center',
    marginHorizontal:PercentageObject.WidthPercentage(5),
    marginVertical:PercentageObject.WidthPercentage(2),
    borderWidth:2,
    borderColor:'rgb(1,140,82)'
    
},
Secondarybtn:{
    backgroundColor:"#fff",
    padding:10,
    width:PercentageObject.WidthPercentage(81),
    borderRadius:PercentageObject.WidthPercentage(2),
    display:'flex',
    alignItems:'center',
    marginHorizontal:PercentageObject.WidthPercentage(5),
    marginVertical:PercentageObject.WidthPercentage(2),
    borderWidth:2,
    borderColor:'rgb(1,180,82)'
},
opacity:{
    borderRadius:PercentageObject.WidthPercentage(10)
},
opacityHeader:{
    borderRadius:PercentageObject.WidthPercentage(10)
},
btnHeader:{
    backgroundColor:"#2f855a",
    padding:10,
    width:PercentageObject.WidthPercentage(81),
    height:PercentageObject.HeightPercentage(10),
    borderRadius:PercentageObject.WidthPercentage(2),
    display:'flex',
    alignItems:'center',
    marginHorizontal:PercentageObject.WidthPercentage(5),
    marginVertical:PercentageObject.WidthPercentage(2),
    borderWidth:2,
    borderColor:'rgb(1,140,82)',
    flexDirection:'column'
    
},
});
