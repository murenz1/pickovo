import 'package:flutter/material.dart';
import '../models/auth_model.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  AuthModel _authModel = AuthModel();
  bool _isLoading = false;

  AuthModel get authModel => _authModel;
  bool get isLoading => _isLoading;

  // Check if user is already logged in
  Future<bool> checkAuthStatus() async {
    try {
      final token = await _apiService.getToken();
      if (token != null) {
        // Token exists, try to get user profile
        try {
          final userData = await _apiService.getUserProfile();
          _authModel = _authModel.copyWith(
            isAuthenticated: true,
            email: userData['email'],
            name: userData['name'],
            error: null,
          );
          notifyListeners();
          return true;
        } catch (e) {
          // Token might be invalid, clear it
          await _apiService.clearTokens();
          _authModel = _authModel.copyWith(isAuthenticated: false);
          notifyListeners();
          return false;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  void setEmail(String email) {
    _authModel = _authModel.copyWith(email: email);
    notifyListeners();
  }

  void setPassword(String password) {
    _authModel = _authModel.copyWith(password: password);
    notifyListeners();
  }
  
  void setName(String name) {
    _authModel = _authModel.copyWith(name: name);
    notifyListeners();
  }

  Future<bool> login() async {
    if (_authModel.email == null || _authModel.password == null) {
      _authModel = _authModel.copyWith(
        error: 'Email and password are required',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    // Validate email format
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(_authModel.email!)) {
      _authModel = _authModel.copyWith(
        error: 'Please enter a valid email address',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    _isLoading = true;
    notifyListeners();
    
    try {
      final data = await _apiService.login(
        _authModel.email!,
        _authModel.password!,
      );
      
      // Extract user data from response
      String? name;
      if (data['user'] != null) {
        // Try to get name from different possible fields
        name = data['user']['name'] ?? 
               data['user']['first_name'] ?? 
               _authModel.name;
      }
      
      _authModel = _authModel.copyWith(
        isAuthenticated: true,
        error: null,
        name: name,
      );
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      // Provide more specific error messages based on the exception
      String errorMessage;
      
      if (e.toString().contains('401') || e.toString().contains('incorrect')) {
        errorMessage = 'Incorrect email or password. Please try again.';
      } else if (e.toString().contains('Network error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (e.toString().contains('timeout')) {
        errorMessage = 'Connection timeout. The server is taking too long to respond.';
      } else {
        errorMessage = 'Login failed. Please try again later.';
      }
      
      _authModel = _authModel.copyWith(
        error: errorMessage,
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // Check if email is valid for registration (first step)  
  Future<bool> validateEmail() async {
    if (_authModel.email == null || _authModel.email!.isEmpty) {
      _authModel = _authModel.copyWith(
        error: 'Email is required',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    // Validate email format
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(_authModel.email!)) {
      _authModel = _authModel.copyWith(
        error: 'Please enter a valid email address',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    // Email is valid
    _authModel = _authModel.copyWith(error: null);
    notifyListeners();
    return true;
  }
  
  // Complete registration with all required fields
  Future<bool> register() async {
    if (_authModel.email == null || _authModel.password == null || _authModel.name == null) {
      _authModel = _authModel.copyWith(
        error: 'Name, email and password are required',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    // Validate email format
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(_authModel.email!)) {
      _authModel = _authModel.copyWith(
        error: 'Please enter a valid email address',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    // Validate password strength
    if (_authModel.password!.length < 6) {
      _authModel = _authModel.copyWith(
        error: 'Password must be at least 6 characters',
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
    
    _isLoading = true;
    notifyListeners();
    
    try {
      // Call the API service to register the user
      final data = await _apiService.register(
        _authModel.email!,
        _authModel.password!,
        _authModel.name!,
      );
      
      // If registration was successful, the user should be logged in automatically
      if (data['user'] != null) {
        _authModel = _authModel.copyWith(
          isAuthenticated: true, 
          error: null,
          // Update with any returned user data
          name: data['user']['first_name'] ?? _authModel.name,
        );
      } else {
        // If no user data was returned, set authenticated but keep existing data
        _authModel = _authModel.copyWith(isAuthenticated: true, error: null);
      }
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      // Provide more specific error messages based on the exception
      String errorMessage = 'Registration failed. Please try again.';
      
      if (e.toString().contains('already registered')) {
        errorMessage = 'This email is already registered. Please use another email or try logging in.';
      } else if (e.toString().contains('Network error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (e.toString().contains('Invalid')) {
        errorMessage = 'Invalid information provided. Please check your details and try again.';
      }
      
      _authModel = _authModel.copyWith(
        error: errorMessage,
        isAuthenticated: false,
      );
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    try {
      // Clear tokens from storage
      await _apiService.clearTokens();
      // Reset auth model
      _authModel = AuthModel();
      notifyListeners();
    } catch (e) {
      // Even if token clearing fails, reset the auth model
      _authModel = AuthModel();
      notifyListeners();
    }
  }

  bool validatePassword(String password) {
    // Password requirements: 8+ chars, at least 1 number, 1 symbol
    bool hasMinLength = password.length >= 8;
    bool hasNumber = password.contains(RegExp(r'[0-9]'));
    bool hasSymbol = password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    
    return hasMinLength && hasNumber && hasSymbol;
  }
  
  // Verify email with verification code
  Future<bool> verifyEmail(String code) async {
    if (_authModel.email == null) {
      _authModel = _authModel.copyWith(
        error: 'Email is required for verification',
        isAuthenticated: false,
      );
      notifyListeners();
      return false;
    }
    
    _isLoading = true;
    notifyListeners();
    
    try {
      final success = await _apiService.verifyEmail(_authModel.email!, code);
      _isLoading = false;
      
      if (success) {
        _authModel = _authModel.copyWith(error: null);
      } else {
        _authModel = _authModel.copyWith(error: 'Invalid verification code');
      }
      
      notifyListeners();
      return success;
    } catch (e) {
      _isLoading = false;
      _authModel = _authModel.copyWith(error: 'Verification failed: ${e.toString()}');
      notifyListeners();
      return false;
    }
  }
  
  // Removed bypass verification method as it's no longer needed
}
