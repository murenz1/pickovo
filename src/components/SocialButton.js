import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../styles/theme';

const SocialButton = ({ provider, onPress, style }) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'Google':
        return {
          icon: <AntDesign name="google" size={20} color="#DB4437" />,
          text: 'Continue with Google',
          backgroundColor: '#FFFFFF',
          textColor: COLORS.text,
          borderColor: COLORS.border,
        };
      case 'Facebook':
        return {
          icon: <FontAwesome name="facebook" size={20} color="#3b5998" />,
          text: 'Continue with Facebook',
          backgroundColor: '#FFFFFF',
          textColor: COLORS.text,
          borderColor: COLORS.border,
        };
      case 'Apple':
        return {
          icon: <AntDesign name="apple1" size={20} color="#000000" />,
          text: 'Continue with Apple',
          backgroundColor: '#FFFFFF',
          textColor: COLORS.text,
          borderColor: COLORS.border,
        };
      case 'Twitter':
        return {
          icon: <AntDesign name="twitter" size={20} color="#1DA1F2" />,
          text: 'Continue with Twitter',
          backgroundColor: '#FFFFFF',
          textColor: COLORS.text,
          borderColor: COLORS.border,
        };
      default:
        return {
          icon: null,
          text: `Continue with ${provider}`,
          backgroundColor: '#FFFFFF',
          textColor: COLORS.text,
          borderColor: COLORS.border,
        };
    }
  };

  const { icon, text, backgroundColor, textColor, borderColor } = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor },
        style
      ]}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.buttonText, { color: textColor }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: SIZES.padding,
  },
  buttonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
});

export default SocialButton;
