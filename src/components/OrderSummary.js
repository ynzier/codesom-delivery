import React from "react";
import { Input, Col, Button, Space, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
const { Option } = Select;
const OrderSummary = ({
  cart,
  routes,
  recipientInfo,
  total,
  handleSelectBranch,
  selectBranch,
  finalTotal,
  deliveryFare,
  handleBackToConfirm,
}) => {
  return (
    <Col
      className="gutter-row"
      md={9}
      style={{
        padding: "32px 16px 16px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h5>คำสั่งซื้อ</h5>
      <div style={{ height: 620 }}>
        <Space
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "stretch",
            height: 400,
          }}
        >
          <span>รายการสินค้า</span>
          {cart.map((obj, index) => {
            return (
              <div key={obj.name + index}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "16px 12px",
                  }}
                >
                  <div className="item-count">
                    <b>{obj.quantity}</b>
                  </div>

                  <span className="order-name">{obj.name}</span>

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
              </div>
            );
          })}
        </Space>
        <hr />
        <Space
          style={{
            flexDirection: "column",
            width: "100%",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ flex: 1 }}>ยอดรวม:</span>
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
          <div>
            จัดส่งจาก
            <Select
              bordered={false}
              defaultValue={0}
              onChange={handleSelectBranch}
              value={selectBranch}
            >
              {routes.map((obj, index) => {
                return (
                  <Option key={obj.brId + index} value={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px 12px",
                      }}
                    >
                      <span>สาขา {obj.brName}</span>
                    </div>
                  </Option>
                );
              })}
            </Select>
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ flex: 1 }}>ค่าจัดส่ง:</span>
            <NumberFormat
              value={deliveryFare}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
          {/*           
          <div style={{ display: "flex" }}>
            <Input
              placeholder="กรอกรหัสโปรโมชัน (ถ้ามี)"
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button>ตรวจสอบ</Button>
          </div> */}

          <Input
            placeholder="กรอกรหัสโปรโมชัน (ถ้ามี)"
            style={{ width: "60%" }}
          />
          <div style={{ display: "flex" }}>
            <span style={{ flex: 1 }}>ยอดรวมทั้งหมด:</span>
            <NumberFormat
              value={finalTotal}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
        </Space>
      </div>
      <div className="bottom-promo">
        <Button
          type="primary"
          ghost
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
          }}
          onClick={handleBackToConfirm}
        >
          <div>
            <LeftOutlined
              style={{
                marginRight: 4,
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
            }}
          >
            กลับ
          </div>
        </Button>
        <Button
          type="primary"
          block
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 4,
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
            ยืนยันข้อมูลจัดส่ง
          </div>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RightOutlined
              style={{
                float: "right",
                marginTop: 4,
              }}
            />
          </div>
        </Button>
      </div>
    </Col>
  );
};
export default OrderSummary;
