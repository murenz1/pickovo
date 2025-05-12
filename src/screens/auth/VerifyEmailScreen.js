import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { COLORS, SIZES } from '../../styles/theme';

const VerifyEmailScreen = ({ navigation, route }) => {
  const { email = 'user@example.com' } = route.params || {};
  const [code, setCode] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    if (text.length > 1) {
      // Handle paste of the entire code
      const pastedCode = text.slice(0, 5).split('');
      const newCode = [...code];
      
      pastedCode.forEach((char, charIndex) => {
        if (index + charIndex < 5) {
          newCode[index + charIndex] = char;
        }
      });
      
      setCode(newCode);
      
      // Focus on the appropriate input
      const focusIndex = Math.min(index + pastedCode.length, 4);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    } else {
      // Handle single character input
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      
      // Auto-focus next input
      if (text !== '' && index < 4) {
        inputRefs.current[index + 1].focus();
      }
    }
    
    if (error) setError('');
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 5) {
      setError('Please enter the complete 5-digit code');
      return;
    }
    
    // For demo purposes, any code is valid
    navigation.navigate('CreatePassword');
  };

  const handleResend = () => {
    // In a real app, this would trigger the resend API
    setError('');
    setCode(['', '', '', '', '']);
    inputRefs.current[0].focus();
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
        <Text style={styles.headerTitle}>Verify your email 2 / 3</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          We just sent 5-digit code to {email}, enter it below:
        </Text>
        
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button 
          title="Verify email" 
          onPress={handleVerify}
          disabled={code.some(digit => digit === '')}
          style={styles.button}
        />
        
        <TouchableOpacity onPress={handleResend} style={styles.resendLink}>
          <Text style={styles.resendText}>
            Wrong email? <Text style={styles.link}>Send to different email</Text>
          </Text>
        </TouchableOpacity>
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
    color: COLORS.text,
    marginBottom: SIZES.padding * 2,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  codeInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    textAlign: 'center',
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.padding,
  },
  button: {
    marginBottom: SIZES.padding,
  },
  resendLink: {
    alignItems: 'center',
    padding: SIZES.padding,
  },
  resendText: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
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
});

export default VerifyEmailScreen;
