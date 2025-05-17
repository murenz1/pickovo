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
    // Simulate API call
    await Future.delayed(const Duration(seconds: 1));
    
    // For demo purposes, check if email and password match a test account
    // In a real app, you would validate against a backend service
    if (_authModel.email == 'sarah.jansen@gmail.com' && _authModel.password == 'Password123!') {
      _authModel = _authModel.copyWith(isAuthenticated: true, error: null);
      notifyListeners();
      return true;
    } else {
      _authModel = _authModel.copyWith(
        error: 'Oops! Email or password incorrect try another one.',
        isAuthenticated: false,
      );
      notifyListeners();
      return false;
    }
  }

  Future<bool> register() async {
    // Simulate API call
    await Future.delayed(const Duration(seconds: 1));
    
    // For demo purposes, assume registration is successful
    // In a real app, you would send data to a backend service
    if (_authModel.email != null && _authModel.password != null) {
      _authModel = _authModel.copyWith(isAuthenticated: true, error: null);
      notifyListeners();
      return true;
    } else {
      _authModel = _authModel.copyWith(
        error: 'Registration failed. Please try again.',
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
