import React from 'react';

interface AboutFeatureProps {
  icon: React.ReactNode;
  text: string;
}

const AboutFeature = React.memo(({ icon, text }: AboutFeatureProps) => (
  <div className="flex items-center gap-3">
    <span className="text-orange-500">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
    </span>
    <span className="text-gray-700">{text}</span>
  </div>
));

export default AboutFeature;