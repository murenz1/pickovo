import 'package:flutter/material.dart';

enum TransactionType {
  payment,
  deposit,
  withdrawal
}

class Transaction {
  final String id;
  final String title;
  final DateTime date;
  final double amount;
  final TransactionType type;
  final String? description;
  final IconData icon;

  Transaction({
    required this.id,
    required this.title,
    required this.date,
    required this.amount,
    required this.type,
    this.description,
    required this.icon,
  });

  bool get isCredit => type == TransactionType.deposit;
  bool get isDebit => type == TransactionType.payment || type == TransactionType.withdrawal;

  String get formattedAmount {
    final prefix = isCredit ? '+' : '-';
    return '$prefix FRw ${amount.toStringAsFixed(0)}';
  }

  Color getAmountColor(BuildContext context) {
    return isCredit ? Colors.green : Colors.red;
  }

  String get formattedDate {
    return '${date.month}/${date.day}/${date.year}';
  }
}

// Sample transactions for testing
List<Transaction> getSampleTransactions() {
  return [
    Transaction(
      id: '1',
      title: 'Oil Change',
      date: DateTime(2025, 5, 5),
      amount: 30000,
      type: TransactionType.payment,
      icon: Icons.oil_barrel,
    ),
    Transaction(
      id: '2',
      title: 'Added Money',
      date: DateTime(2025, 5, 1),
      amount: 100000,
      type: TransactionType.deposit,
      icon: Icons.add_circle_outline,
    ),
    Transaction(
      id: '3',
      title: 'Tire Rotation',
      date: DateTime(2025, 4, 20),
      amount: 15000,
      type: TransactionType.payment,
      icon: Icons.tire_repair,
    ),
    Transaction(
      id: '4',
      title: 'Insurance Payment',
      date: DateTime(2025, 4, 15),
      amount: 25000,
      type: TransactionType.payment,
      icon: Icons.shield,
    ),
    Transaction(
      id: '5',
      title: 'Added Money',
      date: DateTime(2025, 4, 10),
      amount: 200000,
      type: TransactionType.deposit,
      icon: Icons.add_circle_outline,
    ),
  ];
}
