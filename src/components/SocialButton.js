import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/theme';

const SocialButton = ({ 
  provider, 
  onPress, 
  style 
}) => {
  const renderProviderIcon = () => {
    switch (provider.toLowerCase()) {
      case 'apple':
        return <AntDesign name="apple1" size={24} color="#000" />;
      case 'facebook':
        return <FontAwesome name="facebook" size={24} color="#3b5998" />;
      case 'google':
        return <AntDesign name="google" size={24} color="#DB4437" />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          {renderProviderIcon()}
        </View>
        <Text style={styles.buttonText}>
          Continue with {provider}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
});

export default SocialButton;
