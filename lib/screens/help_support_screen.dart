import 'package:flutter/material.dart';

class FAQ {
  final String question;
  final String answer;
  bool isExpanded;

  FAQ({
    required this.question,
    required this.answer,
    this.isExpanded = false,
  });
}

class HelpSupportScreen extends StatefulWidget {
  const HelpSupportScreen({super.key});

  @override
  State<HelpSupportScreen> createState() => _HelpSupportScreenState();
}

class _HelpSupportScreenState extends State<HelpSupportScreen> {
  final List<FAQ> _faqs = [
    FAQ(
      question: 'How do I track my repair status?',
      answer: 'You can track your repair status by going to the "Repairs" tab in the bottom navigation. There, you\'ll see all your active repairs and their current status. Click on any repair to see detailed information and real-time updates.',
      isExpanded: true,
    ),
    FAQ(
      question: 'How do loan repayments work?',
      answer: 'Loan repayments are processed automatically on the due date from your selected payment method. You can view your repayment schedule in the Insurance & Loans section. You can also make early repayments through the app.',
    ),
    FAQ(
      question: 'What does my insurance cover?',
      answer: 'Your insurance coverage depends on the specific plan you\'ve selected. You can view your coverage details in the Insurance & Loans section. Most plans cover accidents, theft, and damage with varying deductibles.',
    ),
    FAQ(
      question: 'How do I file an insurance claim?',
      answer: 'To file an insurance claim, go to the Insurance & Loans section, select your insurance plan, and tap "File a Claim". Follow the instructions to provide details about the incident and upload any required documentation.',
    ),
    FAQ(
      question: 'How can I change my payment method?',
      answer: 'You can change your payment method by going to the Payment Methods section in the More tab. There, you can add a new payment method or select an existing one as your default for all transactions.',
    ),
  ];

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
                  'Help & Support',
                  style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search for help...',
                prefixIcon: const Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[200],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(vertical: 0),
              ),
            ),
          ),
          
          // Contact Us Section
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Contact Us',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: _buildContactOption(
                        icon: Icons.chat_bubble_outline,
                        title: 'Chat Support',
                        subtitle: 'Available 24/7',
                        onTap: () {
                          // Open chat support
                        },
                      ),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: _buildContactOption(
                        icon: Icons.phone,
                        title: 'Call Us',
                        subtitle: '8AM - 8PM',
                        onTap: () {
                          // Make a call
                        },
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          
          const SizedBox(height: 24),
          
          // FAQs Section
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Frequently Asked Questions',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
          
          // FAQ List
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              itemCount: _faqs.length,
              itemBuilder: (context, index) {
                final faq = _faqs[index];
                return Column(
                  children: [
                    InkWell(
                      onTap: () {
                        setState(() {
                          faq.isExpanded = !faq.isExpanded;
                        });
                      },
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 12.0),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                faq.question,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                            Icon(
                              faq.isExpanded ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                              color: Colors.grey,
                            ),
                          ],
                        ),
                      ),
                    ),
                    if (faq.isExpanded)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: Text(
                          faq.answer,
                          style: TextStyle(
                            color: Colors.grey[700],
                          ),
                        ),
                      ),
                    const Divider(height: 1),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactOption({
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.shade300),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Colors.blue, size: 28),
            const SizedBox(height: 8),
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
