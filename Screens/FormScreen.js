import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import StateTree from "./state"

export default function App({navigation,route}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [captured, setCaptured] = useState(false);

  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');})();
  }, []);
  const push_url = (url) => {
    const payload = {
      visit_id: route.params,
      imageUrl: 'http://' + url
    }
    fetch("http://192.168.137.43:8000/api/claims/forms/", {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
          'Content-Type':'application/json',
      },
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      const payload = {
        visit_id: data.visit_id
      }
      navigation.navigate("profile")
    })
  }
  const submit = () => {
    let filename = image.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('file', { uri: image, name: filename, type });
    console.log("captured")
    fetch("http://192.168.137.43:5000/recieve_form_scan/", {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((data) => {
      console.log("Recieved")
      return data.json();
    })
    .then((data)=>{
      return push_url(data["url"])
    })
    .catch((e) => {
      console.log(e);
    });
  }
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
        setCaptured(true)
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={{ flex: 1}}>
     { captured ? <ViewImageComponent image={image} submit={submit} /> : <ScanFormComponent setType={setType} setCamera={setCamera} takePicture={takePicture} type={type} />}
   </View>
  );
}

const ViewImageComponent = ({ image, submit }) => {
  return (
    <View style={{ flex: 1}}>
      <Image source={{uri: image}} style={{flex:1}}/>
      <Button title="Submit Scan" onPress={() => submit()} />
    </View>

  )
}

const ScanFormComponent = ({takePicture,type,setType,setCamera}) => {
  return (
    <View style={{ flex: 1}}>
       <View style={styles.cameraContainer}>
             <Camera 
             ref={ref => setCamera(ref)}
             style={styles.fixedRatio} 
             type={type}
             ratio={'1:1'} />
       </View>
        <Button title="Take Scan" onPress={() => takePicture()} />
    </View>
   );
}


const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 0.7
  }
})