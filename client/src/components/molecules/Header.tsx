import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledImageButton from '../atoms/StyledImageButton';

export default function Header(picture) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => { navigation.navigate('Home' as never); }}>
        <Image source={require("../../../assets/banner.png")} style={styles.bannerImage} />
      </TouchableOpacity>
      <StyledImageButton onPress={() => { navigation.navigate('Settings' as never); }} imageSource={require("../../../assets/user.png")} isRound={true} />
    </View>
  )
}

const styles = StyleSheet.create({  
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  bannerImage: {
    width: 128,
    height: 30,
  },
  textLogo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlignVertical: 'center',
  },
});
