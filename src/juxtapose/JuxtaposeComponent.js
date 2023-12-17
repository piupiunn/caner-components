import React, { useState } from "react";

import JustaposeSecond from "./JustaposeSecond";

const JuxtaposeComponent = () => {
  const [position, setPosition] = useState(50);

  const handleSliderChange = (e) => {
    // Slider değeri değiştiğinde pozisyonu güncelle
    setPosition(e.target.value);
  };

  const calculateClipPath = () => {
    // Resimlerin kesme yolu için gerekli stil hesaplamasını yapın.
    // Kesme yolu stilini oluştururken inset() fonksiyonunu kullanıyoruz.
    // Bu fonksiyon, dört kenara sırayla sol, üst, sağ ve alt kenarlar için değerler alır.
    // İlk değer olarak 0% veriyoruz, çünkü resmi kesme yoluyla sola kaydırmak istiyoruz.
    // İkinci değer olarak ${100 - percentage * 100}% veriyoruz. Burada percentage değeri, çubuğun konumunu yüzde cinsinden temsil eder.
    // Bu değeri 100'den çıkardığımızda, çubuğun sağ kenara oranını elde ederiz.
    // Bu sayede, resmin sağ tarafı çubuğa orantılı olarak görünür ve sola doğru kayar.
    // Üçüncü ve dördüncü değerler olarak 0% veriyoruz, çünkü resmi yukarı veya aşağı kaydırmak istemiyoruz.
    const percentage = position / 100;
    return `inset(0% ${100 - percentage * 100}% 0% 0%)`;
  };

  return (
    <>
      {/* Juxtapose Container */}
      <div className="juxtapose-container">
        {/* Slider */}
        <input
          className="juxtapose-bar"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={handleSliderChange}
        />

        {/* İlk resim */}
        <div className="juxtapose-image">
          <img
            src="https://images.pexels.com/photos/2770371/pexels-photo-2770371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
        </div>

        {/* İkinci resim */}
        <div
          className="juxtapose-image"
          style={{
            clipPath: calculateClipPath(),
          }}
        >
          <img
            src="https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?cs=srgb&dl=pexels-lukas-hartmann-1557652.jpg&fm=jpg"
            alt=""
          />
        </div>
      </div>

      <br />

      {/* JustaposeSecond */}
      <JustaposeSecond />
    </>
  );
};

export default JuxtaposeComponent;
