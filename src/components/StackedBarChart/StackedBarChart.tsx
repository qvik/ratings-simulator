type Color = 'slate' | 'gray' | 'red' | 'green' | 'blue';

type ColorMapping = Record<Color, string>;

// any color here should be added to the tailwind config safelist as well
export const colorToThemeMapping: ColorMapping = {
  slate: 'bg-slate-400',
  gray: 'bg-gray-400',
  red: 'bg-red-400',
  green: 'bg-green-400',
  blue: 'bg-blue-400',
};

type ChartData = {
  label: string;
  color: string;
  value: number;
};

type StackedBarChartDataSet = {
  label: string;
  value: ChartData[];
};

type StackedBarChartProps = {
  datasets: StackedBarChartDataSet[];
  renderDatasetLabel?: (label: string) => JSX.Element;
};

export default function StackedBarChart({
  datasets,
  renderDatasetLabel,
}: StackedBarChartProps) {
  return (
    <div className="min-h-[96px]">
      {datasets.map((dataset) => (
        <div key={dataset.label} className="pb-2 pl-[100px] pt-2 relative">
          <div className="h-[6px] overflow-hidden flex flex-row relative bg-gray-100">
            {dataset.value.map(({ color, value }, index) => (
              <div
                key={index}
                style={{
                  width: `${value * 100}%`,
                }}
                className={
                  'h-[6px] transition-width duration-100 overflow-hidden' +
                  ' ' +
                  colorToThemeMapping[color as Color]
                }
              ></div>
            ))}
          </div>
          <div className="w-[80px] absolute left-0 text-right top-0">
            {renderDatasetLabel
              ? renderDatasetLabel(dataset.label)
              : dataset.label}
          </div>
        </div>
      ))}
    </div>
  );
}
