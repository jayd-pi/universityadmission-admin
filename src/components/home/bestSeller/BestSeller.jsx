// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Heading from "../products/Heading";
import Product from "../products/Product";
// import {
//   table,
//   doublesofa01,
//   armchair01,
//   armchair02
// } from "../../../assets/images/index";
import authService from "../../../api/product.service";

const BestSellers = () => {
    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
      authService.getProduct().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setListProducts(data.data);
        }
      });
    }, []);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {listProducts.map((product, index) => (
          <Product
            _id={product._id}
            img={product.images}
            productName={product.title}
            price={product.price}
            color={product.color}
            badge={true}
            des={product.description}
            key={index}
          />
        ))}
        {/* <Product
          _id="1011"
          img={armchair01}
          productName="Flower Base"
          price="35.00"
          color="Blank and White"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1012"
          img={armchair02}
          productName="New Backpack"
          price="180.00"
          color="Gray"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1013"
          img={table}
          productName="Household materials"
          price="25.00"
          color="Mixed"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1014"
          img={doublesofa01}
          productName="Table"
          price="220.00"
          color="Black"
          badge={false}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        /> */}
      </div>
    </div>
  );
};

export default BestSellers;
