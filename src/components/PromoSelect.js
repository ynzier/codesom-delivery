import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { InputNumber, Button, Row, Col, Space } from "antd";
import cartStorageService from "services/cartStorage.service";

const PromoSelect = ({ show, handleClose, item }) => {
  const [amount, setAmount] = useState(1);
  const [inCart, setInCart] = useState(false);

  const handleCart = () => {
    if (inCart) {
      cartStorageService.updateItem(item, amount);
    } else cartStorageService.addItem(item, amount);
    console.log("added");
    handleClose();
  };
  const handleRemove = () => {
    if (inCart && amount == 0) {
      var id = { prId: item.prId, promoId: item.promoId };
      cartStorageService.removeItem(id);
    }
    console.log("removed");
    handleClose();
  };
  useEffect(() => {
    if (item) {
      if (item.prId || item.promoId) {
        var id = { prId: item.prId, promoId: item.promoId };
        const currItem = cartStorageService.getItemById(id);
        if (currItem?.quantity) {
          setAmount(currItem.quantity);
          console.log("existed");
          setInCart(true);
        }
      }
    }
    return () => {
      setInCart(false);
      setAmount(1);
    };
  }, [item]);

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
        <h5>{item.name}</h5>
        <hr />
        <span>{item.detail}</span>
        <div className="bottom-promo">
          <InputNumber
            min={inCart ? 0 : 1}
            max={100000}
            precision={0}
            defaultValue={1}
            value={amount}
            style={{ textAlign: "right" }}
            onChange={(e) => {
              setAmount(e);
            }}
          />
          {amount == 0 ? (
            <Button
              style={{ width: "100%" }}
              type="primary"
              block
              onClick={handleRemove}
              danger
            >
              ลบสินค้าในตะกร้า
            </Button>
          ) : (
            <Button
              style={{ width: "100%" }}
              type="primary"
              block
              onClick={handleCart}
            >
              เพิ่มในออเดอร์ {item.price * amount}฿
            </Button>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PromoSelect;
