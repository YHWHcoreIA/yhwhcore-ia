
import React from 'react';

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.036-7.026A7.5 7.5 0 004.5 12H3m18 0h-1.5m-1.379-2.974A7.5 7.5 0 0019.5 12h1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25l-3.735 3.735m0 0L8.25 15.75m3.765-3.765L15.75 15.75m-3.765-3.765L8.25 8.25" /> {/* Simplified inner part of cog */}
  </svg>
);
    