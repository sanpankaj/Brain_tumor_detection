import React, { useState } from 'react';
import Upload from '../components/Upload';
import Results from '../components/Results';
import { predictImage } from '../api';

const Home = () => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Brain Tumor Detection
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Upload an MRI scan to detect and classify brain tumors using advanced Deep Learning.
          Our model identifies Glioma, Meningioma, and Pituitary tumors with high accuracy.
        </p>
      </div>

      <Upload onUpload={handleUpload} isLoading={isLoading} />

      {error && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
          {error}
        </div>
      )}

      <Results result={result} />
    </div>
  );
};

export default Home;
