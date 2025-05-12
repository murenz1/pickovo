import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../styles/theme';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false, 
  loading = false,
  variant = 'filled' // 'filled' or 'outlined'
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outlined' && styles.outlinedButton,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'filled' ? COLORS.background : COLORS.primary} />
      ) : (
        <Text 
          style={[
            styles.buttonText, 
            variant === 'outlined' && styles.outlinedButtonText,
            disabled && styles.disabledButtonText,
            textStyle
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
    fontWeight: '600',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlinedButtonText: {
    color: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  disabledButtonText: {
    color: COLORS.textSecondary,
  },
});

export default Button;
