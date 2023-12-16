import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { createBook } from '../../modules/Book/Infrastructure/newBook';
import { getLocalUser } from '../../modules/common/Infrastructure/LocalStorageUser';
import StyledButton from '../atoms/StyledButton';
import ListPickerInput from '../atoms/listPickerInput';
import CustomInput from '../atoms/textInput';

const NewBookForm = ({ barCode }) => {
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState: { errors } } = useForm();

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

  const onSubmit = data => {
    let bodyContent = new FormData();
    bodyContent.append("image", `${barCode}.jpg`);
    Object.keys(data).map((key: string) => {
      bodyContent.append(key, data[key]);
    });
    bodyContent.append("user" , user.email);
    bodyContent.append("barCode", barCode);
    createBook(user.jwt.jwt, bodyContent);
    navigation.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      
      <ListPickerInput
        rules = {{ required: true }}
        secureTextEntry={undefined}
        labels = {['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western',]}
        name="genre"
        placeholder="Género"
        control={control}
      />

      <CustomInput
        name="title"
        placeholder="Titulo"
        control={control}
        secureTextEntry={undefined}
      />

      <CustomInput
        name="author"
        placeholder="Autor"
        control={control}
        secureTextEntry={undefined}
      />
      
      <StyledButton onPress={handleSubmit(onSubmit)}>Crear Libro</StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default NewBookForm;
