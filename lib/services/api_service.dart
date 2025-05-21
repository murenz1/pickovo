import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/foundation.dart' show kDebugMode, debugPrint;

class ApiService {
  // Base URL for your backend API
  final String baseUrl = 'https://pickovo-backend-nu.vercel.app';
  
  // Token storage keys
  static const String _accessTokenKey = 'access_token';
  static const String _refreshTokenKey = 'refresh_token';
  
  // Get the stored token
  Future<String?> getToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return prefs.getString(_accessTokenKey);
    } catch (e) {
      _log('Error getting token: $e');
      return null;
    }
  }
  
  // Store authentication tokens
  Future<void> storeTokens(String accessToken, String refreshToken) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_accessTokenKey, accessToken);
      await prefs.setString(_refreshTokenKey, refreshToken);
    } catch (e) {
      _log('Error storing tokens: $e');
    }
  }
  
  // Clear stored tokens (logout)
  Future<void> clearTokens() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_accessTokenKey);
      await prefs.remove(_refreshTokenKey);
    } catch (e) {
      _log('Error clearing tokens: $e');
    }
  }
  
  // Add auth headers to requests
  Future<Map<String, String>> getHeaders({bool requireAuth = true}) async {
    final headers = {
      'Content-Type': 'application/json',
    };
    
    if (requireAuth) {
      final token = await getToken();
      if (token != null) {
        headers['Authorization'] = 'Bearer $token';
      }
    }
    
    return headers;
  }
  
  // Authentication APIs
  
  // Helper method for logging that only works in debug mode
  void _log(String message) {
    if (kDebugMode) {
      debugPrint('ApiService: $message');
    }
  }

  // Login
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      _log('Attempting login for email: $email');
      
      // First try real API login
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/login'),
        headers: await getHeaders(requireAuth: false),
        body: jsonEncode({'email': email, 'password': password}),
      ).timeout(const Duration(seconds: 15));
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final session = data['session'] as Map<String, dynamic>?;
        
        if (session == null) {
          throw Exception('Invalid response format: missing session data');
        }
        
        final accessToken = session['access_token'] as String?;
        final refreshToken = session['refresh_token'] as String?;
        
        if (accessToken == null || refreshToken == null) {
          throw Exception('Invalid response format: missing access token or refresh token');
        }
        
        await storeTokens(accessToken, refreshToken);
        return data;
      } else if (response.statusCode == 401) {
        // If real login fails with 401 (unauthorized), try test account
        _log('Real login failed, trying test account');
        
        if (email == 'test@example.com' && password == 'password123') {
          _log('Using test account login');
          
          // Create a mock successful response
          final mockData = {
            'user': {
              'id': 'test-user-id',
              'email': email,
              'first_name': 'Test',
              'last_name': 'User',
            },
            'session': {
              'access_token': 'mock-access-token',
              'refresh_token': 'mock-refresh-token',
            }
          };
          
          // Store the mock tokens
          final session = mockData['session'] as Map<String, dynamic>;
          final accessToken = session['access_token'] as String;
          final refreshToken = session['refresh_token'] as String;
          
          await storeTokens(accessToken, refreshToken);
          
          return mockData;
        } else {
          throw Exception('Invalid credentials');
        }
      } else {
        throw Exception('Login failed: ${response.body}');
      }
    } on SocketException {
      throw Exception('Network error: Please check your internet connection');
    } on http.ClientException {
      throw Exception('Connection error: Unable to reach the server');
    } on FormatException {
      throw Exception('Error: Invalid response from server');
    } catch (e) {
      _log('Login error: $e');
      throw Exception('Login failed: ${e.toString()}');
    }
  }
  
  // Register
  Future<Map<String, dynamic>> register(String email, String password, String name) async {
    try {
      // Split name into first_name and last_name if possible
      List<String> nameParts = name.trim().split(' ');
      String firstName = nameParts[0];
      String lastName = nameParts.length > 1 ? nameParts.sublist(1).join(' ') : '';
      
      _log('Attempting registration for email: $email');
      
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/register'),
        headers: await getHeaders(requireAuth: false),
        body: jsonEncode({
          'email': email,
          'password': password,
          'first_name': firstName,
          'last_name': lastName,
        }),
      ).timeout(const Duration(seconds: 15));
      
      if (response.statusCode == 201) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        
        // After successful registration, automatically login
        try {
          final loginData = await login(email, password);
          return loginData;
        } catch (e) {
          // If auto-login fails, still return registration data
          _log('Auto-login failed after registration: $e');
          return data;
        }
      } else {
        final errorData = jsonDecode(response.body) as Map<String, dynamic>?;
        final errorMessage = errorData?['error'] ?? 
            errorData?['message'] ?? 
            'Registration failed: ${response.statusCode}';
        
        throw Exception(errorMessage);
      }
    } on SocketException {
      throw Exception('Network error: Please check your internet connection');
    } on http.ClientException {
      throw Exception('Connection error: Unable to reach the server');
    } on FormatException {
      throw Exception('Error: Invalid response from server');
    } catch (e) {
      _log('Registration error: $e');
      throw Exception('Registration failed: ${e.toString()}');
    }
  }
  
  // Get user profile
  Future<Map<String, dynamic>> getUserProfile() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/api/auth/user'),
        headers: await getHeaders(),
      ).timeout(const Duration(seconds: 10));
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        // Ensure we return the user data in the correct format
        if (data is Map<String, dynamic> && 
            data.containsKey('id') && 
            data.containsKey('profile')) {
          final profile = data['profile'] as Map<String, dynamic>;
          return {
            'user': {
              'id': data['id'],
              'email': data['email'],
              'first_name': profile['first_name'] ?? '',
              'last_name': profile['last_name'] ?? '',
            }
          };
        } else {
          throw Exception('Invalid user data format from server');
        }
      } else if (response.statusCode == 401) {
        // If unauthorized, clear tokens and throw appropriate error
        await clearTokens();
        throw Exception('Session expired. Please login again.');
      } else if (response.statusCode == 404 || 
                 response.statusCode == 500) {
        // If user not found or profile creation failed
        final errorData = jsonDecode(response.body) as Map<String, dynamic>;
        final code = errorData['code'] as String?;
        
        if (code == 'PGRST116') {
          // If profile doesn't exist, try to create it
          try {
            final token = await getToken();
            if (token != null) {
              // Try to create the profile
              final response = await http.post(
                Uri.parse('$baseUrl/api/auth/update-profile'),
                headers: await getHeaders(),
                body: jsonEncode({
                  'first_name': 'New',
                  'last_name': 'User',
                  'phone_number': ''
                }),
              );
              
              if (response.statusCode == 200) {
                // Profile created successfully, try getting it again
                return getUserProfile();
              }
            }
          } catch (e) {
            _log('Failed to create profile: $e');
          }
          
          throw Exception('User profile not found. Please register or login again.');
        }
        
        throw Exception('Failed to get user profile: ${errorData['message'] ?? errorData['error'] ?? response.body}');
      } else {
        final errorData = jsonDecode(response.body) as Map<String, dynamic>;
        throw Exception('Failed to get user profile: ${errorData['message'] ?? errorData['error'] ?? response.body}');
      }
    } on SocketException {
      throw Exception('Network error: Please check your internet connection');
    } on TimeoutException {
      throw Exception('Request timed out. Please try again.');
    } on FormatException {
      throw Exception('Invalid response format from server');
    } catch (e) {
      throw Exception('Failed to get user profile: ${e.toString()}');
    }
  }
  
  // Update user profile
  Future<Map<String, dynamic>> updateProfile(Map<String, dynamic> profileData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/auth/update-profile'),
      headers: await getHeaders(),
      body: jsonEncode(profileData),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to update profile: ${response.body}');
    }
  }
  
  // Logout
  Future<void> logout() async {
    try {
      await http.post(
        Uri.parse('$baseUrl/api/auth/logout'),
        headers: await getHeaders(),
      );
    } catch (e) {
      // Ignore errors on logout
    } finally {
      // Always clear tokens locally
      await clearTokens();
    }
  }
  
  // Get bookings
  Future<Map<String, dynamic>> getBookings({int limit = 10, int offset = 0}) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/bookings?limit=$limit&offset=$offset'),
      headers: await getHeaders(),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get bookings: ${response.body}');
    }
  }
  
  // Get booking details
  Future<Map<String, dynamic>> getBookingDetails(String bookingId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/bookings/$bookingId'),
      headers: await getHeaders(),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get booking details: ${response.body}');
    }
  }
  
  // Create booking
  Future<Map<String, dynamic>> createBooking(Map<String, dynamic> bookingData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/bookings'),
      headers: await getHeaders(),
      body: jsonEncode(bookingData),
    );
    
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to create booking: ${response.body}');
    }
  }
  
  // Get mechanics
  Future<List<dynamic>> getMechanics({String? searchQuery, String? specialty, double? minRating, int? limit, int? offset}) async {
    final queryParams = <String, String>{};
    
    if (searchQuery != null) queryParams['search'] = searchQuery;
    if (specialty != null) queryParams['specialty'] = specialty;
    if (minRating != null) queryParams['minRating'] = minRating.toString();
    if (limit != null) queryParams['limit'] = limit.toString();
    if (offset != null) queryParams['offset'] = offset.toString();
    
    final uri = Uri.parse('$baseUrl/api/mechanics').replace(
      queryParameters: queryParams,
    );
    
    final response = await http.get(
      uri,
      headers: await getHeaders(),
    );
    
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['mechanics'] ?? [];
    } else {
      throw Exception('Failed to get mechanics: ${response.body}');
    }
  }
  
  // Get user vehicles
  Future<List<dynamic>> getVehicles() async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/vehicles'),
      headers: await getHeaders(),
    );
    
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['vehicles'] ?? [];
    } else {
      throw Exception('Failed to get vehicles: ${response.body}');
    }
  }
  
  // Add vehicle
  Future<Map<String, dynamic>> addVehicle(Map<String, dynamic> vehicleData) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/vehicles'),
      headers: await getHeaders(),
      body: jsonEncode(vehicleData),
    );
    
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to add vehicle: ${response.body}');
    }
  }
  
  // Get wallet transactions
  Future<Map<String, dynamic>> getWalletTransactions({int limit = 10, int offset = 0}) async {
    final response = await http.get(
      Uri.parse('$baseUrl/api/wallet?limit=$limit&offset=$offset'),
      headers: await getHeaders(),
    );
    
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get wallet transactions: ${response.body}');
    }
  }
  
  // Test verification code - in a real app, this would be sent via email
  static const String testVerificationCode = '12345';
  
  // Verify email with code
  Future<bool> verifyEmail(String email, String code) async {
    try {
      // In a real implementation, this would make an API call to verify the code
      // For testing purposes, we'll check against our test code
      await Future.delayed(const Duration(milliseconds: 500));
      return code == testVerificationCode;
    } catch (e) {
      throw Exception('Failed to verify email: ${e.toString()}');
    }
  }
  
  // Removed auto-verify email method as it's no longer needed
}
