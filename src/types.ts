export type Ratings = [number, number, number, number, number];

export type RatingsFormData = {
  ratings: Ratings;
  prospectiveRatings: Ratings;
};

export type SimulationResult = {
  combinedRatings: Ratings;
  ratingCount: number;
  prospectiveRatingCount: number;
  combinedRatingCount: number;
  ratingsPercentage: number;
  combinedRatingsPercentage: number;
  averageRating: number;
  averageProspectiveRating: number;
};
