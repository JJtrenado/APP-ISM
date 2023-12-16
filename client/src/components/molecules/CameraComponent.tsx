import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import StyledImageTextButton from '../atoms/StyledImageTextButton';

export default function CameraComponent({ onImgSuccess, barCode }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        const uri: string = asset.uri;
        let bodyContent = new FormData();
        console.log(barCode);
        bodyContent.append("file", {
          uri,
          name: `${barCode}.jpg`,
          type: 'image/jpg',
        });
        onImgSuccess(bodyContent);

        setImage(null);
        console.log('saved successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <View>
          <Camera
            style={styles.camera}
            type={type}
            ref={cameraRef}
          />
          <View style={styles.controls}>
            <StyledImageTextButton title="Tomar foto" onPress={takePicture} icon="camera" color={undefined} />

            <StyledImageTextButton
              title="Girar"
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              } } color={undefined} />

            </View>
          </View>
      ) : (
        <View>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.controls}>
            <StyledImageTextButton
              title="Re-take"
              onPress={() => setImage(null)}
              icon="retweet" color={undefined}
            />
            <StyledImageTextButton title="Save" onPress={savePicture} icon="check" color={undefined} />
          </View>
        </View>
      )}

      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    alignSelf: 'center',
    aspectRatio: 3/4,
  },
  controls: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});