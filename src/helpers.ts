import { Ratings, RatingsFormData, SimulationResult } from './types';

export function getIntegerInputValue(inputValue: string) {
  const newValue = parseInt(inputValue?.replace(/\D/, '') || '');
  return isNaN(newValue) ? 0 : newValue;
}

export const reduceSum = (acc: number, count: number) => acc + count;
export const reduceSumRating = (acc: number, count: number, index: number) =>
  acc + count * (index + 1);

export function getChartData(
  inputs: RatingsFormData,
  simulationResult: SimulationResult
) {
  const ratingsDistribution = inputs.ratings.map(
    (ratingCount) => ratingCount / simulationResult.ratingCount
  );
  const combinedRatingsDistribution = simulationResult.combinedRatings.map(
    (ratingCount) => ratingCount / simulationResult.combinedRatingCount
  );
  const changeDistribution = combinedRatingsDistribution.map(
    (value, index) => value - ratingsDistribution[index]
  );
  const remainsDistribution = changeDistribution.map((change, index) =>
    change > 0 ? ratingsDistribution[index] : combinedRatingsDistribution[index]
  );
  const increaseDistribution = changeDistribution.map((change) =>
    change > 0 ? change : 0
  );
  const decreaseDistribution = changeDistribution.map((change) =>
    change < 0 ? Math.abs(change) : 0
  );

  return {
    ratingsDistribution,
    combinedRatingsDistribution,
    changeDistribution,
    remainsDistribution,
    increaseDistribution,
    decreaseDistribution,
  };
}

export function calculateSimulation(
  inputs: RatingsFormData,
  mauPool: number
): SimulationResult {
  const combinedRatings = inputs.ratings.map(
    (rating, index) => rating + inputs.prospectiveRatings[index]
  ) as Ratings;

  const ratingCount = inputs.ratings.reduce(reduceSum, 0);
  const combinedRatingCount = combinedRatings.reduce(reduceSum, 0);

  const ratingsPercentage = ratingCount / mauPool;
  const combinedRatingsPercentage = combinedRatingCount / mauPool;

  const averageRating = inputs.ratings.reduce(reduceSumRating, 0) / ratingCount;
  const averageProspectiveRating =
    combinedRatings.reduce(reduceSumRating, 0) / combinedRatingCount;

  return {
    combinedRatings,
    ratingCount,
    combinedRatingCount,
    ratingsPercentage,
    combinedRatingsPercentage,
    averageRating,
    averageProspectiveRating,
  };
}
