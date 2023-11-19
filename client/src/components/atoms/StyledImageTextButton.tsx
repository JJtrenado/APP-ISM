import { Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function StyledImageTextButton({
  title,
  onPress,
  icon,
  color,
  ...restOfProps
}) {
  const buttonStyles = [
    styles.button,
    color && { backgroundColor: color },
  ];

  const textStyles = [
    styles.text,
  ];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} {...restOfProps}>
      {icon && <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />}
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
    fontFamily: theme.fonts.main,
  },
});
