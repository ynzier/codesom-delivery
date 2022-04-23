import React, { useEffect, useState } from "react";
import { InputNumber, Button, Drawer, Col, Space } from "antd";
import cartStorageService from "services/cartStorage.service";

const PromoSelect = ({ show, handleClose, item }) => {
  const [amount, setAmount] = useState(1);
  const [inCart, setInCart] = useState(false);

  const handleCart = () => {
    if (amount == null) return;
    if (inCart) {
      cartStorageService.updateItem(item, amount);
    } else cartStorageService.addItem(item, amount);

    handleClose();
  };
  const handleRemove = () => {
    if (inCart && amount == 0) {
      var id = { prId: item.prId, promoId: item.promoId };
      cartStorageService.removeItem(id);
    }
    handleClose();
  };
  useEffect(() => {
    if (item != null && item != "{}") {
      var id = { prId: item.prId, promoId: item.promoId };
      const currItem = cartStorageService.getItemById(id);
      if (currItem?.quantity) {
        setAmount(currItem.quantity);

        setInCart(true);
      }
    }
    return () => {
      setInCart(false);
      setAmount(1);
    };
  }, [item]);

  return (
    <Drawer
      visible={show}
      onClose={handleClose}
      placement="right"
      width={400}
      closable={false}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          width={400}
          height={400}
          style={{ objectFit: "cover" }}
          src={item.image?.imgObj}
          alt=""
        />

        <div style={{ padding: 24 }}>
          <h5>{item.name}</h5>
          <hr />
          <span>{item.detail}</span>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div className="bottom-promo">
          <InputNumber
            min={inCart ? 0 : 1}
            max={99}
            maxLength={2}
            precision={0}
            pattern="[0-9]*"
            defaultValue={1}
            value={Number(amount)}
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
      </div>
    </Drawer>
  );
};

export default PromoSelect;
