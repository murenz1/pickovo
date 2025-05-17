import 'package:flutter/material.dart';

class TermsServiceScreen extends StatelessWidget {
  const TermsServiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Status bar space
          Container(
            height: MediaQuery.of(context).padding.top,
            color: Colors.blue,
          ),
          // App Bar
          Container(
            color: Colors.blue,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
                const Text(
                  'Terms of Service',
                  style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          
          // Content
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Terms of Service',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Last Updated: May 15, 2025',
                    style: TextStyle(
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Welcome to Pickovo. These Terms of Service ("Terms") govern your use of the Pickovo mobile application and website (collectively, the "Service") operated by Pickovo Ltd ("us", "we", or "our").\nBy accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Use of Service
                  const Text(
                    '1. Use of Service',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Pickovo provides a platform for vehicle owners in Rwanda to track repairs, access financing, and manage vehicle insurance. By using our Service, you represent that you are at least 18 years of age and are legally able to enter into binding contracts.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Account Registration
                  const Text(
                    '2. Account Registration',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.\nYou are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Loan Terms and Conditions
                  const Text(
                    '3. Loan Terms and Conditions',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    '3.1. Eligibility: To be eligible for a loan through Pickovo, you must be a Rwandan resident, at least 18 years old, with a valid ID, proof of income, and a registered vehicle.\n\n3.2. Application Process: Loan applications are subject to review and approval based on our credit assessment criteria. We reserve the right to request additional documentation or information to process your application.\n\n3.3. Repayment: You agree to repay any loan according to the terms specified in your loan agreement, including interest rates, repayment schedule, and any applicable fees.\n\n3.4. Default: Failure to make timely repayments may result in additional fees, negative credit reporting, and legal action for recovery of the outstanding amount.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Insurance Terms
                  const Text(
                    '4. Insurance Terms',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    '4.1. Policy Coverage: Insurance policies offered through our Service are provided by licensed insurance partners. The specific coverage, exclusions, and terms are detailed in the policy documents provided upon purchase.\n\n4.2. Claims: Insurance claims must be submitted according to the procedures outlined in your policy documents. We facilitate the claims process but final decisions on claims are made by the insurance provider.\n\n4.3. Premiums: You agree to pay all insurance premiums on time according to the payment schedule in your policy.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Repair Services
                  const Text(
                    '5. Repair Services',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    '5.1. Service Providers: Repair services are provided by independent third-party service providers. While we vet these providers, we do not guarantee their work quality or timeliness.\n\n5.2. Scheduling: When you schedule a repair through our Service, you agree to make your vehicle available at the agreed time and location.\n\n5.3. Payments: You agree to pay for repair services according to the quoted price, subject to adjustments if additional work is required and approved by you.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Intellectual Property
                  const Text(
                    '6. Intellectual Property',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'The Service and its original content, features, and functionality are and will remain the exclusive property of Pickovo Ltd and its licensors. The Service is protected by copyright, trademark, and other laws of Rwanda and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Pickovo Ltd.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Limitation of Liability
                  const Text(
                    '7. Limitation of Liability',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'In no event shall Pickovo Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Governing Law
                  const Text(
                    '8. Governing Law',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'These Terms shall be governed and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Changes to Terms
                  const Text(
                    '9. Changes to Terms',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Contact Us
                  const Text(
                    '10. Contact Us',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'If you have any questions about these Terms, please contact us:',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 8),
                  Padding(
                    padding: const EdgeInsets.only(left: 16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('• By email: terms@pickovo.com'),
                        SizedBox(height: 4),
                        Text('• By phone: +250 788 123 456'),
                        SizedBox(height: 4),
                        Text('• By mail: Pickovo Ltd, KG 123 St, Kigali, Rwanda'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
