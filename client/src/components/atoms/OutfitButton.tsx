import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

interface OutfitButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: object;
}

const styles = StyleSheet.create({
  icon: {
    color: theme.colors.primary,
    fontSize: 35,
  },
});

export default function OutfitButton({ onPress, size, color, style, ...restOfProps }: OutfitButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} {...restOfProps}>
      <Entypo name="man" style={iconStyles} />
    </TouchableOpacity>
  )
}
