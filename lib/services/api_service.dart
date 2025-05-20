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
      _log('Attempting login for email: $email'); // Debug log
      
      // For testing purposes, use a fixed test account
      // This will bypass the actual API call and always succeed
      if (email == 'test@example.com' && password == 'password123') {
        _log('Using test account login'); // Debug log
        
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
        await storeTokens(
          mockData['session']!['access_token'] as String,
          mockData['session']!['refresh_token'] as String,
        );
        
        return mockData;
      }
      
      // Real API call for non-test accounts
      _log('Making API request to $baseUrl/api/auth/login'); // Debug log
      final response = await http.post(
        Uri.parse('$baseUrl/api/auth/login'),
        headers: await getHeaders(requireAuth: false),
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      ).timeout(const Duration(seconds: 15));
      
      _log('Login response status: ${response.statusCode}'); // Debug log
      _log('Login response body: ${response.body}'); // Debug log
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        
        // Store tokens
        if (data['session'] != null) {
          await storeTokens(
            data['session']['access_token'],
            data['session']['refresh_token'],
          );
          _log('Tokens stored successfully'); // Debug log
        } else {
          _log('No session data in response'); // Debug log
        }
        
        return data;
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessage = errorData['error'] ?? 'Login failed';
        _log('Login error: $errorMessage'); // Debug log
        throw Exception(errorMessage);
      }
    } on SocketException {
      const errorMessage = 'Network error: Please check your internet connection';
      _log(errorMessage); // Debug log
      throw Exception(errorMessage);
    } on http.ClientException catch (e) {
      final errorMessage = 'Connection error: Unable to reach the server. ${e.message}';
      _log(errorMessage); // Debug log
      throw Exception(errorMessage);
    } on FormatException catch (e) {
      final errorMessage = 'Error: Invalid response from server. ${e.message}';
      _log(errorMessage); // Debug log
      throw Exception(errorMessage);
    } catch (e) {
      final errorMessage = 'Login failed: ${e.toString()}';
      _log(errorMessage); // Debug log
      throw Exception(errorMessage);
    }
  }
  
  // Register
  Future<Map<String, dynamic>> register(String email, String password, String name) async {
    try {
      // Split name into first_name and last_name if possible
      List<String> nameParts = name.trim().split(' ');
      String firstName = nameParts[0];
      String lastName = nameParts.length > 1 ? nameParts.sublist(1).join(' ') : '';
      
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
        final data = jsonDecode(response.body);
        
        // After successful registration, automatically login
        try {
          final loginData = await login(email, password);
          return loginData;
        } catch (e) {
          // If auto-login fails, still return registration data
          return data;
        }
      } else {
        final errorData = jsonDecode(response.body);
        throw Exception(errorData['error'] ?? 'Registration failed');
      }
    } on SocketException {
      throw Exception('Network error: Please check your internet connection');
    } on http.ClientException {
      throw Exception('Connection error: Unable to reach the server');
    } on FormatException {
      throw Exception('Error: Invalid response from server');
    } catch (e) {
      if (e is Exception) {
        rethrow;
      }
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
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to get user profile: ${response.body}');
      }
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
