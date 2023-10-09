import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { getLocalUser, saveLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from '../atoms/StyledButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../atoms/textInput';
import { useNavigation } from '@react-navigation/native';
import { getJwt } from '../../modules/Login/Infrastructure/getJwt';
import Header from "../molecules/Header";
import { registerUser } from "../../modules/Login/Infrastructure/registerUser";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      const localUser = await getLocalUser();
      setUser(localUser);
    };

    fetchUser();
  }, []);

  const onSubmit = async data => {
    const formData = new FormData();
    Object.keys(data).map((key: string) => {
      formData.append(key, data[key]);
    });
    await registerUser(user.jwt.jwt, formData);
    navigation.navigate('Home' as never);
  };

  return (
    <>
    <Header />
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain"/>

      <CustomInput
        name="email"
        placeholder="Correo electrónico"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="name"
        placeholder="Nombre"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="password"
        placeholder="Contraseña"
        control={control}
        secureTextEntry={true}
      />
      
      <StyledButton onPress={handleSubmit(onSubmit)}>INICIAR</StyledButton>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
});
