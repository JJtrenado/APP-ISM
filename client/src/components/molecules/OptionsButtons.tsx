import { View, StyleSheet } from 'react-native'
import React from 'react'
import BarCodeButton from '../atoms/BarCodeButton';
import StyledImageButton from '../atoms/StyledImageButton';
import OutfitButton from '../atoms/OutfitButton';
import { useNavigation } from '@react-navigation/native';
import StyledButton from '../atoms/StyledButton';

export default function OptionsButtons() {
  const navigation = useNavigation();

  return (
    <View style={[styles.buttons]}>
      <StyledButton onPress={() => {navigation.navigate('Register' as never);}}>Registrar Trabajador</StyledButton>
      <StyledButton onPress={() => {navigation.navigate('NewBook' as never);}}>Añadir libro</StyledButton>
      <StyledButton onPress={() => {navigation.navigate('Scann' as never);}}>Escanear BarCode</StyledButton>
      {/* <BarCodeButton onPress={() => {navigation.navigate('Scann' as never);}} size={40}/>
      <StyledImageButton onPress={() => { navigation.navigate('NewGarment' as never); }} imageSource={require("../../../assets/tshirtIcon.png")} size={45}/>
      <OutfitButton onPress={() => {navigation.navigate('NewOutfit' as never);}} size={40}/> */}
    </View>
  )
}

const styles = StyleSheet.create({  
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
});