import React from "react";
import { Layout, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { Row, Col, Tabs, Carousel } from "antd";
import PromoCarousel from "../components/PromoCarousel";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

const Home = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="desktop">
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <img
              src={require("../assets/logo-white.png")}
              height="38"
              alt=""
              style={{
                marginRight: 16,
                boxShadow: "0 8px 8px rgba(0, 0, 0, 0.10)",
              }}
            />
            <span style={{ fontSize: 18, fontWeight: 500 }}>Codesom</span>
          </div>
          <Button
            type="primary"
            style={{ alignSelf: "center", justifySelf: "center" }}
            size="large"
            shape="round"
          >
            ตรวจสอบออเดอร์ <BellOutlined style={{ fontSize: 18 }} />
          </Button>
        </div>
      </Header>
      <Content className="mobile">
        <Button
          type="primary"
          style={{ float: "right", right: 10, top: 10, display: "absolute" }}
          size="large"
          shape="round"
        >
          <BellOutlined style={{ fontSize: 24 }} />
        </Button>
      </Content>
      <Content className="desktop">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "600px",
              width: "1200px",
              padding: 0,
              backgroundColor: "white",
            }}
            className="hovernow"
          >
            <Row>
              <Col md={16}>
                <PromoCarousel />
              </Col>
              <Col md={8} style={{ padding: "16px 32px" }}>
                <div style={{ float: "right" }}>เลือกสาขา</div>
                <Tabs defaultActiveKey="1" onChange={() => {}}>
                  <TabPane tab="โปรโมชัน" key="1">
                    Content of Tab Pane 1
                  </TabPane>
                  <TabPane tab="เมนูทั้งหมด" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "right", fontSize: 10 }}>
        2022 © codesom All Rights Reserved. Privacy Policy Powered By Miloteam
      </Footer>
    </Layout>
  );
};

export default Home;
