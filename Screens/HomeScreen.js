import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from "react-native-safe-area-context";
import PercentageObject from "../percentage";
import Doctor from "../Images/doctor.jpg";
import { useEffect,useState } from "react"
import StateTree from "./state";

const NewScan = ({navigation}) => {
  function renew() {
    console.log("Rerouting")
    navigation.navigate("Camera");
  }
  return (
    <View style={styles.NewScan}>
      <TouchableOpacity activeOpacity={0.85} onPress={()=>{renew()}}>
            <Text style={styles.NewScanText}>scan new patient</Text>
      </TouchableOpacity>
  </View>
  )
}

const Homescreen = ({ navigation, route }) => {
  const [user,setUser] = useState({})
  const [authenticated,setAuthenticated] = useState(false)
  const [v_id,setV_id] = useState(StateTree.get_visit())
  console.log("Visit:",v_id);

  useEffect(()=> {
    function getUser() {
      const email = StateTree.get_user();
      const head = email.split(".");
      const url = "http://192.168.137.43:8000/api/user/" + head[0] + "/get_user_by_email/";
      fetch(url)
       .then(data => {
         return data.json()
       })
       .then((data)=>{
         setUser(data.Message);
       })

    }
    getUser()
  }, []);
  function reroute() {
    if(StateTree.current_visit){
      navigation.navigate("Form",StateTree.current_visit);
    }else{
      navigation.navigate("Camera");
    }
  
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
          <Text style={styles.logo}>MyDocKe</Text>
          <Image style={styles.imageDiv} source={{uri: user.imageUrl}} />
      </View>
      <View style={styles.userContainer}>
        <View style={styles.profileDetails}>
          <Text style={styles.top}>Hello there,</Text>
          <Text style={styles.bottom}>{user.first_name} {user.second_name} {user.last_name}</Text>
        </View>
      </View>
      <View style={styles.scan}>
        <Text style={styles.scanText}>{StateTree.current_visit ? "Use this code to make a claim":""}</Text>
        <Text style={styles.scanText}>{ StateTree.current_visit ? StateTree.current_visit:"Click to capture patient face scan" }</Text>
        <TouchableOpacity activeOpacity={0.85} onPress={()=>{reroute()}}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>{StateTree.current_visit ? "UPLOAD CLAIM FORM":"GET PATIENT FACE SCAN"}</Text>
          </View>
        </TouchableOpacity>
        {StateTree.current_visit ? <NewScan navigation={navigation} /> : <View></View>}
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    flex: 1,
  },
  userContainer: {
      padding: 10,
  },
  nav: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
  },
  logo: {
      color: "#2f855a",
      fontWeight: "600",
      fontSize: 20,
  },
  imageDiv: {
    height: PercentageObject.HeightPercentage(6),
    width: PercentageObject.WidthPercentage(12),
    borderRadius: PercentageObject.HeightPercentage(10),
    objectFit: "contain",
    borderColor: "#2f855a",
    borderWidth: 2,
    marginRight: 10,
  },
  top: {
      fontSize: 28,
      color: "black",
      fontWeight: "400",
  },
  bottom: {
    fontSize: 24,
    color: "gray",
  },
  btnContainer: {
    backgroundColor: "#2f855a",
    padding: 15,
    width: PercentageObject.WidthPercentage(60),
    alignItems: "center",
    marginTop: PercentageObject.HeightPercentage(0.5),
    borderRadius: 10,
    alignSelf: "center",
},
    btnText: {
    color: "#fff",
    fontWeight: "500",
    },
    scan: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "auto",
        marginBottom: "auto",
    },
    scanText: {
        marginBottom: 20,
        color: "grey",
        fontSize: 18,
    },
    NewScan: {
      marginTop: 30,
    },
    NewScanText: {
      color: "#2f855a",
      fontSize: 16,
    }
});
