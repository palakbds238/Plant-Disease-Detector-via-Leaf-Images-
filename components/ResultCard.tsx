import React from 'react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
}

const ConfidenceBadge: React.FC<{ confidence: AnalysisResult['confidence'] }> = ({ confidence }) => {
  const baseClasses = "px-3 py-1 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap";
  switch (confidence) {
    case 'High':
      return <span className={`${baseClasses} bg-red-100 text-red-800`}>High Confidence</span>;
    case 'Medium':
      return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Medium Confidence</span>;
    case 'Low':
      return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Low Confidence</span>;
    default:
      return null;
  }
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result.isPlant) {
    return (
      <div className="w-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md animate-fade-in" role="alert">
        <p className="font-bold">Not a Plant Leaf</p>
        <p className="text-sm sm:text-base">The uploaded image does not appear to be a plant leaf. Please upload a clear image of a leaf for analysis.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">{result.diseaseName}</h2>
          {result.confidence !== 'N/A' && <ConfidenceBadge confidence={result.confidence} />}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-md sm:text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Description</h3>
            <p className="text-sm sm:text-base text-gray-600">{result.description}</p>
          </div>

          {result.possibleCauses && result.possibleCauses.length > 0 && (
            <div>
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Possible Causes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-600">
                {result.possibleCauses.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendedTreatments && result.recommendedTreatments.length > 0 && (
            <div>
              <h3 className="text-md sm:text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Recommended Treatments</h3>
              <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-600">
                {result.recommendedTreatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;