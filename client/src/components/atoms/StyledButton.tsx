import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

interface StyledButtonProps {
  align?: 'center';
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  style?: object;
  onPress?: () => void;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },

});

export default function StyledButton({
  align,
  color,
  fontSize,
  fontWeight,
  style,
  onPress,
  children,
  ...restOfProps
}: StyledButtonProps) {
  const buttonStyles = [
    styles.button,
    color && { backgroundColor: color },
    style,
  ];

  const textStyles = [
    styles.buttonText,
    fontSize === 'subheading' && { fontSize: theme.fontSizes.subheading },
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfProps}>
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
}
