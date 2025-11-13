import React from 'react';
import { TargetIcon, CpuIcon, ShieldCheckIcon } from '../components/Icons';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="text-center animate-swoop-in-down">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900">About Plant Disease Detector</h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">Harnessing AI to keep your plants healthy.</p>
      </header>
      
      <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-green-100 p-3 rounded-full">
             <TargetIcon className="h-8 w-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-green-800">Our Mission</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to empower gardeners, farmers, and plant enthusiasts of all levels with an accessible and accurate tool for identifying plant diseases. We believe that early detection is key to preventing widespread damage and ensuring a bountiful harvest. By simply uploading a photo of a plant leaf, users can get instant insights and actionable advice.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
         <div className="flex items-center gap-4 mb-4">
           <div className="bg-blue-100 p-3 rounded-full">
            <CpuIcon className="h-8 w-8 text-blue-700" />
           </div>
           <h2 className="text-2xl font-bold text-blue-800">How It Works: Python and Machine Learning</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          This application leverages the power of Google's Gemini, a state-of-the-art multimodal AI model. These large-scale models are built using advanced machine learning techniques and are often developed with frameworks like TensorFlow and PyTorch in Python, allowing them to understand and process complex information from images and text. Here’s the simple process:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Upload an Image:</strong> You provide a clear picture of a plant leaf you're concerned about.</li>
          <li><strong>AI Analysis:</strong> The Gemini model analyzes the visual patterns, colors, and textures in your image using its sophisticated machine learning capabilities.</li>
          <li><strong>Receive Diagnosis:</strong> Within seconds, you receive a detailed report including the potential disease, confidence level, possible causes, and recommended treatments.</li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
         <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
             <ShieldCheckIcon className="h-8 w-8 text-yellow-700" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-800">Our Commitment</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          We are committed to providing a reliable and easy-to-use tool. While our AI is highly accurate, it should be used as a supplementary guide. For severe infestations or if you are unsure, always consider consulting with a local agricultural extension office or a certified arborist.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;