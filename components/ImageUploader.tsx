
import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl, isLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageSelect(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageSelect(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className={`relative flex justify-center items-center w-full h-64 md:h-80 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
          ${isLoading ? 'border-gray-300 bg-gray-100 cursor-not-allowed' : 'border-green-300 bg-green-100 hover:bg-green-200 hover:border-green-400'}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Plant leaf preview"
            className="object-contain w-full h-full rounded-lg p-2"
          />
        ) : (
          <div className="text-center text-green-700">
            <UploadIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm text-green-600">PNG, JPG, or WEBP</p>
          </div>
        )}
        <input
          id="image-upload"
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="sr-only"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
