import { useState } from 'react';
import NavigationBar from "./components/NavigationBar.tsx";
import AboutPage from "./components/AboutPage.tsx";
import TrialPage from "./components/TrialPage.tsx";
import {Activity, ArrowRight, Award, Brain, TrendingUp} from "lucide-react";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const HomeComponent = () => (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cancerna Lab
              </span>
                <br />
                Ecosystem
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Revolutionary 3D U-Net powered lung cancer detection with fuzzy logic uncertainty handling.
                Transforming early diagnosis through advanced AI and clinical workflow integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => setCurrentPage('trial')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
                >
                  <Brain className="w-6 h-6" />
                  <span>Try Live Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setCurrentPage('about')}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">3D U-Net Architecture</h3>
                <p className="text-gray-300">Advanced volumetric segmentation with skip connections for precise nodule boundary detection and characterization.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Fuzzy Logic Engine</h3>
                <p className="text-gray-300">Uncertainty quantification and membership functions for confident clinical decision-making in ambiguous cases.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Metastasis Prediction</h3>
                <p className="text-gray-300">Prognostic analysis with temporal progression modeling for treatment planning and risk stratification.</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-8">Clinical Impact</h2>
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyan-400 mb-2">95%+</div>
                  <div className="text-gray-300">Detection Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">50%</div>
                  <div className="text-gray-300">Time Reduction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">85%+</div>
                  <div className="text-gray-300">Segmentation Precision</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">30%</div>
                  <div className="text-gray-300">False Positive Reduction</div>
                </div>
              </div>
            </div>

            {/* iGEM Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8">
                <Award className="w-12 h-12 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">iGEM NU KAZAKHSTAN 2025</h2>
                <p className="text-xl text-white/90 mb-4">
                  Competing in the International Genetically Engineered Machine Competition
                </p>
                <p className="text-white/80">
                  Developing innovative AI solutions for global health challenges through synthetic biology and advanced computing
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );

  // Main Render Logic
  if (currentPage === 'home') return (
      <>
        <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <HomeComponent />
      </>
  );
  if (currentPage === 'about') return (
      <>
        <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <AboutPage />
      </>
  );
  if (currentPage === 'trial') return (
    <>
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <TrialPage />
    </>
  )

  return HomeComponent;
};

export default App;