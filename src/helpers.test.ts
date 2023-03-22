import numeral from 'numeral';
import { expect, test } from 'vitest';
import {
  reduceSum,
  reduceSumRating,
  calculateSimulation,
  getChartData,
} from './helpers';
import { RatingsFormData } from './types';

test('Calculate rating count with reduceSum', () => {
  expect([150, 290, 5, 30, 30].reduce(reduceSum, 0)).toEqual(505);
});

test('Calculate weighted rating count with reduceSumRating', () => {
  expect([150, 290, 5, 30, 30].reduce(reduceSumRating, 0)).toEqual(1015);
});

const formatNumber = (value: number) => numeral(value).format('0.0000');

const sampleInputs: RatingsFormData = {
  ratings: [150, 290, 5, 30, 30],
  prospectiveRatings: [100, 1000, 1000, 0, 0],
};

test('calculation result should have the expected format and results', () => {
  const calculationResult = calculateSimulation(sampleInputs, 1000);

  expect(calculationResult.combinedRatings).toEqual([250, 1290, 1005, 30, 30]);

  expect(calculationResult.ratingCount).toEqual(505);
  expect(calculationResult.combinedRatingCount).toEqual(2605);
  expect(calculationResult.prospectiveRatingCount).toEqual(2100);

  expect(formatNumber(calculationResult.averageRating)).toEqual('2.0099');
  expect(formatNumber(calculationResult.averageProspectiveRating)).toEqual(
    '2.3474'
  );

  expect(formatNumber(calculationResult.ratingsPercentage)).toEqual('0.5050');
  expect(formatNumber(calculationResult.combinedRatingsPercentage)).toEqual(
    '2.6050'
  );
});

test('chart data should have the expected format and results', () => {
  const calculationResult = calculateSimulation(sampleInputs, 1000);
  const chartData = getChartData(sampleInputs, calculationResult);
  expect(chartData.ratingsDistribution.map(formatNumber)).toEqual([
    '0.2970',
    '0.5743',
    '0.0099',
    '0.0594',
    '0.0594',
  ]);
  expect(chartData.combinedRatingsDistribution.map(formatNumber)).toEqual([
    '0.0960',
    '0.4952',
    '0.3858',
    '0.0115',
    '0.0115',
  ]);
  expect(chartData.changeDistribution.map(formatNumber)).toEqual([
    '-0.2011',
    '-0.0791',
    '0.3759',
    '-0.0479',
    '-0.0479',
  ]);
  expect(chartData.remainsDistribution.map(formatNumber)).toEqual([
    '0.0960',
    '0.4952',
    '0.0099',
    '0.0115',
    '0.0115',
  ]);
  expect(chartData.increaseDistribution.map(formatNumber)).toEqual([
    '0.0000',
    '0.0000',
    '0.3759',
    '0.0000',
    '0.0000',
  ]);
  expect(chartData.decreaseDistribution.map(formatNumber)).toEqual([
    '0.2011',
    '0.0791',
    '0.0000',
    '0.0479',
    '0.0479',
  ]);
});
