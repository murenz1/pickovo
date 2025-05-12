import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../styles/theme';
import Button from '../../components/Button';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('input'); // input, processing, success
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setStep('processing');
    
    // Simulate API call for password reset
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const renderInputStep = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Reset password</Text>
      </View>
      
      <Text style={styles.description}>
        We will email you a link to reset your password.
      </Text>
      
      <Text style={styles.inputLabel}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <Button
        title="Send"
        onPress={handleResetPassword}
        style={styles.button}
      />
      
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By using Pickovo, you agree to the{' '}
          <Text style={styles.termsLink}>Terms</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );

  const renderProcessingStep = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setStep('input')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Reset password</Text>
      </View>
      
      <Text style={styles.description}>
        We will email you a link to reset your password.
      </Text>
      
      <Text style={styles.inputLabel}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
        />
      </View>
      
      <Button
        title={
          <View style={styles.loadingButton}>
            <ActivityIndicator color={COLORS.background} size="small" />
            <Text style={styles.buttonText}> Send</Text>
          </View>
        }
        style={styles.button}
      />
      
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By using Pickovo, you agree to the{' '}
          <Text style={styles.termsLink}>Terms</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset password</Text>
      </View>
      
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark" size={32} color={COLORS.background} />
        </View>
        
        <Text style={styles.successTitle}>
          We have sent an email to <Text style={styles.emailText}>{email}</Text> with instructions to reset your password.
        </Text>
        
        <Button
          title="Back to login"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
      </View>
      
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By using Pickovo, you agree to the{' '}
          <Text style={styles.termsLink}>Terms</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {step === 'input' && renderInputStep()}
      {step === 'processing' && renderProcessingStep()}
      {step === 'success' && renderSuccessStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: SIZES.small,
    fontWeight: '500',
    marginBottom: 8,
    color: COLORS.text,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 24,
  },
  input: {
    padding: 16,
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  button: {
    marginBottom: 16,
  },
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  termsContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  termsText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  termsLink: {
    color: COLORS.primary,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emailText: {
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
