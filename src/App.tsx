import numeral from 'numeral';

import { useState } from 'react';
import RatingsForm from './components/RatingsForm/RatingsForm';
import { RatingsFormData } from './types';

import Logo from './assets/qvik-logo.svg';
import Star from './assets/star.svg';

import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import Card from './components/Card/Card';
import { calculateSimulation, getChartData } from './helpers';

import './App.css';

const MAU_POOL = 200000;

function renderDatasetLabel(label: string) {
  const stars = parseInt(label);
  return (
    <div className="flex flex-row pt-[4px] justify-end">
      {[...Array(stars).keys()].map((i) => (
        <img key={i} width={15} src={Star} alt="star" />
      ))}
    </div>
  );
}

const initialFormData: RatingsFormData = {
  ratings: [150, 290, 5, 30, 30],
  prospectiveRatings: [0, 0, 0, 30, 1000],
};

const SHOW_COLOR_CODING = false;

export default function App() {
  const [formData, setFormData] = useState<RatingsFormData>(initialFormData);

  const simulationResult = calculateSimulation(formData, MAU_POOL);

  const {
    averageRating,
    ratingCount,
    prospectiveRatingCount,
    averageProspectiveRating,
    combinedRatingCount,
  } = simulationResult;

  const {
    ratingsDistribution,
    remainsDistribution,
    combinedRatingsDistribution,
    decreaseDistribution,
    increaseDistribution,
  } = getChartData(formData, simulationResult);

  const originalDatasets = ratingsDistribution.map((value, index) => ({
    label: `${index + 1} stars`,
    value: [{ color: 'slate', value, label: '' }],
  }));

  const prospectiveDatasets = SHOW_COLOR_CODING
    ? remainsDistribution.map((value, index) => ({
        label: `${index + 1} stars`,
        value: [
          { color: 'slate', value, label: 'Remains' },
          {
            color: 'red',
            value: decreaseDistribution[index],
            label: 'Decrease',
          },
          {
            color: 'green',
            value: increaseDistribution[index],
            label: 'Increase',
          },
        ],
      }))
    : combinedRatingsDistribution.map((value, index) => ({
        label: `${index + 1} stars`,
        value: [{ color: 'slate', value, label: 'Remains' }],
      }));

  return (
    <div className="flex flex-col p-5 sm:p-10">
      <h1 className="text-3xl font-bold mb-10">Qvik App Ratings Simulator</h1>
      <p className="mb-6">
        This tool allows you to explore the possible changes in an app's rating
        based on acquiring more prospective reviews. Enter the existing reviews
        in to the first column, then use the second column to add the number of
        new, prospective ratings to see how the distribution and average of
        ratings changes.{' '}
      </p>
      <p className="mb-6">
        Read more about how you activate users to leave positive ratings from
        Qvik blog:{' '}
        <a
          className="underline"
          href="https://qvik.com/news/how-many-stars-does-your-app-have/"
          target={'_blank'}
        >
          How many stars does your app have?
        </a>
        {/* {' '}
        and TODO: next post */}
      </p>
      <div className={'mb-6 max-w-md'}>
        <RatingsForm
          ratingCount={ratingCount}
          prospectiveRatingCount={prospectiveRatingCount}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <Card title={'Original Reviews'}>
        <div className="flex items-end flex-col sm:flex-row">
          <div className="flex items-baseline gap-1 w-full sm:w-1/5">
            <strong className="text-3xl">
              {numeral(averageRating).format('0.0')}
            </strong>{' '}
            <span className="text-xs text-gray-500">out of 5</span>
          </div>
          <div className="flex w-full sm:w-1/5">
            <span className="text-sm text-gray-500">{ratingCount} Reviews</span>
          </div>
          <div className="w-full sm:w-3/5">
            <StackedBarChart
              options={{
                label: '',
                datasets: [...originalDatasets].reverse(),
                renderDatasetLabel,
              }}
            />
          </div>
        </div>
      </Card>
      <Card title={'Prospective Reviews'}>
        <div className="flex items-end flex-col sm:flex-row">
          <div className="flex items-baseline gap-1 w-full sm:w-1/5">
            <strong className="text-3xl">
              {numeral(averageProspectiveRating).format('0.0')}
            </strong>{' '}
            <span className="text-xs text-gray-500">out of 5</span>
          </div>
          <div className="flex w-full sm:w-1/5">
            <span className="text-sm text-gray-500">
              {numeral(combinedRatingCount).format('0,0')} Reviews
            </span>
          </div>
          <div className="w-full sm:w-3/5">
            <StackedBarChart
              options={{
                label: '',
                datasets: [...prospectiveDatasets].reverse(),
                renderDatasetLabel,
              }}
            />
          </div>
        </div>
      </Card>
      <div className="flex basis-auto items-center justify-center pt-10">
        <a className="inline" href="https://qvik.com" target={'_blank'}>
          <img src={Logo} alt="Qvik" />
        </a>
      </div>
    </div>
  );
}
