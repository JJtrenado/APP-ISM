import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import StyledText from './StyledText';

const PickerInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  labels,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          <View style={[
            styles.input,
            { borderColor: error ? 'red' : 'gray' },
          ]}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
              style={styles.picker}
            >
              {labels.map((label) => (
                <Picker.Item key={label} label={label} value={label} />
                ))}
            </Picker>
          </View>

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
    gap: 10,
    margin: 10,
  },
  input: {
    height: 60,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  picker: {
    height: 60,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default PickerInput;
