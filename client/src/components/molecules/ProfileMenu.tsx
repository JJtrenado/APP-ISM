import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { logOut } from '../../modules/Login/Infrastructure/logOut';
import StyledButton from '../atoms/StyledButton';
import StyledText from '../atoms/StyledText';

export default function Profile(user) {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image source={require("../../../assets/user.png")} style={styles.image} />
        <StyledText align='center' fontWeight='bold'>{user.user.name}</StyledText>
        <StyledText align='center'>{user.user.email}</StyledText>
      </View>
      <StyledButton onPress={() => {logOut();}}>Cerrar sesión</StyledButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: "center",
    gap: 10,
  },
  user: {
    gap: 5,
  },
  image: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});