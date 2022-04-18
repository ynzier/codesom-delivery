import React from "react";
import { Carousel } from "antd";

const PromoCarousel = ({ promo }) => {
  const contentStyle = {
    height: 734,
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#f6903d",
  };
  return (
    <Carousel autoplay autoplaySpeed={4000}>
      {promo.length > 0 &&
        promo.map((item) => (
          <div key={item.name}>
            <div style={contentStyle}>
              <img
                alt=""
                src={item.image?.imgObj}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        ))}
    </Carousel>
  );
};
export default PromoCarousel;
