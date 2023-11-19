import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import StyledText from './StyledText';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[
              styles.input,
              {borderColor: error ? 'red' : 'gray'},
            ]}
            secureTextEntry={secureTextEntry}
          />

          {error && 
            <StyledText color='error' fontWeight='bold'>{error.message || 'Error'}</StyledText>
          }
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default CustomInput;