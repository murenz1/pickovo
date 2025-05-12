import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../App';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { COLORS, SIZES } from '../../styles/theme';

const CreatePasswordScreen = ({ navigation, route }) => {
  const { email } = route.params || {};
  const [password, setPassword] = useState('');
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get the signUp function from AuthContext
  const { signUp, clearError } = useContext(AuthContext);

  const validatePassword = (text) => {
    setPassword(text);
    setHasMinLength(text.length >= 8);
    setHasNumber(/\d/.test(text));
    setHasSymbol(/[!@#$%^&*(),.?":{}|<>]/.test(text));
  };

  const isPasswordValid = hasMinLength && hasNumber && hasSymbol;

  const handleContinue = async () => {
    if (!isPasswordValid) return;
    
    if (!email) {
      setError('Email is missing. Please go back and enter your email.');
      return;
    }
    
    setLoading(true);
    clearError();
    
    try {
      // Register the user with Firebase
      await signUp(email, password);
      
      // Navigate to account created screen
      navigation.navigate('AccountCreated', { email });
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
      Alert.alert('Registration Error', err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
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
        <Text style={styles.headerTitle}>Create your password 3 / 3</Text>
      </View>
      
      <View style={styles.content}>
        <Input
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry
        />
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${((hasMinLength ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSymbol ? 1 : 0)) * 33.33}%`,
                backgroundColor: isPasswordValid ? COLORS.success : COLORS.primary
              }
            ]} 
          />
        </View>
        
        <View style={styles.requirementsList}>
          <View style={styles.requirementItem}>
            <View style={[
              styles.checkCircle,
              hasMinLength && styles.checkedCircle
            ]}>
              {hasMinLength && <Ionicons name="checkmark" size={16} color={COLORS.background} />}
            </View>
            <Text style={styles.requirementText}>8 characters minimum</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <View style={[
              styles.checkCircle,
              hasNumber && styles.checkedCircle
            ]}>
              {hasNumber && <Ionicons name="checkmark" size={16} color={COLORS.background} />}
            </View>
            <Text style={styles.requirementText}>a number</Text>
          </View>
          
          <View style={styles.requirementItem}>
            <View style={[
              styles.checkCircle,
              hasSymbol && styles.checkedCircle
            ]}>
              {hasSymbol && <Ionicons name="checkmark" size={16} color={COLORS.background} />}
            </View>
            <Text style={styles.requirementText}>one symbol minimum</Text>
          </View>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Button 
          title="Create Account" 
          onPress={handleContinue}
          disabled={!isPasswordValid || loading}
          loading={loading}
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
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SIZES.padding * 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  requirementsList: {
    marginBottom: SIZES.padding * 2,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  requirementText: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  button: {
    marginTop: SIZES.padding,
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

export default CreatePasswordScreen;
