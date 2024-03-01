import React, { useEffect, useState } from "react";
import "./cart.css";
import { Col, Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../../api/user.service";
import { toast } from "react-toastify";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
   const [searchQuery, setSearchQuery] = useState("");
  const [listCart, setListCart] = useState([]);
  const [cartTotal, setCartTotal] = useState("");
  const [load, setLoad] = useState(null);
  useEffect(() => {
    authService.getCart().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setListCart(data.data);
        setCartTotal(data.data?.cartTotal);
      }
    });
  }, [load]);
  const Tr = ({ item }) => {
    // const dispatch = useDispatch();
    const deleteProduct = () => {
      // dispatch(cartActions.deleteItem(item.id));
      authService.deleteCart(item.product._id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setLoad(data.data);
        }
      });
    };
    return (
      <tr>
        <td>
          <img src={item.product.images} alt="" />
        </td>
        <td>{item.product.title}</td>
        <td>${item.price}</td>
        <td>{item.count}</td>
        <td>
          <button onClick={deleteProduct}>Delete</button>
        </td>
      </tr>
    );
  };
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
        const addVoucher = () => {
          authService
            .applyCoupon({
              coupon: searchQuery,
            })
            .then((data) => {
              if (data.error) {
                console.log(data.error);
              } else {
                setCartTotal(data.data);
                    toast.success("Product added successfully", {
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                    });
              }
            });
        };
  return (
    <div>
      <section className="pt-9 pb-9">
        <Container className="pl-8 pr-8">
          <Row className="d-flex ">
            <Col lg="9">
              {listCart?.products && listCart?.products?.length > 0 ? (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listCart?.products.map((item, index) => (
                      <Tr item={item} key={index}></Tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              )}
            </Col>

            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal: <span className="fs-4 fw-bold">${cartTotal}</span>
                </h6>
              </div>
              <p className="fs-5 mt-2">
                Taxes and shipping will calculate in checkout
              </p>
              <div>
                {/* <div style={{ display: "flex", alignItems: "center" }}>


                  <button className="buy_btn w-100">
                    <Link to="/shop">add coupon</Link>
                  </button>
                </div> */}
                <div className="relative mt-6">
                  <input
                    type="text"
                    placeholder="add coupon"
                    className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-2 pl-4 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                    onChange={handleSearch}
                    value={searchQuery}
                  />
                  <div className="absolute inset-y-1 right-1 flex justify-end">
                    <button
                      onClick={() => addVoucher()}
                      type="submit"
                      aria-label="Submit"
                      style={{ marginTop: "0px" }}
                      className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                    >
                      <svg
                        viewBox="0 0 16 6"
                        aria-hidden="true"
                        className="w-4"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <button className="buy_btn mt-3 w-100">
                  <Link to="/checkout">Check out</Link>
                </button>
                <button className="buy_btn mt-3 w-100">
                  <Link to="/home">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Cart;
