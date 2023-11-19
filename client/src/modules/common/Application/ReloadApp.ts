import * as Updates from 'expo-updates';
import { Platform } from 'react-native';

export const reloadApp = async () => {
  if (Platform.OS === 'ios') {
    await Updates.reloadAsync();
  } else if (Platform.OS === 'android') {
    await Updates.reloadAsync();
  } else {
    window.location.reload();
  }
};