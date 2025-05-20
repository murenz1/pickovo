import 'package:flutter/material.dart';
import '../models/auth_model.dart';

class AuthProvider with ChangeNotifier {
  AuthModel _authModel = AuthModel();

  AuthModel get authModel => _authModel;

  void setEmail(String email) {
    _authModel = _authModel.copyWith(email: email);
    notifyListeners();
  }

  void setPassword(String password) {
    _authModel = _authModel.copyWith(password: password);
    notifyListeners();
  }

  Future<bool> login() async {
    try {
      // Validate inputs first
      if (_authModel.email == null || _authModel.email!.isEmpty) {
        _authModel = _authModel.copyWith(
          error: 'Please enter your email address',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }

      if (_authModel.password == null || _authModel.password!.isEmpty) {
        _authModel = _authModel.copyWith(
          error: 'Please enter your password',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }
      
      // Simulate API call to a backend service
      await Future.delayed(const Duration(milliseconds: 800));
      
      // In a real app, this would be an API call to your authentication service
      // For demo purposes, we'll accept any valid email format with a password
      // that meets our validation requirements
      final bool isValidEmail = RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(_authModel.email!);
      final bool isValidPassword = validatePassword(_authModel.password!);
      
      if (isValidEmail && isValidPassword) {
        _authModel = _authModel.copyWith(isAuthenticated: true, error: null);
        notifyListeners();
        return true;
      } else {
        _authModel = _authModel.copyWith(
          error: 'Invalid email or password. Password must be at least 8 characters with a number and symbol.',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }
    } catch (e) {
      _authModel = _authModel.copyWith(
        error: 'An error occurred. Please try again.',
        isAuthenticated: false,
      );
      notifyListeners();
      return false;
    }
  }

  Future<bool> register() async {
    try {
      // Validate inputs first
      if (_authModel.email == null || _authModel.email!.isEmpty) {
        _authModel = _authModel.copyWith(
          error: 'Please enter your email address',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }

      if (_authModel.password == null || !validatePassword(_authModel.password!)) {
        _authModel = _authModel.copyWith(
          error: 'Password must be at least 8 characters with a number and symbol',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }
      
      // Simulate API call to a backend service
      await Future.delayed(const Duration(milliseconds: 800));
      
      // In a real app, this would be an API call to your registration service
      final bool isValidEmail = RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(_authModel.email!);
      
      if (isValidEmail) {
        _authModel = _authModel.copyWith(isAuthenticated: true, error: null);
        notifyListeners();
        return true;
      } else {
        _authModel = _authModel.copyWith(
          error: 'Please enter a valid email address',
          isAuthenticated: false,
        );
        notifyListeners();
        return false;
      }
    } catch (e) {
      _authModel = _authModel.copyWith(
        error: 'An error occurred during registration. Please try again.',
        isAuthenticated: false,
      );
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _authModel = AuthModel();
    notifyListeners();
  }

  bool validatePassword(String password) {
    // Password requirements: 8+ chars, at least 1 number, 1 symbol
    bool hasMinLength = password.length >= 8;
    bool hasNumber = password.contains(RegExp(r'[0-9]'));
    bool hasSymbol = password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    
    return hasMinLength && hasNumber && hasSymbol;
  }
}
