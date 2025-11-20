import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">About This Project</h1>
      
      <div className="space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-3">Overview</h2>
          <p className="leading-relaxed">
            This application utilizes a Convolutional Neural Network (CNN) based on the VGG16 architecture to classify brain MRI images. 
            It is designed to assist in the early detection of brain tumors by categorizing scans into four classes:
          </p>
          <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-slate-400">
            <li>Glioma</li>
            <li>Meningioma</li>
            <li>Pituitary Tumor</li>
            <li>No Tumor</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-3">How It Works</h2>
          <p className="leading-relaxed">
            When you upload an MRI image, it is preprocessed and passed through our deep learning model. 
            The model extracts features from the image and predicts the likelihood of each tumor type. 
            We also use <strong>Grad-CAM (Gradient-weighted Class Activation Mapping)</strong> to visualize which parts of the image the model focused on to make its decision, providing explainability for the results.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-3">Dataset & Accuracy</h2>
          <p className="leading-relaxed">
            The model is trained on a publicly available dataset of brain MRI scans. 
            While it achieves high accuracy in testing, it is important to note that this is a demonstration tool and should <strong>not</strong> be used for medical diagnosis. 
            Always consult a qualified medical professional for health concerns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-400 mb-3">Technology Stack</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="font-medium text-white mb-2">Frontend</h3>
              <p className="text-sm">React, Vite, Tailwind CSS, Framer Motion</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="font-medium text-white mb-2">Backend</h3>
              <p className="text-sm">Python, FastAPI, TensorFlow/Keras, OpenCV</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
