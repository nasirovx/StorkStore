import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TelegramForm from "../Order/Order";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../Redux/Slices/cartSlice";

const CartPage = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  const incremetClick = (id) =>{
    dispatch(increaseItemQuantity(id))
  }

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {totalQuantity} items</h5>
                </div>
                <div className="card-body">
                  {cart.map((data, index) => (
                    <div className="row" key={index}>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div
                      className="bg-image hover-overlay hover-zoom ripple rounded"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={data.image ? data.image : data.images[0]}
                        className="w-100"
                        alt="Product"
                      />
                    </div>
                    </div>
                    
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                      <strong>{data.title}</strong>
                    </p>
                    
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-1 mb-2"
                      data-mdb-toggle="tooltip"
                      title="Remove item"
                      onClick={() => dispatch(removeItem(data.id))}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                          <button className="btn btn-primary px-3 me-2" onClick={() => dispatch(decreaseItemQuantity(data.id))}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <div className="form-outline">
                            <input
                              id={`quantity-${index}`}
                              min="0"
                              name={`quantity-${index}`}
                              value={data.quantity}
                              type="number"
                              className="form-control"
                              onChange={() => null}
                            />
                            <label className="form-label" htmlFor={`quantity-${index}`}>
                            </label>
                          </div>
                          <button className="btn btn-primary px-3 ms-2" onClick={() => incremetClick(data.id)}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>{data.price * data.quantity}</strong>
                        </p>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{totalQuantity}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>{totalPrice}</strong>
                      </span>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleCheckout}>
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showCheckout && <TelegramForm cart={cart} onClose={handleCloseCheckout} />}
    </div>
  );
};
export default CartPage;