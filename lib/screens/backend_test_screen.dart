import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/api_service.dart';

class BackendTestScreen extends StatefulWidget {
  const BackendTestScreen({super.key});

  @override
  State<BackendTestScreen> createState() => _BackendTestScreenState();
}

class _BackendTestScreenState extends State<BackendTestScreen> {
  final ApiService _apiService = ApiService();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  
  String _responseText = 'No response yet';
  bool _isLoading = false;
  
  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }
  
  Future<void> _testApiRoot() async {
    setState(() {
      _isLoading = true;
      _responseText = 'Testing API root...';
    });
    
    try {
      final response = await _apiService.getHeaders(requireAuth: false);
      final result = await _makeRequest(
        'GET',
        Uri.parse('${_apiService.baseUrl}/api'),
        headers: response,
      );
      
      setState(() {
        _responseText = 'API Root Response: $result';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _testLogin() async {
    if (_emailController.text.isEmpty || _passwordController.text.isEmpty) {
      setState(() {
        _responseText = 'Please enter email and password';
      });
      return;
    }
    
    setState(() {
      _isLoading = true;
      _responseText = 'Testing login...';
    });
    
    try {
      final result = await _apiService.login(
        _emailController.text,
        _passwordController.text,
      );
      
      setState(() {
        _responseText = 'Login Response: $result';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'Login Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _testRegister() async {
    if (_emailController.text.isEmpty || 
        _passwordController.text.isEmpty ||
        _nameController.text.isEmpty) {
      setState(() {
        _responseText = 'Please enter name, email and password';
      });
      return;
    }
    
    setState(() {
      _isLoading = true;
      _responseText = 'Testing registration...';
    });
    
    try {
      final result = await _apiService.register(
        _emailController.text,
        _passwordController.text,
        _nameController.text,
      );
      
      setState(() {
        _responseText = 'Register Response: $result';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'Register Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _testGetMechanics() async {
    setState(() {
      _isLoading = true;
      _responseText = 'Getting mechanics...';
    });
    
    try {
      final result = await _apiService.getMechanics();
      
      setState(() {
        _responseText = 'Mechanics Response: $result';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'Mechanics Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _testGetUserProfile() async {
    setState(() {
      _isLoading = true;
      _responseText = 'Getting user profile...';
    });
    
    try {
      final result = await _apiService.getUserProfile();
      
      setState(() {
        _responseText = 'User Profile Response: $result';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'User Profile Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<void> _logout() async {
    setState(() {
      _isLoading = true;
      _responseText = 'Logging out...';
    });
    
    try {
      await _apiService.logout();
      
      setState(() {
        _responseText = 'Logged out successfully';
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _responseText = 'Logout Error: $e';
        _isLoading = false;
      });
    }
  }
  
  Future<dynamic> _makeRequest(String method, Uri uri, {Map<String, String>? headers, Object? body}) async {
    try {
      final client = await _apiService.getHeaders(requireAuth: false);
      final response = await _getResponse(method, uri, headers: client, body: body);
      return response;
    } catch (e) {
      throw Exception('Error making request: $e');
    }
  }
  
  Future<dynamic> _getResponse(String method, Uri uri, {Map<String, String>? headers, Object? body}) async {
    switch (method) {
      case 'GET':
        return await _makeGetRequest(uri, headers: headers);
      default:
        throw Exception('Unsupported method');
    }
  }
  
  Future<dynamic> _makeGetRequest(Uri uri, {Map<String, String>? headers}) async {
    try {
      final client = headers ?? await _apiService.getHeaders(requireAuth: false);
      final response = await _makeHttpRequest(uri, headers: client);
      return response;
    } catch (e) {
      throw Exception('Error making GET request: $e');
    }
  }
  
  Future<dynamic> _makeHttpRequest(Uri uri, {Map<String, String>? headers}) async {
    try {
      final response = await http.get(uri, headers: headers);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response.body;
      } else {
        throw Exception('HTTP Error: ${response.statusCode} - ${response.body}');
      }
    } catch (e) {
      throw Exception('Error making HTTP request: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Backend API Test'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Test Backend API Connection',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            
            // Input fields
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Name',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 10),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            
            // Test buttons
            ElevatedButton(
              onPressed: _isLoading ? null : _testApiRoot,
              child: const Text('Test API Root'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isLoading ? null : _testLogin,
              child: const Text('Test Login'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isLoading ? null : _testRegister,
              child: const Text('Test Register'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isLoading ? null : _testGetMechanics,
              child: const Text('Test Get Mechanics'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isLoading ? null : _testGetUserProfile,
              child: const Text('Test Get User Profile'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: _isLoading ? null : _logout,
              child: const Text('Test Logout'),
            ),
            const SizedBox(height: 20),
            
            // Response display
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Response:',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  _isLoading
                      ? const Center(child: CircularProgressIndicator())
                      : Text(_responseText),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
