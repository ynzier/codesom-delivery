import React from "react";
import { Offcanvas } from "react-bootstrap";
import { InputNumber, Button, Row, Col, Space } from "antd";

const PromoSelect = ({ show, handleClose, item }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header style={{ padding: 0 }}>
        <img
          width={"100%"}
          height={"100%"}
          style={{ objectFit: "cover" }}
          src={item.image?.imgObj}
          alt=""
        />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h5>{item.promoName}</h5>
        <hr />
        <span>{item.promoDetail}</span>
        <div className="bottom-promo">
          <InputNumber
            min={1}
            max={100000}
            precision={0}
            defaultValue={1}
            style={{ textAlign: "right" }}
          />
          <Button style={{ width: "100%" }} type="primary" block>
            เพิ่มในออเดอร์ {item.promoPrice}฿
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PromoSelect;
