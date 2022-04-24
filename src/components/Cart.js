import React from "react";
import { Offcanvas } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { Drawer, Button, Row, Col, Space } from "antd";

const Cart = ({
  show,
  handleClose,
  handleShowDelivery,
  cart,
  total,
  totalWeight,
  handleEdit,
  handleClearCart,
}) => {
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
      }}
    >
      <div className="d-flex w-100">
        <h5 style={{ flex: 1 }}>ออเดอร์ของคุณ</h5>
        <a className="clear-cart" onClick={handleClearCart}>
          ล้างตะกร้า
        </a>
      </div>
      <hr />
      <div style={{ flex: 1 }}>
        {cart.map((obj, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px 12px",
                }}
              >
                <div className="item-count">
                  <b>{obj.quantity}</b>
                </div>

                <span className="order-name">{obj.name}</span>
                <a
                  className="edit-text"
                  onClick={() => {
                    console.log(obj);
                    handleEdit({
                      promoId: obj.promoId,
                      productId: obj.productId,
                    });
                  }}
                >
                  แก้ไข
                </a>

                <NumberFormat
                  value={obj.total}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix="฿"
                  className="cart-price"
                />
              </div>
              <hr />
            </div>
          );
        })}

        <div style={{ display: "flex" }}>
          <span style={{ flex: 1 }}>ยอดรวมสินค้าในตะกร้า</span>
          <NumberFormat
            value={total}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator="."
            displayType={"text"}
            thousandSeparator={true}
            suffix="฿"
            className="cart-price"
          />
        </div>
      </div>
      {totalWeight > 20000 && (
        <span style={{ color: "red", marginBottom: 12 }}>
          *สามารถสั่งสินค้าได้ออเดอร์ละไม่เกิน 20กิโลกรัม
        </span>
      )}
      <div className="bottom-promo">
        <Button style={{ flex: 1 }} type="primary" ghost onClick={handleClose}>
          เลือกซื้อเพิ่ม
        </Button>
        <Button
          style={{ flex: 3 }}
          type="primary"
          disabled={totalWeight > 20000}
          block
          onClick={handleShowDelivery}
        >
          ดำเนินการสั่งซื้อ
          <RightOutlined style={{ float: "right", marginTop: 4 }} />
        </Button>
      </div>
    </Drawer>
  );
};

export default Cart;
