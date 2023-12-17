import React, { useRef, useEffect, useState } from "react";

const Section = ({ id }) => {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll olayını dinleyen bir işlev oluşturuyoruz.
    const handleScroll = () => {
      // Bileşenin DOM referansını alıyoruz.
      const section = sectionRef.current;

      // Bileşenin ekran üzerindeki pozisyonunu hesaplıyoruz.
      const rect = section.getBoundingClientRect();

      // Bileşenin ekran içinde görünürlüğünü kontrol ediyoruz.
      // `rect.top` bileşenin üst sınırının ekranın üst sınırına olan uzaklığını,
      // `rect.bottom` ise bileşenin alt sınırının ekranın üst sınırına olan uzaklığını verir.
      // rect.top >= 0 && rect.bottom <= window.innerHeight ifadesi, bu iki koşulun birlikte sağlandığı durumu kontrol eder.
      // Yani, bileşenin üst sınırının ekranın üst sınırının altında veya
      // Tam olarak görünür olduğu ve bileşenin alt sınırının ekranın iç yüksekliği içinde veya tam olarak görünür olduğu durumları yakalar.
      setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);

      // Hata ayıklama amaçlı ekran yüksekliği ve bileşenin pozisyonunu konsola yazdırıyoruz.
      console.log("innher-height", window.innerHeight);
      console.log("rect.top", rect.top);
      console.log("rect.bottom", rect.bottom);
    };

    // Scroll olayını tarayıcıya dinletiyoruz.
    window.addEventListener("scroll", handleScroll);

    // Bileşen sona erdiğinde scroll olay dinlemeyi kaldırıyoruz.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`section ${isVisible ? "visible" : ""}`}
    >
      <h2>{id}</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
        architecto earum! Quisquam mollitia est ea eveniet voluptas molestiae a
        vero ducimus ex. Neque cum placeat facilis aperiam dolor nisi
        perspiciatis.
      </p>
    </div>
  );
};

export default Section;
