// src/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simula algum tipo de carregamento ou delay
    setTimeout(() => {
      // Navega para a próxima tela após o tempo determinado
      navigation.replace('HomeScreen'); // 'Main' deve ser substituído pelo nome da sua tela principal
    }, 1500); // Tempo em milissegundos
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Inicio.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
      },
      logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
      },
    });

export default SplashScreen;
