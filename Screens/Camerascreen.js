import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import StateTree from "./state"
import * as ImageManipulator from 'expo-image-manipulator';

export default function App({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');})();
  }, []);
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        let localUri = data.uri;
        setImage(data.uri);
        const manip = await ImageManipulator.manipulateAsync(localUri,
          [{resize: {width:450,height:450}}],
          {compress: 0.5, format: ImageManipulator.SaveFormat.JPEG}
          )
        localUri = manip.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('file', { uri: localUri, name: filename, type });
        fetch("http://192.168.137.43:5000/recieve_image/", {
          method: 'POST',
          body: formData,
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((data) => {
          return data.json();
        })
        .then((data)=> {
          if(data.Success) {
            StateTree.set_visit(data.visit_id)
            console.log(StateTree.current_visit,data)
            navigation.navigate("profile",data)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>
      <Button
            title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
   </View>
  );
}const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
})