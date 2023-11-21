import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { deleteUserById } from '../../modules/Users/Infrastructure/deleteUser';
import { getUsers } from '../../modules/Users/Infrastructure/getUsers';
import { User } from '../../modules/common/Domain/User';
import StyledButton from '../atoms/StyledButton';
import StyledText from '../atoms/StyledText';


const UsersView = ({ jwt }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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
            }}>Eliminar</StyledButton>
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