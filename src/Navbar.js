import React from "react";
import Cart from "./shopping-cart/Cart";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <Cart />
        <li>
          <Link to="/slider1">Slider 1</Link>
        </li>

        <li>
          <Link to="/comment">Comment</Link>
        </li>
        <li>
          <Link to="/sepet">Sepet</Link>
        </li>
        <li>
          <Link to="/note">Note</Link>
        </li>
        <li>
          <Link to="/juxtapose">Juxtapose</Link>
        </li>
        <li>
          <Link to="/section">Section(tıkladıkdan sonra aşağı kaydır)</Link>
        </li>
        <li>
          <Link to="/dashboard">Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
