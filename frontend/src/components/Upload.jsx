import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileImage, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Upload = ({ onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700"
      >
        {!selectedFile ? (
          <div
            className={`relative h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-colors ${
              dragActive ? "border-blue-500 bg-slate-700/50" : "border-slate-600 hover:border-slate-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*"
            />
            <UploadIcon className="w-16 h-16 text-slate-400 mb-4" />
            <p className="text-slate-300 text-lg mb-2">Drag & Drop your MRI Scan here</p>
            <p className="text-slate-500 text-sm mb-6">or</p>
            <button
              onClick={() => inputRef.current.click()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
            >
              Browse Files
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
              <button
                onClick={clearFile}
                className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4 w-full">
              <div className="flex-1 flex items-center space-x-3 bg-slate-700/50 p-3 rounded-lg">
                <FileImage className="w-6 h-6 text-blue-400" />
                <span className="text-slate-200 truncate">{selectedFile.name}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                  isLoading
                    ? "bg-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25"
                }`}
              >
                {isLoading ? "Analyzing..." : "Analyze Scan"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Upload;
