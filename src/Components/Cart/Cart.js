import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useState } from "react";
import axios from "axios";

const API_URL = "https://api.shilpimultiplex.com/api/Order/PlaceOrders/";

const Cart = (props) => {
  const [customerName, setCustomerName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [seatNumber, setSeatNumber] = useState();
  const [screenNumber, setScreenNumber] = useState();
  const [deliveryTime, SetDeliveryTime] = useState();

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const placeOrder = (props) => {
    let OrderDetail = {
      customerName,
      phoneNumber,
      seatNumber,
      screenNumber,
      deliveryTime,
    };
    axios.post(API_URL + props.Uid, OrderDetail).then((result) => {
      console.log(result);
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
      <>
              <div>
                <label>Enter Your Name</label>
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label>Phone Number</label>
                <div>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label>Enter Seat Number</label>
                <div>
                  <input
                    type="number"
                    value={seatNumber}
                    onChange={(e) => {
                      setSeatNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label>Enter Screen Number</label>
                <div>
                  <input
                    type="number"
                    value={screenNumber}
                    onChange={(e) => {
                      setScreenNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <label>DeliveryTime</label>
                <div>
                  <input
                    type="number"
                    value={deliveryTime}
                    onChange={(e) => {
                      SetDeliveryTime(e.target.value);
                    }}
                  />
                </div>
              </div>
      </>
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={placeOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
