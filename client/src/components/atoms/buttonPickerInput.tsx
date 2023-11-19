import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import StyledImageButton from './StyledImageButton';
import StyledText from './StyledText';

const ButtonPickerInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  images,
  labels,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          {labels.map((label, index) => (
            <StyledImageButton
              key={label}
              style={[
                styles.button,
                value === label && styles.buttonSelected,
                error && styles.buttonError,
              ]}
              onPress={() => onChange(label)}
              onBlur={onBlur}
              imageSource={images[index]}
              size={45}
            >
              <StyledText
                color={value === label ? 'white' : 'black'}
                fontWeight={value === label ? 'bold' : 'normal'}
              >
                {label}
              </StyledText>
            </StyledImageButton>
          ))}

          {error && (
            <StyledText color='error' fontWeight='bold'>
              {error.message || 'Error'}
            </StyledText>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    margin: 10,
  },
  button: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    borderWidth: 2,
    backgroundColor: 'aqua',
    borderColor: 'blue',
  },
  buttonError: {
    borderColor: 'red',
  },
});

export default ButtonPickerInput;
