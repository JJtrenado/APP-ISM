import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledButton from '../atoms/StyledButton';

export default function ImagePickerExample({ onPickerSuccess }) {

  const pickImage = async () => {
    const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (imagePickerResult.canceled) {
      console.log('Image selection cancelled.');
      return;
    }

    const { uri } = imagePickerResult;
    let bodyContent = new FormData();
    bodyContent.append("file", {
      uri,
      name: `image.jpg`,
      type: 'image/jpeg',
    });
    onPickerSuccess(bodyContent);
  };

  return (
    <View style={styles.button}>
      <StyledButton onPress={pickImage} children={'Sube una foto de tu galería'} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
  margin: 30,
},
});