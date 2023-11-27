import React from 'react';
// import bgImage from '../../public/images/bg3.png';
import bggg from "../../../src/assets/images/bg3.png"
const ResponsiveSplitComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-[#38b6ff] p-8 lg:p-16 mt-[70px]">
      {/* Left Section: Text Content */}
      <div className="flex-1 lg:mr-8">
        <h1 className="text-3xl lg:text-5xl text-white font-bold mb-4">Welcome to our MLM Platform</h1>
        <h3 className="text-lg lg:text-2xl text-black  mb-6">Investing with DAGABR LTD can provide a massive return in minimum risk. We understand how the market works, and keep up with economic and geopolitical news that can impact currency movements.

 
</h3>
        <button className="bg-white rounded-lg text-[#38b6ff]  hover:bg-red-700 font-bold py-2 px-4 ">Button</button>
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 mt-8 lg:mt-0">
        <img
          className="mx-auto w-full lg:max-w-lg rounded-lg shadow-md"
          src={bggg} // Replace with your image URL
          // E:\chawkbazar-eCommerce-main\client\src\assets\images\bg3.png          alt="Sample"
        />
      </div>
    </div>
  );
};

export default ResponsiveSplitComponent;
