import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Notification {
  final String title;
  final String message;
  final DateTime date;
  final IconData icon;
  final Color iconBackgroundColor;
  final bool hasAction;
  final String? actionText;
  final VoidCallback? onAction;

  Notification({
    required this.title,
    required this.message,
    required this.date,
    required this.icon,
    required this.iconBackgroundColor,
    this.hasAction = false,
    this.actionText,
    this.onAction,
  });
}

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  late List<Notification> _notifications;

  @override
  void initState() {
    super.initState();
    _notifications = [
      Notification(
        title: 'Oil Change Due',
        message: 'Your Toyota Camry is due for an oil change in 2 days.',
        date: DateTime(2025, 5, 15),
        icon: Icons.calendar_today,
        iconBackgroundColor: Colors.blue.shade100,
        hasAction: true,
        actionText: 'Schedule Now',
        onAction: () {
          // Navigate to schedule service screen
        },
      ),
      Notification(
        title: 'Repair Completed',
        message: 'Your brake pad replacement has been completed.',
        date: DateTime(2025, 5, 10),
        icon: Icons.build,
        iconBackgroundColor: Colors.green.shade100,
      ),
      Notification(
        title: 'Payment Successful',
        message: 'Your payment of FRw 35,000 to Auto Finit was successful.',
        date: DateTime(2025, 5, 10),
        icon: Icons.check_circle,
        iconBackgroundColor: Colors.purple.shade100,
      ),
      Notification(
        title: 'Welcome to Fix My Ride',
        message: 'Thank you for joining Fix My Ride. Explore our services!',
        date: DateTime(2025, 5, 1),
        icon: Icons.notifications,
        iconBackgroundColor: Colors.grey.shade200,
      ),
    ];
  }

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
                  'Notifications',
                  style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          
          // Notifications List
          Expanded(
            child: _notifications.isEmpty
                ? const Center(
                    child: Text('No notifications'),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: _notifications.length,
                    separatorBuilder: (context, index) => const Divider(height: 1),
                    itemBuilder: (context, index) {
                      final notification = _notifications[index];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Left blue indicator for unread notifications
                            if (index == 0)
                              Container(
                                width: 4,
                                height: 80,
                                decoration: const BoxDecoration(
                                  color: Colors.blue,
                                  borderRadius: BorderRadius.all(Radius.circular(4)),
                                ),
                              ),
                            
                            // Notification content
                            Expanded(
                              child: Padding(
                                padding: EdgeInsets.only(left: index == 0 ? 12.0 : 16.0),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    // Icon
                                    Container(
                                      width: 40,
                                      height: 40,
                                      decoration: BoxDecoration(
                                        color: notification.iconBackgroundColor,
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Icon(notification.icon, color: Colors.white),
                                    ),
                                    const SizedBox(width: 16),
                                    
                                    // Content
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                            children: [
                                              Text(
                                                notification.title,
                                                style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 16,
                                                ),
                                              ),
                                              Text(
                                                _formatDate(notification.date),
                                                style: TextStyle(
                                                  color: Colors.grey[600],
                                                  fontSize: 12,
                                                ),
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 4),
                                          Text(
                                            notification.message,
                                            style: const TextStyle(
                                              color: Colors.black87,
                                            ),
                                          ),
                                          if (notification.hasAction) ...[
                                            const SizedBox(height: 8),
                                            ElevatedButton(
                                              onPressed: notification.onAction,
                                              style: ElevatedButton.styleFrom(
                                                backgroundColor: Colors.blue.shade50,
                                                foregroundColor: Colors.blue,
                                                elevation: 0,
                                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                                minimumSize: const Size(0, 0),
                                                shape: RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.circular(16),
                                                ),
                                              ),
                                              child: Text(notification.actionText!),
                                            ),
                                          ],
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    if (date.year == now.year && date.month == now.month && date.day == now.day) {
      return 'Today';
    }
    
    final yesterday = now.subtract(const Duration(days: 1));
    if (date.year == yesterday.year && date.month == yesterday.month && date.day == yesterday.day) {
      return 'Yesterday';
    }
    
    return DateFormat('MMM d, yyyy').format(date);
  }
}
