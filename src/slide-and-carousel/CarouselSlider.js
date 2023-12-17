import React, { useState } from "react";

const CarouselSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  // İleri butonuna tıklandığında çalışacak fonksiyon
  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      // Eğer mevcut resim son resim ise
      setCurrentIndex(0); // İlk resme dön
      setTranslateValue(0); // Transform değerini sıfırla
    } else {
      setCurrentIndex(currentIndex + 1); // Bir sonraki resme geç
      setTranslateValue(translateValue - slideWidth()); // Transform değerini bir slayt genişliği kadar kaydır
    }
  };

  // Geri butonuna tıklandığında çalışacak fonksiyon
  const handlePrev = () => {
    if (currentIndex === 0) {
      // Eğer mevcut resim ilk resim ise
      setCurrentIndex(images.length - 1); // Son resme git
      setTranslateValue(-(images.length - 1) * slideWidth()); // Transform değerini son slaytın genişliği kadar kaydır
    } else {
      setCurrentIndex(currentIndex - 1); // Bir önceki resme geç
      setTranslateValue(translateValue + slideWidth()); // Transform değerini bir slayt genişliği kadar kaydır
    }
  };

  // Belirli bir slayta gitmek için tıklanan resmin indeksini alacak fonksiyon
  const handleSlideClick = (index) => {
    setCurrentIndex(index); // İlgili resmin indeksini ayarla
    setTranslateValue(-index * slideWidth()); // Transform değerini ilgili slaytın genişliği kadar kaydır
  };

  // Bir slaytın genişliğini hesaplayacak fonksiyon
  const slideWidth = () => {
    return document.querySelector(".carousel-slide").clientWidth;
  };

  return (
    <>
      {/* Carousel Slider */}
      <div className="carousel-slider">
        <div
          className="carousel-wrapper"
          style={{
            transform: `translateX(${translateValue}px)` /* Slaytların yatay kaydırılmasını sağlar. Bu kısım, Carousel Slider'ın kaydırılmasını sağlayan translateX değerini belirler.
            translateX CSS işlevi, bir öğenin yatay olarak kaymasını sağlar.
            Bu durumda translateValue değişkeni, slaytların ne kadar kaydırılacağını belirler.
            translateX(${translateValue}px) ifadesi, translateX işlevini translateValue değişkenin değeriyle birleştirir. translateValue değeri, piksel cinsinden belirtilir ve pozitif veya negatif olabilir.
            Pozitif değerler sağa doğru kaydırmayı, negatif değerler ise sola doğru kaydırmayı temsil eder.
            Örneğin, translateX(100px) ifadesi, öğenin 100 piksel sağa kaymasını sağlarken, translateX(-100px) ifadesi öğenin 100 piksel sola kaymasını sağlar.            
            Bu durumda, translateX(${translateValue}px) ifadesi, öğenin -translateValue kadar sola veya sağa kaymasını sağlar.
            Burada translateValue değişkeni Carousel Slider'ın şu anki durumuna bağlı olarak güncellenir ve slaytların hareket etmesini sağlar. */,
            transition: "transform ease-out 0.45s", // Kaydırma hareketinin geçiş efektini belirler
          }}
        >
          {/* Slaytlar */}
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        {/* Önceki Slayta Geçmek İçin Buton */}
        <button className="prev-button" onClick={handlePrev}>
          &#10094; {/* Ok simgesi - Önceki slayta geçmek için */}
        </button>
        {/* Sonraki Slayta Geçmek İçin Buton */}
        <button className="next-button" onClick={handleNext}>
          &#10095; {/* Ok simgesi - Sonraki slayta geçmek için */}
        </button>
      </div>
      {/* Slayt Sayıları */}
      <div className="slide-indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`slide-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleSlideClick(index)}
          >
            {index + 1} {/* Slayt numarasını gösterir */}
          </div>
        ))}
      </div>
    </>
  );
};

export default CarouselSlider;
