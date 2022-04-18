import React from "react";
import { Offcanvas } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { InputNumber, Button, Row, Col, Space } from "antd";

const PromoSelect = ({
  show,
  handleClose,
  handleShowDelivery,
  cart,
  total,
  handleEdit,
}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Body>
        <h5>ออเดอร์ของคุณ</h5>
        <hr />
        {cart.map((obj) => {
          return (
            <>
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
                    handleEdit({ promoId: obj.promoId, prId: obj.prId });
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
            </>
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
        <div className="bottom-promo">
          <Button
            style={{ flex: 1 }}
            type="primary"
            ghost
            onClick={handleClose}
          >
            เลือกซื้อเพิ่ม
          </Button>
          <Button
            style={{ flex: 3 }}
            type="primary"
            block
            onClick={handleShowDelivery}
          >
            ดำเนินการสั่งซื้อ
            <RightOutlined style={{ float: "right", marginTop: 4 }} />
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PromoSelect;
