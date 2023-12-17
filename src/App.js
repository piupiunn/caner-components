import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import AppSlider from "./slide-and-carousel/AppSlider";

import CommentApp from "./nested-comment/CommentApp";
import ShoppingApp from "./shopping-cart/ShoppingApp";
import NoteFormApp from "./complete-box/NoteFormApp";
import JustaposeSecond from "./complete-box/NoteFormApp";
import DashboardPage from "./DashboardPage";

import { ShoppingCartProvider } from "./shopping-cart/ShoppingCartContext";
import JuxtaposeComponent from "./juxtapose/JuxtaposeComponent";
import Section from "./scroll-component-anime/Section";
const App = () => {
  const customColors = {
    errors: "#000", // Red
    correct: "#2ecc71", // Green
    empty: "#f1c40f", // Yellow
  };

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/slider1" element={<AppSlider />} />
            <Route path="/comment" element={<CommentApp />} />
            <Route path="/sepet" element={<ShoppingApp />} />
            <Route path="/note" element={<NoteFormApp />} />
            <Route path="/juxtapose" element={<JuxtaposeComponent />} />
            <Route path="/juxtapose-second" element={<JustaposeSecond />} />
            <Route path="/section" element={<Section />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
