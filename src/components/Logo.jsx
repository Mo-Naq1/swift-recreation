import React from 'react';

export default function Logo({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="-5 -5 105 110" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M 42 0
           L 90 0
           L 65 50
           L 90 50
           L 70.36 89.27
           Q 65 100 53 100
           L 5 100
           L 30 50
           L 5 50
           L 24.64 10.73
           Q 30 0 42 0
           Z" 
        fill="#0F1115"
        stroke="#0F1115"
        strokeWidth="6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
