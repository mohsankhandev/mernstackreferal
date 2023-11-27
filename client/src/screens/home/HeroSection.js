// HeroSection.js
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-blue-500 text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to our MLM Platform</h2>
        <p className="text-lg">Grow your network and earn rewards!</p>
        <button className="bg-white text-blue-500 hover:bg-blue-700 font-bold py-2 px-6 mt-8 rounded-full">
          Join Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
