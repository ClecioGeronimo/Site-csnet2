import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Plans from '../components/Plans';
import Coverage from '../components/home/Coverage';
import SpeedTest from '../components/home/SpeedTest';

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Plans />
      <Coverage />
      <SpeedTest />
    </>
  );
}

export default Home;