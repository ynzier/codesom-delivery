import React from "react";
import { List, Steps, Space, Row, Popover, ConfigProvider } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import NumberFormat from "react-number-format";
const { Step } = Steps;

const customizeRenderEmpty = () => (
  <div
    style={{
      height: 400,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <FrownOutlined style={{ fontSize: 108, marginBottom: 32 }} />
    <b>ไม่มีข้อมูลการสั่งซื้อ</b>
  </div>
);

const content = (item) => {
  const itemList = item.order.order_items || [];
  return (
    <div style={{ height: 200, width: 200, overflowY: "auto", padding: 8 }}>
      <b>สินค้าทั้งหมด</b>
      <div style={{ marginTop: 8 }}>
        {itemList.map((obj) => (
          <>
            <div style={{ display: "flex", marginBottom: 8 }}>
              <div className="item-count">
                <b>{obj.prCount}</b>
              </div>
              <span
                style={{
                  marginLeft: 8,
                  flex: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {obj.product?.prName}
              </span>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

const FindOrder = ({ historyData }) => {
  return (
    <Row className="summary-container">
      <Row className="summary-card" style={{ padding: 32 }}>
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={historyData}
            style={{ width: "100%" }}
            renderItem={(item) => {
              var status = 0;
              if (item.transportStatus == "COMPLETED") {
                status = 3;
              } else if (item.transportStatus == "ASSIGNING_DRIVER") status = 0;
              else if (item.transportStatus == "ON_GOING") status = 1;
              else if (item.transportStatus == "PICKED_UP") status = 2;
              else status = -1;
              return (
                <List.Item
                  key={item.orderId}
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{ display: "flex", width: "100%", marginBottom: 32 }}
                  >
                    <Space direction="vertical" style={{ flex: 1 }}>
                      <b>คำสั่งซื้อ #{item.orderId}</b>
                      <span>
                        Tracking ID #
                        <a style={{ color: "#1da57a" }}>
                          {item.lalamoveOrderId}
                        </a>
                      </span>
                    </Space>
                    <Space direction="vertical" style={{ textAlign: "right" }}>
                      <b>
                        <NumberFormat
                          value={item.order.receipt.customerTotal}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix="฿"
                        />
                      </b>
                      <Popover
                        placement="right"
                        content={content(item)}
                        trigger="click"
                      >
                        <a style={{ color: "#1da57a" }}>ดูรายการ</a>
                      </Popover>
                    </Space>
                  </div>
                  <Steps progressDot size="small">
                    <Step
                      status={
                        status > 0
                          ? "finish"
                          : status == -1
                          ? "error"
                          : "process"
                      }
                      title={status == -1 ? "ยกเลิก" : "ค้นหาไรเดอร์"}
                    />
                    <Step
                      status={
                        status > 1 ? "finish" : status == 1 ? "process" : "wait"
                      }
                      title="กำลังไปรับสินค้า"
                    />
                    <Step
                      status={
                        status == 2 ? "process" : status > 2 ? "finish" : "wait"
                      }
                      title="อยู่ระหว่างนำส่ง"
                    />
                    <Step
                      status={
                        status == 3 ? "finish" : status > 3 ? "error" : "wait"
                      }
                      title="นำส่งเสร็จสิ้น"
                    />
                  </Steps>
                </List.Item>
              );
            }}
          />
        </ConfigProvider>
      </Row>
    </Row>
  );
};
export default FindOrder;
