import React, { useState, useEffect } from "react";
import {
  BellOutlined,
  PlusCircleOutlined,
  ShoppingFilled,
  FrownOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { Row, Col, Tabs, List, Layout, Button, ConfigProvider } from "antd";
import Preloader from "components/Preloader";
import PromoCarousel from "../components/PromoCarousel";
import { Icon } from "@iconify/react";
import promotionService from "../services/promotion.service";
import PromoSelect from "../components/PromoSelect";
import Cart from "components/Cart";
import DeliveryInfo from "components/DeliveryInfo";
import MapModal from "components/MapModal";
import productService from "services/product.service";
import branchService from "services/branch.service";
import cartStorageService from "services/cartStorage.service";

const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;
const customizeRenderEmpty = () => (
  <div style={{ textAlign: "center" }}>
    <FrownOutlined style={{ fontSize: 24 }} />
    <p>ไม่มีโปรโมชันในขณะนี้</p>
  </div>
);
const Home = () => {
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mapConfirm, setMapConfirm] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [item, setItem] = useState({});
  const [showDelivery, setShowDelivery] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [confirmPosition, setConfirmPosition] = useState({});
  const [loading, setLoading] = useState(true);
  const handleShowMap = () => {
    setShowMapModal(true);
  };
  const fetchCart = () => {
    const prevCart = cartStorageService.getItem();
    setCart(prevCart);
    return prevCart;
  };
  // editItem = { prId:number , promoId: number}
  const handleEdit = (editItem) => {
    let getItem = {};
    if (editItem.prId)
      getItem = productData.find((data) => data.prId == editItem.prId);
    if (editItem.promoId)
      getItem = promoData.find((data) => data.promoId == editItem.promoId);

    setItem(getItem);
    setCartShow(false);
    setShow(true);
  };
  const handleConfirmMap = (markerPosition) => {
    setShowMapModal((s) => !s);
    setMapConfirm(true);
    setConfirmPosition(markerPosition);
  };
  const handleCancelMap = () => {
    setShowMapModal((s) => !s);
  };
  const handleShowDelivery = () => {
    setCartShow(false);
    setShowDelivery(true);
  };
  const handleSetDelivery = () => {
    setShowDelivery((s) => !s);
  };
  const handleClose = () => {
    setShow(false);
    setItem({});
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
  const fetchData = async () => {
    await promotionService
      .getPromoForDelivery()
      .then((res) => setPromoData(res.data))
      .catch((err) => {
        console.log(err);
      });
    try {
      await productService
        .getAllDeliveryProduct()
        .then((res) => setProductData(res.data));
      await branchService
        .getBranchDelivery()
        .then((res) => setBranchData(res.data));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    fetchCart();
    return () => {};
  }, []);
  useEffect(() => {
    const prevCart = fetchCart();

    const tempTotal = prevCart.reduce(
      (current, traveler) => current + traveler.total,
      0
    );
    const tempAmount = prevCart.reduce(
      (current, traveler) => current + traveler.quantity,
      0
    );

    setTotal(tempTotal);
    setTotalAmount(tempAmount);
    return () => {};
  }, [item]);

  return (
    <>
      <Preloader show={loading} />
      <Layout style={{ minHeight: "100vh" }}>
        {show && (
          <PromoSelect show={show} handleClose={handleClose} item={item} />
        )}
        <Cart
          show={cartShow}
          handleClose={handleCloseCart}
          handleShowDelivery={handleShowDelivery}
          cart={cart}
          total={total}
          handleEdit={handleEdit}
        />
        <MapModal
          showMapModal={showMapModal}
          handleConfirmMap={handleConfirmMap}
          handleCancelMap={handleCancelMap}
        />
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
                  <PromoCarousel promo={promoData} />
                </Col>
                {showDelivery ? (
                  <DeliveryInfo
                    handleSetDelivery={handleSetDelivery}
                    handleShowModal={handleShowMap}
                    confirmPosition={confirmPosition}
                    mapConfirm={mapConfirm}
                  />
                ) : (
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
                          <ConfigProvider renderEmpty={customizeRenderEmpty}>
                            <List
                              grid={{ column: 2, gutter: 16 }}
                              dataSource={promoData}
                              loading={loading}
                              renderItem={(items) => (
                                <List.Item className="onhover">
                                  <img
                                    width={192}
                                    height={192}
                                    style={{ objectFit: "cover" }}
                                    src={items.image?.imgObj}
                                    alt=""
                                  />
                                  <div className="price">{items.price}฿</div>
                                  <Row>
                                    <Col span={18} style={{ padding: "8px" }}>
                                      <div className="description">
                                        {items.name}
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
                          </ConfigProvider>
                        </TabPane>
                        <TabPane tab="เมนูทั้งหมด" key="2">
                          <List
                            grid={{ column: 2, gutter: 16 }}
                            dataSource={productData}
                            loading={loading}
                            renderItem={(items) => (
                              <List.Item className="onhover">
                                <img
                                  width={192}
                                  height={192}
                                  style={{ objectFit: "cover" }}
                                  src={items.image?.imgObj}
                                  alt=""
                                />
                                <div className="price">{items.price}฿</div>
                                <Row>
                                  <Col span={18} style={{ padding: "8px" }}>
                                    <div className="description">
                                      {items.name}
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
                        <TabPane tab="ข้อมูลสาขา" key="3">
                          <List
                            itemLayout="horizontal"
                            dataSource={branchData}
                            loading={loading}
                            renderItem={(item) => {
                              let openTime, closeTime;

                              if (item.brOpenTime) {
                                openTime =
                                  item.brOpenTime.split(":", 3)[0] +
                                  ":" +
                                  item.brOpenTime.split(":", 3)[1];
                              }
                              if (item.brCloseTime) {
                                closeTime =
                                  item.brCloseTime.split(":", 3)[0] +
                                  ":" +
                                  item.brCloseTime.split(":", 3)[1];
                              }
                              return (
                                <List.Item
                                  actions={[
                                    <a
                                      key="location"
                                      className="branch-button"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={`http://maps.google.com/maps?&z=15&mrt=yp&t=m&q=${item.coordinateLat}+${item.coordinateLng}`}
                                    >
                                      <Icon
                                        icon="carbon:location-filled"
                                        width={24}
                                        height={24}
                                      />
                                    </a>,
                                    <a
                                      key="tel"
                                      className="branch-button"
                                      href={"tel:+66" + item.brTel}
                                    >
                                      <Icon
                                        icon="carbon:phone-filled"
                                        width={24}
                                        height={24}
                                      />
                                    </a>,
                                  ]}
                                >
                                  <List.Item.Meta
                                    title={
                                      <b style={{ fontSize: 16 }}>
                                        {item.brName}
                                      </b>
                                    }
                                    description={
                                      <div>
                                        เวลาทำการ: {openTime} - {closeTime}
                                      </div>
                                    }
                                  />
                                </List.Item>
                              );
                            }}
                          />
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
                          <ShoppingFilled style={{ marginRight: 4 }} />
                          {totalAmount}
                        </div>
                        <div style={{ flex: 1 }}>ออเดอร์ของคุณ</div>
                        <NumberFormat
                          value={total}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          decimalSeparator="."
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix="฿"
                        />
                      </Button>
                    </div>
                  </Col>
                )}
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
