import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../App';
import Button from '../../components/Button';
import SocialButton from '../../components/SocialButton';
import { COLORS, SIZES } from '../../styles/theme';

const CreateAccountScreen = ({ navigation }) => {
  // Get the auth context
  const { clearError } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create new account</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Begin with creating new account. This helps you keep your book a service.
        </Text>
        
        <Button 
          title="Continue with email" 
          onPress={() => navigation.navigate('AddEmail')}
          style={styles.emailButton}
        />
        
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>
        
        <SocialButton 
          provider="Apple" 
          onPress={() => {
            clearError();
            Alert.alert('Coming Soon', 'Sign up with Apple will be available soon!');
          }} 
          style={styles.socialButton}
        />
        
        <SocialButton 
          provider="Facebook" 
          onPress={() => {
            clearError();
            Alert.alert('Coming Soon', 'Sign up with Facebook will be available soon!');
          }} 
          style={styles.socialButton}
        />
        
        <SocialButton 
          provider="Google" 
          onPress={() => {
            clearError();
            Alert.alert('Coming Soon', 'Sign up with Google will be available soon!');
          }} 
          style={styles.socialButton}
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
  backButton: {
    padding: SIZES.base,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: SIZES.large,
    fontWeight: '600',
    marginRight: SIZES.padding * 2,
  },
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.padding * 2,
  },
  emailButton: {
    marginBottom: SIZES.padding,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: SIZES.padding,
    color: COLORS.textSecondary,
  },
  socialButton: {
    marginBottom: SIZES.padding,
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

export default CreateAccountScreen;
