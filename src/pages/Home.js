import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import {
  BellOutlined,
  PlusCircleOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import { Row, Col, Tabs, List, Card } from "antd";
import PromoCarousel from "../components/PromoCarousel";
import { Offcanvas } from "react-bootstrap";
import promotionService from "../services/promotion.service";
import PromoSelect from "../components/PromoSelect";
import Cart from "../components/Cart";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const Home = () => {
  const [show, setShow] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [item, setItem] = useState({});
  const [cartShow, setCartShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseCart = () => {
    setCartShow(false);
  };
  const toggleShow = (items) => {
    setItem(items);
    setShow((s) => !s);
  };
  const toggleShowCart = () => {
    setCartShow((s) => !s);
  };
  useEffect(() => {
    promotionService
      .getCurrentPromotion()
      .then((res) => setPromoData(res.data))
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <PromoSelect show={show} handleClose={handleClose} item={item} />
        <Cart show={cartShow} handleClose={handleCloseCart} />
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
                height: "734px",
                width: "1174px",
                padding: 0,
                backgroundColor: "white",
              }}
              className="hovernow"
            >
              <Row>
                <Col md={15}>
                  <PromoCarousel />
                </Col>
                <Col md={9} style={{ padding: "16px 0px" }}>
                  <Row
                    style={{
                      overflow: "auto",
                      height: 650,
                      padding: "0px 20px",
                    }}
                  >
                    <Tabs
                      defaultActiveKey="1"
                      onChange={() => {}}
                      style={{ width: "100%" }}
                    >
                      <TabPane tab="โปรโมชัน" key="1">
                        <List
                          grid={{ column: 2, gutter: 16 }}
                          dataSource={promoData}
                          renderItem={(items) => (
                            <List.Item className="onhover">
                              <img
                                width={192}
                                height={192}
                                style={{ objectFit: "cover" }}
                                src={items.image?.imgObj}
                                alt=""
                              />
                              <div className="price">{items.promoPrice}฿</div>
                              <Row>
                                <Col span={18} style={{ padding: "8px" }}>
                                  <div className="description">
                                    {items.promoName}
                                  </div>
                                </Col>
                                <Col span={6}>
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      flex: 1,
                                      padding: 14,
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <PlusCircleOutlined
                                      className="plus"
                                      onClick={() => {
                                        toggleShow(items);
                                      }}
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
                      onClick={toggleShowCart}
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
