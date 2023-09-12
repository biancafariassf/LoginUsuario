import { useContext, useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

import firestore from "@react-native-firebase/firestore";

import { UserContext } from "../contexts/useUser";

export function Profile() {
  const { user, userInformations, handleSignOut, toggleFavorite } = useContext(UserContext);

  const [hoteis, setHoteis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    !loading && setLoading(true);
    firestore().collection('hoteis').get()
    .then((querySnapshot) => {
      const hoteis = [];
      querySnapshot.forEach((documentSnapshot) => {
        userInformations.favorites.forEach((favorite) => {
          if(favorite === documentSnapshot.data().nome_hot) {
            hoteis.push(documentSnapshot.data());
          }
        });
      });
      setHoteis(hoteis);
      setLoading(false);
    });
  }, [userInformations.favorites]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{uri: user.photoURL}}
        />
        <Text style={styles.username}>{user.displayName}</Text>
      </View>
      <TouchableOpacity style={styles.buttonLogout} onPress={handleSignOut}>
        <Feather name="log-out" size={20} color="white" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      {!loading && hoteis.length !== 0 && (
        hoteis.map((hotel, index) => (
          <View key={index} style={styles.favorites}>
            <Text style={{color: 'white'}}>{hotel.nome_hot}</Text>
            <Text style={{color: 'white'}}>{hotel.descricao_hot}</Text>
            <Text style={{color: 'white'}}>{hotel.localizacao_hot}</Text>
            <TouchableOpacity style={styles.buttonLogout} onPress={() => toggleFavorite(hotel.nome_hot)}>
              <Text style={{color: 'white'}}>REMOVER</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  username: {
    color: 'white',
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'left',
    marginLeft: 10
  },
  buttonLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1EFFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#313131',
    fontSize: 16,
    marginLeft: 10,
  },
  favorites: {
    marginTop: 30
  }
});