import 'package:flutter/material.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

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
                  'Privacy Policy',
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
                    'Privacy Policy',
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
                    'Pickovo Ltd ("us", "we", or "our") operates the Pickovo mobile application and website (collectively, the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Information Collection and Use
                  const Text(
                    '1. Information Collection and Use',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'We collect several different types of information for various purposes to provide and improve our Service to you.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Types of Data Collected:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 8),
                  _buildBulletPoint('Email address'),
                  _buildBulletPoint('First name and last name'),
                  _buildBulletPoint('Phone number'),
                  _buildBulletPoint('Address, State, Province, ZIP/Postal code, City'),
                  _buildBulletPoint('National ID number'),
                  _buildBulletPoint('Vehicle registration information'),
                  _buildBulletPoint('Payment information'),
                  _buildBulletPoint('Cookies and Usage Data'),
                  const SizedBox(height: 16),
                  const Text(
                    'Usage Data: We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer\'s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Use of Data
                  const Text(
                    '2. Use of Data',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Pickovo uses the collected data for various purposes:',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 8),
                  _buildBulletPoint('To provide and maintain our Service'),
                  _buildBulletPoint('To notify you about changes to our Service'),
                  _buildBulletPoint('To allow you to participate in interactive features of our Service when you choose to do so'),
                  _buildBulletPoint('To provide customer support'),
                  _buildBulletPoint('To gather analysis or valuable information so that we can improve our Service'),
                  _buildBulletPoint('To monitor the usage of our Service'),
                  _buildBulletPoint('To detect, prevent and address technical issues'),
                  _buildBulletPoint('To process payments and loan applications'),
                  _buildBulletPoint('To connect you with repair service providers'),
                  const SizedBox(height: 24),
                  
                  // Transfer of Data
                  const Text(
                    '3. Transfer of Data',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.\n\nIf you are located outside Rwanda and choose to provide information to us, please note that we transfer the data, including Personal Data, to Rwanda and process it there.\n\nYour consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Security of Data
                  const Text(
                    '4. Security of Data',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Your Rights
                  const Text(
                    '5. Your Rights',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Pickovo aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.\n\nYou have the right to access, update or delete the information we have on you. Please contact us to assist you with these requests.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Changes to This Privacy Policy
                  const Text(
                    '6. Changes to This Privacy Policy',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.\n\nYou are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 24),
                  
                  // Contact Us
                  const Text(
                    '7. Contact Us',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'If you have any questions about this Privacy Policy, please contact us:',
                    style: TextStyle(height: 1.5),
                  ),
                  const SizedBox(height: 8),
                  _buildBulletPoint('By email: privacy@pickovo.com'),
                  _buildBulletPoint('By phone: +250 788 123 456'),
                  _buildBulletPoint('By mail: Pickovo Ltd, KG 123 St, Kigali, Rwanda'),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBulletPoint(String text) {
    return Padding(
      padding: const EdgeInsets.only(left: 16.0, bottom: 4.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('• '),
          Expanded(child: Text(text)),
        ],
      ),
    );
  }
}
