import React, { useRef } from "react";

const CssSlider = ({ images }) => {
  const sliderRef = useRef(null);

  const scrollToPrev = () => {
    const scrollAmount = sliderRef.current.offsetWidth; // Kaydırma miktarı, slaytın genişliği kadar olacak
    sliderRef.current.scrollBy({
      left: -scrollAmount, // Slaytın soluna doğru kaydırma miktarı negatif olarak ayarlandı
      behavior: "smooth", // Kaydırma işlemi animasyonlu olacak şekilde ayarlandı
    });
  };

  const scrollToNext = () => {
    const scrollAmount = sliderRef.current.offsetWidth; // Kaydırma miktarı, slaytın genişliği kadar olacak.
    //offsetWidth, bir HTML öğesinin toplam genişliğini (içerik, padding ve kenar boşluklarını içeren) piksel cinsinden ifade eden bir özelliktir.
    // sliderRef.current ifadesi ise slider öğesinin gerçek DOM örneğini temsil eder.
    //sliderRef.current.offsetWidth ifadesi, slider öğesinin genişliğini piksel cinsinden alır.
    //Bu değer, bir slaytın tam genişliğini temsil eder.
    // Kaydırma işlemi yaparken, her bir slaytın genişliği kadar kaydırmak istediğimiz için scrollAmount değişkenine bu değeri atıyoruz.
    //Örneğin, bir slaytın genişliği 500 piksel ise, scrollAmount değişkeni 500 değerini alacaktır. Bu değer, kaydırma işlemi sırasında ne kadar kaydırma yapılacağını belirlemek için kullanılır.
    // scrollAmount değeri negatif olarak ayarlanırsa, slaytlar sola doğru kayar. Pozitif olarak ayarlanırsa, slaytlar sağa doğru kayar.

    sliderRef.current.scrollBy({
      left: scrollAmount, // Slaytın sağına doğru kaydırma miktarı ayarlandı
      behavior: "smooth", // Kaydırma işlemi animasyonlu olacak şekilde ayarlandı
    });
  };

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={scrollToPrev}>
        &#8249;
      </button>
      <div className="slider-items" ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index} className="slider-item">
            <img width={300} height={300} src={image} alt="" />
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={scrollToNext}>
        &#8250;
      </button>
    </div>
  );
};

export default CssSlider;
