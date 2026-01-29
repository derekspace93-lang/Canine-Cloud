import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Breeds from "./sections/Breeds";
import Images from "./sections/Images";
import Footer from './sections/Footer';

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Hero />
      <Breeds />
      <Images />
      <Footer />
    </div>
  );
};

export default App;
