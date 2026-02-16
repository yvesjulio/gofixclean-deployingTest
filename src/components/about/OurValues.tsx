import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { TfiWorld } from "react-icons/tfi";
import { GiBowTieRibbon } from "react-icons/gi";

const OurValues: React.FC = () => {
  return (
    <section className="px-6 md:px-12  bg-[#e4ebe9]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-block bg-[#B1CDC8] text-brandText px-8 py-2 rounded-xl font-semibold tracking-widest text-sm">
            Our Values
          </p>
          <h3 className="text-3xl font-bold mt-4">What We Stand For</h3>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="w-20 h-16 flex items-center justify-center bg-[#B1CDC8] text-brandText rounded-xl mb-4 text-3xl mx-auto transition-transform duration-300 hover:scale-110">
              <FaRegHeart />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">
              Every decision we make starts with our customers' needs. Your satisfaction is our success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="w-20 h-16 flex items-center justify-center bg-[#B1CDC8] text-brandText rounded-xl mb-4 text-3xl mx-auto transition-transform duration-300 hover:scale-110">
              <GiBowTieRibbon />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600 text-sm">
              We maintain the highest standards by rigorously vetting all service providers on our platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="w-20 h-16 flex items-center justify-center bg-[#B1CDC8] text-brandText rounded-xl mb-4 text-3xl mx-auto transition-transform duration-300 hover:scale-110">
              <HiUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Building</h3>
            <p className="text-gray-600 text-sm">
              We're creating opportunities for skilled professionals while serving households and businesses.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <div className="w-20 h-16 flex items-center justify-center bg-[#B1CDC8] text-brandText rounded-xl mb-4 text-3xl mx-auto transition-transform duration-300 hover:scale-110">
              <TfiWorld />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Impact</h3>
            <p className="text-gray-600 text-sm">
              We're proud to support local economies by connecting communities with trusted service providers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
