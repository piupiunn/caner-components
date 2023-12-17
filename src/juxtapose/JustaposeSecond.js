import React, { useState, useRef } from "react";

const JuxtaposeComponent = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseDown = () => {
    // Mouse tıklandığında, mouse hareketini dinlemek ve olayı işlemek için
    // "handleMouseMove" ve "handleMouseUp" fonksiyonlarını eklemek.
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    // Mouse hareket ettikçe, çubuğun yeni konumunu hesaplamak ve güncellemek.
    // getBoundingClientRect(), bir DOM elemanının pozisyon ve boyut bilgilerini döndüren bir metottur,
    // getBoundingClientRect(), DOM elemanının sol, üst, sağ ve alt kenarlarının konumlarını ve elemanın genişlik ve yükseklik değerlerini içerir.
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    // newPosition değişkeni, mouse olayının x koordinatı (e.clientX) ve konteynerin sol kenarının x koordinatı (containerRect.left) arasındaki farkı alarak başlar.
    // Bu, mouse pozisyonunu, konteynerin sol kenarından ne kadar uzakta olduğunu temsil eder.
    // Ardından, newPosition değeri, konteynerin genişliğine (containerWidth) bölünerek yüzde cinsinden bir değer elde edilir.
    // Bu değer, çubuğun konteyner içerisindeki konumunu yüzde olarak temsil eder.
    const newPosition =
      ((e.clientX - containerRect.left) / containerWidth) * 100;
    // Yeni konumu 0 ile 100 arasında sınırlamak, böylece çubuk sadece resimlerin olduğu alanda hareket eder.
    // Math.min(newPosition, 100) ifadesi, newPosition değerini ve 100 değerini karşılaştırır ve daha küçük olan değeri döndürür.
    // Bu, newPosition'ın en fazla 100 olmasını sağlar.
    // Daha sonra, Math.max(0, ...) ifadesi, önceki adımda döndürülen değeri ve 0 değerini karşılaştırır ve
    // daha büyük olan değeri döndürür. Bu, newPosition'ın en az 0 olmasını sağlar.
    // Örneğin newPosition değeri 120 olsun. Math.min(newPosition, 100) ifadesi, 100 değerini döndürecektir,
    // çünkü 120 100'den daha büyüktür. Ardından, Math.max(0, 100) ifadesi, 100 değerini döndürecektir,
    // çünkü 100 0'dan daha büyüktür. Sonuç olarak, clampedPosition değeri 100 olacaktır.
    // Sonuç olarak clampedPosition değeri ile sadece resimlerin olduğu alanda hareket edilmesini sağlamak için sınırlı bir alan uygun bir şekilde belirlenir.
    const clampedPosition = Math.max(0, Math.min(newPosition, 100));
    setPosition(clampedPosition);
  };

  const handleMouseUp = () => {
    // Mouse bırakıldığında, mouse hareketini durdurun ve işlemeyi durdurun.
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
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
      {/* Resimlerin olduğu alanı sınırlamak için bir referans oluşturun */}
      <div
        className="juxtapose-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
      >
        {/* İlk resim */}
        <div className="second-juxtapose-image">
          <img
            src="https://images.pexels.com/photos/2770371/pexels-photo-2770371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt=""
          />
          {/* Karşılaştırma çubuğu */}
          <div
            className="second-juxtapose-bar"
            style={{
              left: `${position}%`,
            }}
          />
        </div>

        {/* İkinci resim */}
        <div
          className="second-juxtapose-image"
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
    </>
  );
};

export default JuxtaposeComponent;
