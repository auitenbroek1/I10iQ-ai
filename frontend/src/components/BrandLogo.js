import React from 'react';

const BrandLogo = ({ className = "" }) => {
  return (
    <div className={`text-2xl font-bold text-blurple ${className}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      i10iQ.AI
    </div>
  );
};

export default BrandLogo;