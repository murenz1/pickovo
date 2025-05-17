import 'package:flutter/material.dart';

enum SocialLoginType {
  apple,
  facebook,
  google,
}

class SocialLoginButton extends StatelessWidget {
  final SocialLoginType type;
  final VoidCallback onPressed;

  const SocialLoginButton({
    super.key,
    required this.type,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          side: const BorderSide(color: Colors.grey, width: 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _getIcon(),
            const SizedBox(width: 10),
            Text(
              'Continue with ${_getProviderName()}',
              style: const TextStyle(
                color: Colors.black,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _getIcon() {
    switch (type) {
      case SocialLoginType.apple:
        return const Icon(Icons.apple, color: Colors.black);
      case SocialLoginType.facebook:
        return const Icon(Icons.facebook, color: Color(0xFF1877F2));
      case SocialLoginType.google:
        return const Icon(Icons.g_mobiledata, color: Color(0xFFDB4437), size: 30);
    }
  }

  String _getProviderName() {
    switch (type) {
      case SocialLoginType.apple:
        return 'Apple';
      case SocialLoginType.facebook:
        return 'Facebook';
      case SocialLoginType.google:
        return 'Google';
    }
  }
}
