import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Nabvar() {
  const cartstate = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded color">
      <a className="btn-grad1" href="/">
        Rishit's Own Pizza
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <div class="dropdown mt-4">
            <a class="dropbtn">Rishit</a>
            <div class="dropdown-content"></div>
          </div>

          <li className="nav-item">
            <a className="btn-grad" href="/login">
              Login
            </a>
          </li>

          <li className="nav-item">
            <a className="btn-grad" href="/cart">
              Cart {cartstate.cartItems.length}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nabvar;
