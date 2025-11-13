import React, { useState, useCallback } from 'react';
import ImageUploader from '../components/ImageUploader';
import ResultCard from '../components/ResultCard';
import Spinner from '../components/Spinner';
import { LeafIcon, AlertTriangleIcon } from '../components/Icons';
import { analyzePlantLeaf } from '../services/geminiService';
import { addToHistory } from '../services/historyService';
import { AnalysisResult } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const HomePage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
    setError(null);
  }, [previewUrl]);

  const handleDiagnoseClick = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const [base64Image, dataUrl] = await Promise.all([
        fileToBase64(imageFile),
        fileToDataUrl(imageFile)
      ]);
      
      const result = await analyzePlantLeaf(base64Image, imageFile.type);
      setAnalysisResult(result);
      addToHistory({ imageUrl: dataUrl, result });
    // Fix: Use a safer catch block to handle errors. This resolves multiple "Cannot find name" errors that were likely due to a misbehaving lint rule or type inference issue with `catch (err: any)`.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <header className="text-center mb-6 md:mb-10 animate-swoop-in-down">
        <div className="flex justify-center items-center gap-3">
          <LeafIcon className="h-10 w-10 text-green-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-900">
            Plant Disease Detector
          </h1>
        </div>
        <p className="mt-3 text-base md:text-lg text-gray-600">
          Upload a leaf image to instantly diagnose plant diseases with AI.
        </p>
      </header>

      <div className="space-y-6">
        <ImageUploader 
          onImageSelect={handleImageSelect} 
          previewUrl={previewUrl}
          isLoading={isLoading}
        />

        <button
          onClick={handleDiagnoseClick}
          disabled={!imageFile || isLoading}
          className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
        >
          {isLoading ? 'Analyzing...' : 'Diagnose Plant'}
        </button>
        
        {isLoading && <Spinner />}
        
        {error && (
          <div className="flex items-center gap-3 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg animate-fade-in" role="alert">
            <AlertTriangleIcon className="h-6 w-6" />
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {analysisResult && <ResultCard result={analysisResult} />}
      </div>
    </div>
  );
};

export default HomePage;