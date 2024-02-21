import React from "react";
import './cart.css'
import { Col, Container, Row } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../../redux/slice/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {

  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <div>
      
      <section className="pt-9 pb-9">
          <Container className="pl-8 pr-8">
            <Row className="d-flex ">
              <Col lg='9'>
                {
                  cartItems.length ===0 ? (<h2 className="fs-4 text-center">No item added to the cart</h2>):(
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
                      {
                        cartItems.map((item, index)=>(
                          <Tr item ={item} key={index}></Tr>
                        ))
                      }
                    </tbody>
                </table>
                  )
                }
              </Col>

              <Col lg='3'>
                <div>
                  <h6 className='d-flex align-items-center justify-content-between'>Subtotal: <span className='fs-4 fw-bold'>${totalAmount}</span></h6>
                  
                </div>
                <p className='fs-5 mt-2'>Taxes and shipping will calculate in checkout</p>
                <div>
                  <button className='buy_btn mt-3 w-100'><Link to='/shop'>Continue Shopping</Link></button>
                  <button className='buy_btn mt-3 w-100'><Link to='/checkout'>Check out</Link></button>

                </div>
              </Col>

            </Row>
          </Container>
      </section>
    </div>
  );  
};


const Tr = ({item}) =>{

  const dispatch = useDispatch()
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }



  return <tr>
  <td><img src={item.img} alt=""/></td>
  <td>{item.productName}</td>
  <td>${item.price}</td>
  <td>{item.quantity}</td>
  <td><button onClick={deleteProduct}>Delete</button></td>
</tr>
}

export default Cart;
