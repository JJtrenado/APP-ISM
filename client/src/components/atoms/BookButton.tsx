import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

interface BookButtonProps {
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

export default function BookButton({ onPress, size, color, style, ...restOfProps }: BookButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} {...restOfProps}>
      <FontAwesome name="book" size={24} color="black" style={iconStyles} />
    </TouchableOpacity>
  )
}
