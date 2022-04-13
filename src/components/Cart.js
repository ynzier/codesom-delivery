import React from "react";
import { Offcanvas } from "react-bootstrap";
import { InputNumber, Button, Row, Col, Space } from "antd";

const PromoSelect = ({ show, handleClose }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Body>
        <h5>ออเดอร์ของคุณ</h5>
        <hr />
        <hr />
        <span>ยอดรวมสินค้า</span>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PromoSelect;
