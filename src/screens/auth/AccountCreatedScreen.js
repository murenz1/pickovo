import React, { useContext } from 'react';
import { AuthContext } from '../../../App';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../styles/theme';

const AccountCreatedScreen = ({ navigation, route }) => {
  const { email } = route.params || {};
  
  // Get the auth functions from AuthContext
  const { signIn } = useContext(AuthContext);
  
  const handleContinue = async () => {
    try {
      // Since we're using a mock implementation, we need to sign in the user
      // to trigger the auth state change that will navigate to the Main navigator
      if (email) {
        // Auto-login with the created account
        await signIn(email, 'password'); // In mock mode, the password doesn't matter
        
        // The auth state change in App.js should automatically navigate to Main
        // But we can also force it if needed:
        /*
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        */
      } else {
        // If no email, just go to login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    } catch (error) {
      console.error('Error signing in after account creation:', error);
      // Fallback to login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account Created</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <View style={styles.successIcon}>
            <Checkmark />
          </View>
        </View>
        
        <Text style={styles.title}>Your account was successfully created!</Text>
        <Text style={styles.subtitle}>
          {email ? `We've sent a verification email to ${email}.` : 'Check your email for verification.'}
        </Text>
        
        <Button 
          title="Continue to Login" 
          onPress={handleContinue}
          style={styles.button}
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By using FixMyRide, you agree to the{' '}
          <Text style={styles.link}>Terms</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Custom checkmark component to match the design
const Checkmark = () => (
  <View style={styles.checkmarkContainer}>
    <Text style={styles.checkmark}>✓</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: SIZES.padding * 2,
    width: '100%',
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(138, 79, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding * 3,
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: COLORS.background,
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.padding,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding * 3,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding,
    textAlign: 'center',
  },
  button: {
    width: '100%',
  },
  footer: {
    padding: SIZES.padding * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  link: {
    color: COLORS.primary,
  },
});

export default AccountCreatedScreen;
