import { useEffect, useState } from "react";
import Heading from "../products/Heading";
import Product from "../products/Product";
// import {
//   spf01,
//   spf02,
//   spf03,
//   spf04
// } from "../../../assets/images/index";
import authService from "../../../api/product.service";
const SpecialOffers = () => {
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
      <Heading heading="Special Offers" />
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
          _id="1101"
          img={spf01}
          productName="Cap for Boys"
          price="35.00"
          color="Blank and White"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1102"
          img={spf02}
          productName="Tea Table"
          price="180.00"
          color="Gray"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1103"
          img={spf03}
          productName="Headphones"
          price="25.00"
          color="Mixed"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        />
        <Product
          _id="1104"
          img={spf04}
          productName="Sun glasses"
          price="220.00"
          color="Black"
          badge={true}
          des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."
        /> */}
      </div>
    </div>
  );
};

export default SpecialOffers;
