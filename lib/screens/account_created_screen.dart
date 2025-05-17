import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/auth_button.dart';
import 'home_screen.dart';

class AccountCreatedScreen extends StatelessWidget {
  const AccountCreatedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                    width: 120,
                    height: 120,
                    decoration: BoxDecoration(
                      color: AppTheme.primaryColor.withAlpha(25), // Using withAlpha instead of withOpacity
                      shape: BoxShape.circle,
                    ),
                  ),
                  // Fallback icon in case image is not available
                  Icon(
                    Icons.check,
                    size: 60,
                    color: AppTheme.primaryColor,
                  ),
                ],
              ),
              const SizedBox(height: 32),
              
              // Success message
              const Text(
                'Your account\nwas successfully created!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              
              const Text(
                'Only one click to explore online services.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey,
                ),
              ),
              
              const Spacer(),
              
              // Login button
              AuthButton(
                text: 'Log in',
                onPressed: () {
                  // Use pushReplacement with a new route to avoid history issues
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => const HomeScreen()),
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
