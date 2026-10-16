import React from 'react';
import {
  StandardEthosSection,
  StandardRangeSection
} from '../components/standard';

const Standard = () => {
  return (
    <div className="standard-page bg-[#FEFFFF] pt-20 sm:pt-24 lg:pt-28">
      {/* 1. Executive Philosophy & Ethos */}
      <StandardEthosSection />

      {/* 2. Our Full Range of Scale, Venues & Advisory Tiers */}
      <StandardRangeSection />
    </div>
  );
};

export default Standard;
