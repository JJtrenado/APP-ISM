import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../theme';

interface WorkersButtonProps {
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

export default function WorkersButton({ onPress, size, color, style, ...restOfProps }: WorkersButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} {...restOfProps}>
     <Fontisto name="persons" size={24} color="black" style={iconStyles} />
    </TouchableOpacity>
  )
}
