import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { getIntegerInputValue } from '../../helpers';
import { RatingsFormData } from '../../types';

type NumberInputProps = InputHTMLAttributes<HTMLInputElement>;

function NumberInput(props: NumberInputProps) {
  return (
    <input
      type="text"
      className="border-cyan text-right w-full focus:outline-none border-b focus:border-b-black"
      {...props}
    />
  );
}

type RatingsFormProps = {
  formData: RatingsFormData;
  setFormData: Dispatch<SetStateAction<RatingsFormData>>;
};

export default function RatingsForm({
  formData,
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
    <div className={'max-w-lg'}>
      <table className="table-auto text-right">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>&nbsp;</th>
            <th className="font-normal">Ratings</th>
            <th className="font-normal">Propspective Ratings</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((starCount, rowIndex) => {
            return (
              <tr key={String(rowIndex)}>
                <td>{starCount} Star</td>
                <td>
                  <NumberInput
                    value={formData.ratings[rowIndex]}
                    onChange={(e) => handleInputChange(e, 'ratings', rowIndex)}
                  />
                </td>
                <td>
                  <NumberInput
                    value={formData.prospectiveRatings[rowIndex]}
                    onChange={(e) =>
                      handleInputChange(e, 'prospectiveRatings', rowIndex)
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
