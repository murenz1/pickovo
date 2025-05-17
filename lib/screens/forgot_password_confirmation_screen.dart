import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/auth_button.dart';
import 'login_screen.dart';

class ForgotPasswordConfirmationScreen extends StatelessWidget {
  final String email;

  const ForgotPasswordConfirmationScreen({
    super.key,
    required this.email,
  });

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
          'Reset password',
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Success icon - can be replaced with an actual image
              Stack(
                alignment: Alignment.center,
                children: [
                  // Image placeholder - replace with actual image
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: AppTheme.primaryColor.withAlpha(25), // Using withAlpha instead of withOpacity
                      shape: BoxShape.circle,
                    ),
                  ),
                  // Fallback icon in case image is not available
                  Icon(
                    Icons.check,
                    size: 40,
                    color: AppTheme.primaryColor,
                  ),
                ],
              ),
              const SizedBox(height: 24),
              
              // Success message
              Text(
                'We have sent an email to $email with instructions to reset your password.',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black87,
                ),
              ),
              
              const Spacer(),
              
              // Back to login button
              AuthButton(
                text: 'Back to login',
                onPressed: () {
                  // Use pushReplacement instead of pushAndRemoveUntil to avoid history issues
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginScreen()),
                  );
                },
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
    );
  }
}
