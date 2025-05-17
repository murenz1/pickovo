class Review {
  final String username;
  final double rating;
  final String comment;
  final DateTime date;

  Review({
    required this.username,
    required this.rating,
    required this.comment,
    required this.date,
  });
}

// Sample reviews data
List<Review> getSampleReviews() {
  return [
    Review(
      username: 'Jean Pierre',
      rating: 5.0,
      comment: 'Excellent service! They fixed my car quickly and at a reasonable price.',
      date: DateTime(2023, 5, 10),
    ),
    Review(
      username: 'Marie Claire',
      rating: 3.5,
      comment: 'Good service but had to wait a bit longer than expected. The mechanics are very professional though.',
      date: DateTime(2023, 5, 5),
    ),
    Review(
      username: 'Emmanuel',
      rating: 5.0,
      comment: 'Best garage in Kigali! They diagnosed and fixed my engine problem that other garages couldn\'t figure out.',
      date: DateTime(2023, 4, 28),
    ),
    Review(
      username: 'Sophie',
      rating: 4.5,
      comment: 'Very professional service. The mechanics explained everything clearly before starting the work.',
      date: DateTime(2023, 4, 15),
    ),
    Review(
      username: 'Patrick',
      rating: 4.0,
      comment: 'Good quality work at reasonable prices. Would recommend for regular maintenance.',
      date: DateTime(2023, 4, 10),
    ),
  ];
}
