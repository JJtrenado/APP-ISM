import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import theme from '../theme';

interface BarCodeButtonProps {
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

export default function BarCodeButton({ onPress, size, color, style, ...restOfProps }: BarCodeButtonProps) {
  const iconStyles = [
    styles.icon,
    color && { color: color },
    size && { fontSize: size },
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} {...restOfProps}>
      <MaterialCommunityIcons name="barcode-scan" style={iconStyles} />
    </TouchableOpacity>
  )
}
