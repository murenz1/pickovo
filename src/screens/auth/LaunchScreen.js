import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../styles/theme';

const LaunchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/launch-screen.jpg')} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Pickovo</Text>
          <Text style={styles.subtitle}>Join the 10,000 car repair shops on the World</Text>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Create an account" 
              onPress={() => navigation.navigate('CreateAccount')}
              style={styles.button}
            />
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.background,
    marginBottom: SIZES.padding * 3,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: SIZES.padding * 2,
  },
  button: {
    marginBottom: SIZES.padding,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    marginRight: SIZES.base,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LaunchScreen;
