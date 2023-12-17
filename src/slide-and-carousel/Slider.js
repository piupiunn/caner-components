import React, { useState } from "react";

const Slider = ({ images }) => {
  // currentIndex durumunu tanımlayın ve varsayılan değeri 0 olarak ayarlar.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sonraki resme geçmek için kullanılan işlev.
  const handleNext = () => {
    // currentIndex'i artırarak bir sonraki resmi gösterir.
    //Formülde % (modulo) operatörü kullanılarak, currentIndex değeri bir sonraki resme geçtiğinde dizinin sonuna ulaşıldığında 0'a döner.
    /*nextIndex = (currentIndex + 1) % images.length
          = (2 + 1) % 3
          = 3 % 3
          = 0 */
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  // Önceki resme geçmek için kullanılan işlev.
  const handlePrevious = () => {
    // currentIndex'i azaltarak bir önceki resmi gösterir.
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(previousIndex);
  };

  // Slider bileşenini oluşturan JSX'i döndürür.
  return (
    <div className="slider-container">
      <button onClick={handlePrevious}>Önceki</button>
      <button onClick={handleNext}>Sonraki</button>
      {images.map((image, index) => (
        <img
          key={index}
          className={`slider-img ${index === currentIndex ? "active" : ""}`}
          src={image}
          alt=""
        />
      ))}
    </div>
  );
};

export default Slider;
