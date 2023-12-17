import React from "react";
import Slider from "./Slider";
import CarouselSlider from "./CarouselSlider";
import Product from "../shopping-cart/Product";
import CssSlider from "./CssSlider";

const AppSlider = () => {
  const images = [
    "https://images.pexels.com/photos/2770371/pexels-photo-2770371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?cs=srgb&dl=pexels-lukas-hartmann-1557652.jpg&fm=jpg",
    "https://thumbs.dreamstime.com/b/lone-tree-llanberis-north-wales-uk-llyn-padarn-llyn-padarn-site-special-scientific-interest-situated-llanberis-219721236.jpg",
  ];

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <h1>Slider Örneği</h1>
      <Slider images={images} />
      <CarouselSlider images={images} />
      <CssSlider images={images} />
    </div>
  );
};

export default AppSlider;
