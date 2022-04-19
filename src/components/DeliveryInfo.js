import React from "react";
import { Row, Col, Button, Input, Space, Form } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Lalamove from "../assets/lalamove";
import { Icon } from "@iconify/react";

const DeliveryInfo = ({
  handleSetDelivery,
  handleShowModal,
  confirmPosition,
  mapConfirm,
  handleRouteRequest,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDVQ7VpCG8QO7OYtIFDZVGzQCmNld4bdm8", // ,
  });
  const [form] = Form.useForm();

  return (
    <Col className="gutter-row" md={9}>
      <Form
        form={form}
        onFinish={handleRouteRequest}
        style={{
          padding: "32px 16px 16px 16px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ flex: 1 }}>
          <h5 style={{ marginBottom: 16}}>ข้อมูลการจัดส่ง</h5>

          <Form.Item
            name="recipientName"
            rules={[{ required: true, message: "*ใส่ชื่อผู้รับ" }]}
          >
            <Input placeholder="ชื่อผู้รับ" />
          </Form.Item>

          <Form.Item
            name="recipientTel"
            rules={[
              { required: true, message: "*ใส่เบอร์โทรศัพท์" },
              { max: 10, message: "*ตัวเลขต้องไม่เกิน 10 ตัว" },
              { min: 9, message: "*ใส่เบอร์โทรศัพท์ให้ครบ" },
            ]}
          >
            <Input placeholder="เบอร์โทรศัพท์" />
          </Form.Item>

          <Form.Item
            name="recipientAddr"
            rules={[{ required: true, message: "*ใส่ที่อยู่สำหรับจัดส่ง" }]}
          >
            <Input.TextArea
              style={{
                height: 80,
                resize: "none",
              }}
              placeholder="ที่อยู่สำหรับจัดส่ง"
            />
          </Form.Item>
          {mapConfirm ? (
            isLoaded === true && (
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
            )
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
              marginTop: 12,
            }}
          >
            <span
              style={{
                display: "inline",
                verticalAlign: "text-bottom",
              }}
            >
              จัดส่งโดย:
            </span>
            <Lalamove
              style={{
                verticalAlign: "middle",
              }}
            />
          </Row>
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
            htmlType="submit"
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
      </Form>
    </Col>
  );
};
export default DeliveryInfo;
