import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../App';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialButton from '../../components/SocialButton';
import { COLORS, SIZES } from '../../styles/theme';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const { welcomeBack } = route.params || { welcomeBack: false };

  // Get the auth functions from AuthContext
  const { signIn, error: authError, clearError } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    clearError();
    
    try {
      // Use the signIn function from AuthContext to authenticate with Firebase
      await signIn(email, password);
      // If successful, the AuthContext will update the state and navigate to Home
    } catch (err) {
      setLoading(false);
      setFormError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log into account</Text>
      </View>
      
      <View style={styles.content}>
        {welcomeBack && (
          <Text style={styles.welcomeBack}>Welcome back!</Text>
        )}
        
        {!welcomeBack ? (
          <>
            <Input
              label="Email"
              placeholder="your-email@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (formError) setFormError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (formError) setFormError('');
              }}
              secureTextEntry
            />
            
            {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
            {authError ? <Text style={styles.errorText}>{authError}</Text> : null}
            
            <Button 
              title="Log in" 
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPasswordLink}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Button 
              title="Continue with email" 
              onPress={() => navigation.navigate('LoginWithEmail')}
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
                Alert.alert('Coming Soon', 'Sign in with Apple will be available soon!');
              }} 
              style={styles.socialButton}
            />
            
            <SocialButton 
              provider="Facebook" 
              onPress={() => {
                Alert.alert('Coming Soon', 'Sign in with Facebook will be available soon!');
              }} 
              style={styles.socialButton}
            />
            
            <SocialButton 
              provider="Google" 
              onPress={() => {
                Alert.alert('Coming Soon', 'Sign in with Google will be available soon!');
              }} 
              style={styles.socialButton}
            />
          </>
        )}
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
  welcomeBack: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding * 2,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.padding,
  },
  loginButton: {
    marginTop: SIZES.padding,
  },
  forgotPasswordLink: {
    alignItems: 'center',
    padding: SIZES.padding,
    marginTop: SIZES.padding,
  },
  forgotPasswordText: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
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

export default LoginScreen;
