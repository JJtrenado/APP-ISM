import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BarCodeButton from '../atoms/BarCodeButton';
import BookButton from '../atoms/BookButton';
import WorkersButton from '../atoms/WorkersButton';

export default function OptionsButtons() {
  const navigation = useNavigation();

  return (
    <View style={[styles.buttons]}>
      <WorkersButton onPress={() => {navigation.navigate('Workers' as never);}} size={40}/>
      <BookButton onPress={() => {navigation.navigate('Books' as never);}} size={40}/>
      <BarCodeButton onPress={() => {navigation.navigate('Scann' as never);}} size={40}/>
    </View>
  )
}

const styles = StyleSheet.create({  
  buttons: {
    paddingTop: 20,
    justifyContent: "space-around",
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },
});