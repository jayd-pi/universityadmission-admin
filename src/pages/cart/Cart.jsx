import React, { useEffect, useState } from "react";
import "./cart.css";
import { Col, Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../../api/user.service";
import authServices from "../../api/voucher.service";
import { toast } from "react-toastify";
const Cart = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [listCart, setListCart] = useState([]);
  const [cartTotal, setCartTotal] = useState("");
  const [load, setLoad] = useState(null);
  const [usedVouchers, setUsedVouchers] = useState([]);
  useEffect(() => {
    listVouchers();
    authService.getCart().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setListCart(data.data);
        setCartTotal(data.data?.cartTotal);
      }
    });
  }, [load]);

  const listVouchers = () => {
    authServices.getVoucher()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setVouchers(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching vouchers:', error);
      });
  };
  const updateCart = (updatedCart) => {
    authService.updateCart(updatedCart).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setListCart(data.data);
        setCartTotal(data.data?.cartTotal);
      }
    });
  };
  const Tr = ({ item }) => {

    const deleteProduct = () => {
      authService.deleteCart(item.product._id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setLoad(data.data);
        }
      });
    };

    const increaseQuantity = (productId) => {
      const updatedCart = listCart.products.map((item) => {
        if (item.product._id === productId) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      updateCart(updatedCart);
    };

    const decreaseQuantity = (productId) => {
      const updatedCart = listCart.products.map((item) => {
        if (item.product._id === productId && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
      updateCart(updatedCart);
    };

    return (
      <tr>
        <td>
          <img src={item.product.images} alt="" />
        </td>
        <td>{item.product.title}</td>
        <td>${item.price}</td>
        <td>
          <button onClick={() => decreaseQuantity(item.product._id)} className=" small-btn text-white font-bold py-1 px-2 rounded-md text-sm">-</button>
          {item.count}
          <button onClick={() => increaseQuantity(item.product._id)} className=" small-btn text-white font-bold py-1 px-2 rounded-md text-sm">+</button>
        </td>
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
    if (!searchQuery) {
      toast.error("Please enter a voucher code", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (usedVouchers.includes(searchQuery)) {
      toast.error("Voucher has already been used", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (usedVouchers.length > 0) {
      toast.error("Only one voucher can be applied at a time", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      authService
        .applyCoupon({
          coupon: searchQuery,
        })
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            toast.error("Error applying voucher", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else if (!data.data) {
            toast.error("Invalid voucher code", {
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          } else {
            setCartTotal(data.data);
            setUsedVouchers([...usedVouchers, searchQuery]);
            toast.success("Voucher applied successfully", {
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
    }
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
                      <th>Quantity</th>
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
                {vouchers && vouchers.length > 0 && (
                  <div className="mt-6">
                    <h6 className="d-flex align-items-center justify-content-between">
                      Available Vouchers:
                    </h6>
                    {vouchers.map((voucher, index) => (
                      <div key={index} className="mb-2">
                        <li
                          key={index}>{voucher.name} - {voucher.discount}% off</li>
                      </div>
                    ))}
                  </div>
                )}
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
