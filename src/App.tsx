import numeral from 'numeral';

import { useState } from 'react';
import RatingsForm from './components/RatingsForm/RatingsForm';
import { RatingsFormData } from './types';

import Star from './assets/star.svg';

import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import Card from './components/Card/Card';
import { calculateSimulation, getChartData } from './helpers';

import './App.css';

const MAU_POOL = 200000;

function renderDatasetLabel(label: string) {
  const stars = parseInt(label);
  return (
    <div className="flex flex-row pt-[4px] justify-end opacity-40">
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

export default function App() {
  const [formData, setFormData] = useState<RatingsFormData>(initialFormData);

  const simulationResult = calculateSimulation(formData, MAU_POOL);

  const {
    averageRating,
    ratingCount,
    averageProspectiveRating,
    combinedRatingCount,
  } = simulationResult;

  const {
    ratingsDistribution,
    remainsDistribution,
    decreaseDistribution,
    increaseDistribution,
  } = getChartData(formData, simulationResult);

  const originalDatasets = ratingsDistribution.map((value, index) => ({
    label: `${index + 1} stars`,
    value: [{ color: 'blue', value, label: '' }],
  }));

  const prospectiveDatasets = remainsDistribution.map((value, index) => ({
    label: `${index + 1} stars`,
    value: [
      { color: 'blue', value, label: 'Remains' },
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
  }));

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-10">Ratings Simulator</h1>
      <div className={'mb-6 max-w-md'}>
        <RatingsForm formData={formData} setFormData={setFormData} />
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
    </div>
  );
}
