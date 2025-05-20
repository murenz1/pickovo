import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../theme/app_theme.dart';
import '../utils/validators.dart';
import '../widgets/auth_button.dart';
import '../widgets/social_login_button.dart';
import 'email_verification_screen.dart';
import 'privacy_policy_screen.dart';
import 'terms_service_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _continueWithEmail() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      authProvider.setEmail(_emailController.text);
      
      // Only validate the email in the first step
      final isEmailValid = await authProvider.validateEmail();
      
      if (isEmailValid && mounted) {
        // Navigate to the next screen to collect more information
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => EmailVerificationScreen(
              email: _emailController.text,
            ),
          ),
        );
      } else if (mounted) {
        // Show error message from provider
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(authProvider.authModel.error ?? 'Invalid email')),
        );
      }
    } catch (e) {
      // Handle unexpected errors
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    } finally {
      // Always reset loading state
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
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
          'Create new account',
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
                const Text(
                  'Begin with creating new account. This helps you keep your book a service.',
                  style: TextStyle(
                    color: Colors.black87,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 24),

                // Email input
                const Text('Email', style: TextStyle(fontWeight: FontWeight.w500)),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: AppTheme.inputDecoration(
                    hintText: 'example@example.com',
                  ),
                  validator: Validators.validateEmail,
                ),
                
                const SizedBox(height: 24),

                const Spacer(),

                // Continue with email button
                AuthButton(
                  text: 'Continue with email',
                  onPressed: _continueWithEmail,
                  isLoading: _isLoading,
                ),
                
                const SizedBox(height: 16),
                
                // Social login divider
                const Row(
                  children: [
                    Expanded(child: Divider()),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16.0),
                      child: Text('or'),
                    ),
                    Expanded(child: Divider()),
                  ],
                ),
                
                const SizedBox(height: 16),
                
                // Social login buttons
                SocialLoginButton(
                  type: SocialLoginType.apple,
                  onPressed: () {},
                ),
                const SizedBox(height: 12),
                SocialLoginButton(
                  type: SocialLoginType.facebook,
                  onPressed: () {},
                ),
                const SizedBox(height: 12),
                SocialLoginButton(
                  type: SocialLoginType.google,
                  onPressed: () {},
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
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const TermsServiceScreen(),
                            ),
                          );
                        },
                        child: const Text('Terms'),
                      ),
                      const Text('and', style: TextStyle(color: Colors.grey)),
                      TextButton(
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const PrivacyPolicyScreen(),
                            ),
                          );
                        },
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
}
