import { useNavigation } from '@react-navigation/native';
import React from "react";
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, View } from "react-native";
import { login } from '../../modules/Login/Infrastructure/login';
import { saveLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from '../atoms/StyledButton';
import CustomInput from '../atoms/textInput';


export default function LoginScreen() {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = async data => {
      const formData = new FormData();
      Object.keys(data).map((key: string) => {
        formData.append(key, data[key]);
      });
      const user = await login(formData);
      await saveLocalUser(user);
      navigation.navigate('Home' as never);
    };
  
    return (
      <View style={styles.container}>
        <Image source={require("../../../assets/logo.png")} style={styles.logo} resizeMode="contain"/>
  
        <CustomInput
          name="email"
          placeholder="Correo electrónico"
          control={control}
          secureTextEntry={false}
        />
  
        <CustomInput
          name="password"
          placeholder="Contraseña"
          control={control}
          secureTextEntry={true}
        />
        
        <StyledButton onPress={handleSubmit(onSubmit)}>INICIAR</StyledButton>
      </View>
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
