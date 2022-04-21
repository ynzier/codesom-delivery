import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Steps, Space, Button } from "antd";
import NumberFormat from "react-number-format";
import orderService from "services/order.service";
const { Step } = Steps;

const FindingRider = ({
  summaryCart,
  lalaInfo,
  payTotal,
  payDeliveryFare,
  payFinalTotal,
  vat,
  recipientInfo,
}) => {
  // const [breaker, setBreaker] = useState(0);

  // useEffect(() => {
  //   const checkStatus = setInterval(() => {
  //     if (qrURL != "" && chrgInfo != "{}")
  //       if (breaker == 0) {
  //         orderService
  //           .checkDeliveryCharge(chrgInfo.chrgId)
  //           .then((res) => {
  //             if (res.data.message == "successful") {
  //               setBreaker(breaker + 1);
  //             }
  //             if (res.data.message == "not done") console.log("waiting...");
  //           })
  //           .catch((error) => {
  //             let resMessage =
  //               (error.response &&
  //                 error.response.data &&
  //                 error.response.data.message) ||
  //               error.message ||
  //               error.toString();
  //             clearInterval(checkStatus);
  //             if (resMessage == "payment rejected")
  //               resMessage = "การชำระเงินถูกปฏิเสธ";
  //             console.log(resMessage);
  //           });
  //       }
  //     if (breaker == 1 && !confirmPaymentState) {
  //       clearInterval(checkStatus);
  //       handlePaymentState();
  //     }
  //   }, 2000);

  //   return () => {
  //     clearInterval(checkStatus);
  //   };
  // }, [qrURL, chrgInfo, breaker]);

  return (
    <Row className="summary-container">
      <Row className="summary-card">
        <Col
          span={8}
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "48px 0px 32px 32px",
            display: "flex",
            height: "100%",
          }}
        >
          <Steps direction="vertical" style={{ height: 400 }}>
            <Step status="finish" title="กำลังหาไรเดอร์" />
            <Step status="finish" title="เตรียมสินค้า" />
            <Step status="finish" title="อยู่ระหว่างนำส่ง" />
            <Step status="process" title="เสร็จสิ้น" />
          </Steps>
        </Col>
        <Divider style={{ marginTop: 15, height: "95%" }} type="vertical" />
        <Col
          span={15}
          style={{
            padding: "48px 32px 32px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", width: "100%", marginBottom: 12 }}>
            <Space direction="vertical" style={{ flex: 1 }}>
              <h4>ใบเสร็จชำระเงิน</h4>
              <h5>
                <NumberFormat
                  value={payFinalTotal}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  decimalSeparator="."
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix="฿"
                />
              </h5>
            </Space>
            <Space direction="vertical" style={{ textAlign: "right" }}>
              <span>คำสั่งซื้อ #2312219</span>
              <span
                style={{
                  width: 100,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                นำส่ง คุณ {recipientInfo.recipientName}
              </span>
              <div>
                <span>Tracking ID: </span>
                <a
                  style={{ color: "#1da57a" }}
                  href={lalaInfo.shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lalaInfo.lalaOrderId}
                </a>
              </div>
            </Space>
          </div>
          <b>รายการสินค้า</b>
          <div style={{ width: "100%", overflowY: "auto", height: 210 }}>
            <ul
              style={{
                paddingLeft: 0,
                paddingTop: 8,
                paddingRight: 12,
              }}
            >
              {summaryCart.map((item, index) => {
                const { name, quantity, total, price } = item;
                return (
                  <li
                    key={index}
                    data-index={index}
                    style={{
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span className="summary-order-name">{name}</span>
                    <NumberFormat
                      value={price}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator="."
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix="฿"
                      className="cart-price"
                      style={{ fontWeight: 500, flex: 1 }}
                      renderText={(formattedValue) => (
                        <>
                          <div
                            className="item-count"
                            style={{ marginRight: 8 }}
                          >
                            <b>{quantity}</b>
                          </div>
                          x {formattedValue}
                        </>
                      )}
                    />
                    <NumberFormat
                      value={total}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      decimalSeparator="."
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix="฿"
                      className="cart-price"
                      style={{ flex: 1 }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <Divider style={{ marginBottom: 12, marginTop: 12 }} />
          <div style={{ display: "flex" }}>
            <span style={{ flex: 2, textAlign: "right" }}>ราคารวม:</span>
            <NumberFormat
              value={payTotal}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ flex: 2, textAlign: "right" }}>ภาษี 7%:</span>
            <NumberFormat
              value={vat}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ flex: 2, textAlign: "right" }}>ค่านำส่ง:</span>
            <NumberFormat
              value={payDeliveryFare}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
          <div style={{ display: "flex" }}>
            <b style={{ flex: 2, textAlign: "right" }}>ราคาสุทธิ:</b>
            <NumberFormat
              value={payFinalTotal}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              displayType={"text"}
              thousandSeparator={true}
              suffix="฿"
              className="cart-price"
            />
          </div>
          <div style={{ width: "100%", marginTop: 8 }}>
            <Button type="primary" style={{ float: "right", width: 150 }}>
              เลือกซื้อเพิ่ม
            </Button>
          </div>
        </Col>
      </Row>
    </Row>
  );
};
export default FindingRider;
