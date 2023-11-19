import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ImageButtonProps {
  onPress?: () => void;
  size?: number;
  imageSource: any;
  isRound?: boolean;
  style?: object;
}

const styles = StyleSheet.create({
  button: {
    padding: 0,
  },
  image: {
    width: 35,
    height: 35,
  },
  roundImage: {
    borderRadius: 50,
  },
});

export default function StyledImageButton({ onPress, size, imageSource, isRound, style, ...restOfProps }: ImageButtonProps) {
  const buttonStyles = [styles.button, style];
  const imageStyles = [styles.image, size && { width:size, height:size }, isRound && styles.roundImage];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} {...restOfProps}>
      <Image source={imageSource} style={imageStyles} />
    </TouchableOpacity>
  );
}
