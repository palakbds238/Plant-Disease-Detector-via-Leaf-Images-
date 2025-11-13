import React, { useMemo } from 'react';

interface DiseaseChartProps {
  data: Record<string, number>;
}

const COLORS = [
  'bg-blue-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-red-500',
  'bg-orange-500',
];

const DiseaseChart: React.FC<DiseaseChartProps> = ({ data }) => {
  const sortedDiseases = useMemo(() => {
    // Fix: Simplify the sort callback to prevent type errors during arithmetic operations.
    // By directly accessing the numeric value via index, we avoid potential issues with
    // type inference on destructured parameters.
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const total = sortedDiseases.reduce((sum, [, count]) => sum + count, 0);

  if (sortedDiseases.length === 0) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Disease Breakdown</h3>
            <p className="text-gray-500">No diseases have been detected yet. All diagnosed plants are healthy!</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Disease Breakdown</h3>
      <div className="space-y-4">
        {sortedDiseases.map(([name, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const color = COLORS[index % COLORS.length];

          return (
            <div key={name} className="group">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-700 truncate pr-2">{name}</p>
                <p className="text-sm font-semibold text-gray-600">{count}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiseaseChart;