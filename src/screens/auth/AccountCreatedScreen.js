import React, { useContext } from 'react';
import { AuthContext } from '../../../App';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../styles/theme';

const AccountCreatedScreen = ({ navigation, route }) => {
  const { email } = route.params || {};
  
  // Get the auth functions from AuthContext
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
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
          title="Continue to App" 
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })}
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
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
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
