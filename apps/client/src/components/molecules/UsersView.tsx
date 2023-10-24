// @ts-ignore
import { BACKEND_URL }from '@env';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, Modal, TouchableOpacity, Dimensions, Platform, Switch } from 'react-native';
import { getGarmentByUser } from '../../modules/Garment/Infrastructure/getGarments';
import { getUsers } from '../../modules/Users/Infrastructure/getUsers';
import { StyleSheet } from 'react-native';
import StyledText from '../atoms/StyledText';
import StyledButton from '../atoms/StyledButton';
import { deleteGarmentByBarCode } from '../../modules/Garment/Infrastructure/deleteGarment';
import { updateGarmentAvailabilityByBarCode } from '../../modules/Garment/Infrastructure/updateGarment';
import { useFocusEffect } from '@react-navigation/native';
import { User } from '../../modules/common/Domain/User';
import { deleteUserById } from '../../modules/Users/Infrastructure/deleteUser';


const UsersView = ({ jwt }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const loadUsers = async () => {
    try {
      setUsers(await getUsers(jwt));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth / 3;

  return (
    <View style={styles.container}>
      <StyledText style={styles.title} fontWeight='bold' fontSize='title'>Usuarios</StyledText>
      <FlatList
        data={users}
        numColumns={1}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.horizontal}>
            <StyledText fontWeight='bold'>{item.name}</StyledText>
            <StyledText>{item.email}</StyledText>
            <StyledButton color='red' onPress={async () => {
              await deleteUserById(jwt, item.id);
              loadUsers();
            }}>
              Eliminar
            </StyledButton>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 10,
  },
  flatListContent: {
    flexGrow: 1,
    gap: 10,
    justifyContent: 'space-between',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UsersView;