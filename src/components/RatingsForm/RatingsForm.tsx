import numeral from 'numeral';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { getIntegerInputValue } from '../../helpers';
import { RatingsFormData } from '../../types';

type NumberInputProps = InputHTMLAttributes<HTMLInputElement>;

function NumberInput(props: NumberInputProps) {
  return (
    <input
      type="text"
      className="border-cyan text-right w-[100px] focus:outline-none border rounded-sm p-1 pr-2 focus:border-gray-600"
      {...props}
    />
  );
}

type RatingsFormProps = {
  formData: RatingsFormData;
  ratingCount: number;
  prospectiveRatingCount: number;
  setFormData: Dispatch<SetStateAction<RatingsFormData>>;
};

export default function RatingsForm({
  formData,
  ratingCount,
  prospectiveRatingCount,
  setFormData,
}: RatingsFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: 'ratings' | 'prospectiveRatings',
    rowIndex: number
  ) => {
    const fieldValue = e.currentTarget.value;
    setFormData((formState) => ({
      ...formState,
      [key]: formData[key].map((value, index) =>
        rowIndex === index ? getIntegerInputValue(fieldValue) : value
      ) as RatingsFormData['ratings'],
    }));
  };

  return (
    <div>
      <table className="table-auto w-full text-right">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>&nbsp;</th>
            <th className="text-gray-500 p-2 font-normal">Ratings</th>
            <th className="text-gray-500 p-2 font-normal">
              Prospective Ratings
            </th>
          </tr>
        </thead>
        <tbody>
          {[5, 4, 3, 2, 1].map((starCount) => {
            return (
              <tr key={String(starCount)}>
                <th className="text-gray-500 font-normal" scope="row">
                  {starCount} Star
                </th>
                <td>
                  <NumberInput
                    value={formData.ratings[starCount - 1]}
                    onChange={(e) =>
                      handleInputChange(e, 'ratings', starCount - 1)
                    }
                  />
                </td>
                <td>
                  <NumberInput
                    value={formData.prospectiveRatings[starCount - 1]}
                    onChange={(e) =>
                      handleInputChange(e, 'prospectiveRatings', starCount - 1)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th className="text-gray-500 font-normal">Total ratings</th>
            <td className="p-2">{numeral(ratingCount).format('0,0')}</td>
            <td className="p-2">
              {numeral(prospectiveRatingCount).format('0,0')}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
