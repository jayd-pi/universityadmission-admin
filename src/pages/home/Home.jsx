import React from "react";
import Banner from "../../components/banner/Banner";

const Home = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full mx-auto">
      {/* <Banner/> */}
      <div className="max-w-container mx-auto px-4">
        <Sale />
        {/* <NewArrivals /> */}
        <BestSellers />
        <YearProduct />
        <SpecialOffers />
        <Clock />
      </div>
    </div>
  );
};

export default Home;
