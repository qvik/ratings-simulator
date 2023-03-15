import numeral from 'numeral';

import { useState } from 'react';
import RatingsForm from './components/RatingsForm/RatingsForm';
import { RatingsFormData } from './types';

import Star from './assets/star.svg';

import './App.css';
import StackedBarChart from './components/StackedBarChart/StackedBarChart';
import Card from './components/Card/Card';

const MAU_POOL = 200000;

const reduceSum = (acc: number, count: number) => acc + count;
const reduceSumRating = (acc: number, count: number, index: number) =>
  acc + count * (index + 1);

export default function App() {
  const [formData, setFormData] = useState<RatingsFormData>({
    ratings: [150, 290, 5, 30, 30],
    prospectiveRatings: [0, 0, 0, 30, 1000],
  });

  const combinedRatings = formData.ratings.map(
    (rating, index) => rating + formData.prospectiveRatings[index]
  );

  const ratingCount = formData.ratings.reduce(reduceSum, 0);
  const combinedRatingCount = combinedRatings.reduce(reduceSum, 0);

  // const ratingsPercentage = ratingCount / MAU_POOL;
  // const combinedRatingsPercentage = combinedRatingCount / MAU_POOL;

  const averageRating =
    formData.ratings.reduce(reduceSumRating, 0) / ratingCount;
  const averageProspectiveRating =
    combinedRatings.reduce(reduceSumRating, 0) / combinedRatingCount;

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
            <span className="text-xs text-gray-600">out of 5</span>
          </div>
          <div className="flex w-full sm:w-1/5">
            <span className="text-sm text-gray-600">{ratingCount} Reviews</span>
          </div>
          <div className="w-full sm:w-3/5">
            <StackedBarChart />
          </div>
        </div>
      </Card>
      <Card title={'Prospective Reviews'}>
        <div className="flex items-end flex-col sm:flex-row">
          <div className="flex items-baseline gap-1 w-full sm:w-1/5">
            <strong className="text-3xl">
              {numeral(averageProspectiveRating).format('0.0')}
            </strong>{' '}
            <span className="text-xs text-gray-600">out of 5</span>
          </div>
          <div className="flex w-full sm:w-1/5">
            <span className="text-sm text-gray-600">{ratingCount} Reviews</span>
          </div>
          <div className="w-full sm:w-3/5">
            <StackedBarChart />
          </div>
        </div>
      </Card>
    </div>
  );
}
