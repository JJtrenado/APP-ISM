import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInput';

import { registerUser } from "../../modules/Login/Infrastructure/registerUser";
import Header from "../molecules/Header";
import UsersView from '../molecules/UsersView';
import StyledText from '../atoms/StyledText';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user) {
    navigation.navigate('Login' as never);
    return null;
  }

return (
  <>
  <Header picture={user.picture} />
  <ScrollView>
    <StyledText align="center" fontWeight="bold" fontSize='title' style={{ marginTop: 20 }}>Libros</StyledText>
    <UsersView jwt={user.jwt}/>
  </ScrollView>
  <StyledButton style={styles.floatingButton} onPress={() => {navigation.navigate('Register' as never);}}>+</StyledButton>
</>
);
}

const styles = StyleSheet.create({
floatingButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 60,
  height: 60,
  borderRadius: 50,
  justifyContent: 'center',
  elevation: 5,
},
});