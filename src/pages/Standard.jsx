import React from 'react';
import CTASection from '../components/CTASection';
import {
  StandardEthosSection,
  StandardTenetsSection,
  StandardAuditMatrixSection
} from '../components/standard';

const Standard = () => {
  return (
    <div className="standard-page bg-[#FEFFFF] pt-20 sm:pt-24 lg:pt-28">
      {/* 1. Executive Philosophy & Ethos */}
      <StandardEthosSection />

      {/* 2. The Five Core Tenets & Governance */}
      <StandardTenetsSection />

      {/* 3. The 48-Point Quality Audit Matrix */}
      <StandardAuditMatrixSection />

      {/* 4. Client Assurance & Consultation Banner */}
      <div className="py-12 px-4 sm:px-6 lg:px-12 max-w-[1360px] mx-auto">
        <CTASection
          badge="Partner With Confidence"
          title="Experience The S4Consultancy Standard in Your Next Project"
          description="Whether curating a bespoke wedding, booking hotel ballrooms, scheduling VIP group stays, or seeking operational advisory, our senior directors ensure flawless execution."
          primaryBtnText="Schedule an Executive Consultation"
          primaryBtnLink="/contact"
          secondaryBtnText="Explore All 8 Core Services"
          secondaryBtnLink="/services"
        />
      </div>
    </div>
  );
};

export default Standard;
