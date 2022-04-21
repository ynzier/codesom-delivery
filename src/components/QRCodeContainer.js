import React, { useState, useEffect } from "react";
import { Row } from "antd";
import orderService from "services/order.service";

const QRCodeContainer = ({
  qrURL,
  chrgInfo,
  confirmPaymentState,
  handlePaymentState,
}) => {
  const [breaker, setBreaker] = useState(0);

  useEffect(() => {
    const checkStatus = setInterval(() => {
      if (qrURL != "" && chrgInfo != "{}")
        if (breaker == 0) {
          orderService
            .checkDeliveryCharge(chrgInfo.chrgId)
            .then((res) => {
              if (res.data.message == "successful") {
                setBreaker(breaker + 1);
              }
              if (res.data.message == "not done") console.log("waiting...");
            })
            .catch((error) => {
              let resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              clearInterval(checkStatus);
              if (resMessage == "payment rejected")
                resMessage = "การชำระเงินถูกปฏิเสธ";
              console.log(resMessage);
            });
        }
      if (breaker == 1 && !confirmPaymentState) {
        clearInterval(checkStatus);
        handlePaymentState();
      }
    }, 2000);

    return () => {
      clearInterval(checkStatus);
    };
  }, [qrURL, chrgInfo, breaker]);
  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <Row className="qr-container">
      <h5 style={{ color: "white", marginBottom: 0 }}>QRCode</h5>
      <div className="qr-content">
        <img height="100%" src={qrURL} className="qrcode" />
      </div>
      <span className="qr-instruction">
        สแกนด้วย Mobile Banking เพื่อชำระเงิน
      </span>
    </Row>
  );
};
export default QRCodeContainer;
