import React, { useState } from "react";
import { Layout, Button } from "antd";
import {
  BellOutlined,
  PlusCircleOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import { Row, Col, Tabs, List, Card } from "antd";
import PromoCarousel from "../components/PromoCarousel";
import { Offcanvas } from "react-bootstrap";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
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
              onClick={toggleShow}
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
                <Col md={8} style={{ padding: "16px 0px" }}>
                  <Row
                    style={{
                      overflow: "auto",
                      height: 520,
                      padding: "0px 32px",
                    }}
                  >
                    <Tabs defaultActiveKey="1" onChange={() => {}}>
                      <TabPane tab="โปรโมชัน" key="1">
                        <List
                          grid={{ column: 2, gutter: 16 }}
                          dataSource={data}
                          renderItem={(item) => (
                            <List.Item
                              style={{
                                borderWidth: 1,
                                borderColor: "#e4e4e4",
                                borderStyle: "solid",
                              }}
                              className="onhover"
                            >
                              <img
                                width={158}
                                height={158}
                                style={{ objectFit: "cover" }}
                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                alt=""
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  backgroundColor: "white",
                                  top: 138,
                                  right: 9,
                                }}
                              >
                                100sss฿
                              </div>
                              <Row>
                                <Col span={20}>
                                  <div className="description">
                                    sasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasdssasds
                                  </div>
                                </Col>
                                <Col span={4}>
                                  <div
                                    style={{
                                      padding: "12px 0px",
                                    }}
                                  >
                                    <PlusCircleOutlined
                                      className="plus"
                                      onClick={() => {}}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </List.Item>
                          )}
                        />
                      </TabPane>
                      <TabPane tab="เมนูทั้งหมด" key="2">
                        Content of Tab Pane 2
                      </TabPane>
                      <TabPane tab="ข้อมูลสาขา" key="3">
                        Content of Tab Pane 2
                      </TabPane>
                    </Tabs>
                  </Row>
                  <div style={{ padding: 20 }}>
                    <Button
                      type="primary"
                      block
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ShoppingFilled style={{ marginRight: 4 }} />1
                      </div>
                      <div style={{ flex: 1 }}>ออเดอร์ของคุณ</div>
                      <div>80฿</div>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "right", fontSize: 10 }}>
          2022 © codesom All Rights Reserved. Privacy Policy Powered By Miloteam
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
