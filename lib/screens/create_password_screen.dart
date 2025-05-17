import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../widgets/auth_button.dart';
import '../widgets/password_input.dart';
import 'account_created_screen.dart';

class CreatePasswordScreen extends StatefulWidget {
  final String email;

  const CreatePasswordScreen({
    super.key,
    required this.email,
  });

  @override
  State<CreatePasswordScreen> createState() => _CreatePasswordScreenState();
}

class _CreatePasswordScreenState extends State<CreatePasswordScreen> {
  final TextEditingController _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  
  // Password strength indicators
  bool _hasMinLength = false;
  bool _hasNumber = false;
  bool _hasSymbol = false;
  
  @override
  void dispose() {
    _passwordController.dispose();
    super.dispose();
  }
  
  void _checkPasswordStrength(String password) {
    setState(() {
      _hasMinLength = password.length >= 8;
      _hasNumber = password.contains(RegExp(r'[0-9]'));
      _hasSymbol = password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    });
  }
  
  void _createPassword() {
    if (!_formKey.currentState!.validate()) return;
    
    // Check if password meets all requirements
    if (!_hasMinLength || !_hasNumber || !_hasSymbol) return;
    
    setState(() {
      _isLoading = true;
    });
    
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    authProvider.setEmail(widget.email);
    authProvider.setPassword(_passwordController.text);
    
    // For demo purposes, simulate registration
    Future.delayed(const Duration(seconds: 1), () {
      // Check if the widget is still mounted before updating state
      if (!mounted) return;
      
      setState(() {
        _isLoading = false;
      });
      
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const AccountCreatedScreen(),
        ),
      );
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Create password',
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Step indicator
                const Text(
                  'Create your password 3 / 3',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 24),
                
                // Password field
                const Text('Password', style: TextStyle(fontWeight: FontWeight.w500)),
                const SizedBox(height: 8),
                PasswordInput(
                  controller: _passwordController,
                  hintText: 'Enter password',
                  onChanged: _checkPasswordStrength,
                ),
                
                const SizedBox(height: 24),
                
                // Password requirements
                _PasswordRequirement(
                  text: '8 characters minimum',
                  isMet: _hasMinLength,
                ),
                const SizedBox(height: 8),
                _PasswordRequirement(
                  text: 'a number',
                  isMet: _hasNumber,
                ),
                const SizedBox(height: 8),
                _PasswordRequirement(
                  text: 'a symbol',
                  isMet: _hasSymbol,
                ),
                
                // Password strength indicator
                const SizedBox(height: 24),
                LinearProgressIndicator(
                  value: (_hasMinLength ? 0.33 : 0) + 
                         (_hasNumber ? 0.33 : 0) + 
                         (_hasSymbol ? 0.34 : 0),
                  backgroundColor: Colors.grey[300],
                  color: _getProgressColor(),
                  minHeight: 6,
                  borderRadius: BorderRadius.circular(3),
                ),
                
                const Spacer(),
                
                // Continue button
                AuthButton(
                  text: 'Continue',
                  onPressed: _createPassword,
                  isLoading: _isLoading,
                ),

                // Terms and privacy policy
                const SizedBox(height: 24),
                const Center(
                  child: Text(
                    'By using Pickovo, you agree to the',
                    style: TextStyle(color: Colors.grey),
                  ),
                ),
                Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: const Text('Terms'),
                      ),
                      const Text('and', style: TextStyle(color: Colors.grey)),
                      TextButton(
                        onPressed: () {},
                        child: const Text('Privacy Policy'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
  
  Color _getProgressColor() {
    int metRequirements = (_hasMinLength ? 1 : 0) + 
                          (_hasNumber ? 1 : 0) + 
                          (_hasSymbol ? 1 : 0);
    
    if (metRequirements == 0) return Colors.grey;
    if (metRequirements == 1) return Colors.red;
    if (metRequirements == 2) return Colors.orange;
    return Colors.green;
  }
}

class _PasswordRequirement extends StatelessWidget {
  final String text;
  final bool isMet;
  
  const _PasswordRequirement({
    required this.text,
    required this.isMet,
  });
  
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          isMet ? Icons.check_circle : Icons.circle_outlined,
          color: isMet ? Colors.green : Colors.grey,
          size: 20,
        ),
        const SizedBox(width: 8),
        Text(text),
      ],
    );
  }
}
