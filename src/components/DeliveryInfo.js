import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Lalamove from "../assets/lalamove";
import { Icon } from "@iconify/react";

const DeliveryInfo = ({
  handleSetDelivery,
  handleShowModal,
  confirmPosition,
  mapConfirm,
}) => {
  const { isLoaded, hasError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDVQ7VpCG8QO7OYtIFDZVGzQCmNld4bdm8", // ,
  });
  return (
    <Col
      className="gutter-row"
      md={9}
      style={{
        padding: "32px 16px 16px 16px",
      }}
    >
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Row>
          <h5>ข้อมูลการจัดส่ง</h5>
        </Row>
        <Input placeholder="ชื่อผู้รับ" />
        <Input placeholder="เบอร์ติดต่อ" />
        <Input.TextArea
          style={{
            height: 80,
            resize: "none",
          }}
          placeholder="ที่อยู่สำหรับจัดส่ง"
        />
        <Input.TextArea
          style={{
            height: 60,
            resize: "none",
          }}
          placeholder="คำอธิบายการเดินทาง"
        />
        {mapConfirm ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: 300 }}
            center={confirmPosition}
            options={{ disableDefaultUI: true }}
            zoom={18}
          >
            <Marker position={confirmPosition} />
            <Button
              onClick={handleShowModal}
              style={{
                bottom: 0,
                position: "absolute",
                display: "flex",
                flexDirection: "row",
              }}
              className="get-current-location"
            >
              <div style={{ marginRight: 4 }}>
                <Icon icon="ci:edit" style={{ marginTop: 4 }} />
              </div>
              แก้ไขตำแหน่ง
            </Button>
          </GoogleMap>
        ) : (
          <a
            style={{
              width: "100%",
              height: 300,
              border: "1px dashed #d9d9d9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={handleShowModal}
          >
            <Icon icon="ei:location" color="#d9d9d9" width="50" height="50" />
            <span
              style={{
                color: "#d9d9d9",
              }}
            >
              ยังไม่มีตำแหน่งจัดส่งบนแผนที่
            </span>
          </a>
        )}
        <Row
          style={{
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline",
              verticalAlign: "text-bottom",
            }}
          >
            จัดส่งโดย:
          </span>{" "}
          <Lalamove
            style={{
              verticalAlign: "middle",
            }}
          />
        </Row>
      </Space>
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
          onClick={handleSetDelivery}
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
export default DeliveryInfo;
