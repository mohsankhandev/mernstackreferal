// FeaturesSection.js
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto text-center ">
        <h2 className="text-3xl font-bold mb-8 text-red-500"><span className='text-white'>Our </span>Investment <span className='text-[#38b6ff]'>Packages </span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature cards */}
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p>Details about the feature.</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p>Details about the feature.</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p>Details about the feature.</p>
          </div>
          <div className="bg-gray-200 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
            <p>Details about the feature.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
