import React, { useState, useEffect } from "react";
import {
  BellOutlined,
  PlusCircleOutlined,
  ShoppingFilled,
  FrownOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {
  Row,
  Col,
  Tabs,
  List,
  Layout,
  Button,
  ConfigProvider,
  notification,
  Modal,
} from "antd";
import Preloader from "components/Preloader";
import PromoCarousel from "../components/PromoCarousel";
import OrderSummary from "components/OrderSummary";
import { Icon } from "@iconify/react";
import promotionService from "../services/promotion.service";
import PromoSelect from "../components/PromoSelect";
import Cart from "components/Cart";
import DeliveryInfo from "components/DeliveryInfo";
import MapModal from "components/MapModal";
import productService from "services/product.service";
import branchService from "services/branch.service";
import cartStorageService from "services/cartStorage.service";
import lalamoveService from "services/lalamove.service";
import QRCodeContainer from "components/QRCodeContainer";
import orderService from "services/order.service";
import FindingRider from "components/FindingRider";

const { Header, Footer, Content } = Layout;
const { confirm } = Modal;

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
  const [paymentState, setPaymentState] = useState(false);
  const [qrURL, setQrURL] = useState("");
  const [toConfirm, setToConfirm] = useState(false);
  const [chrgInfo, setChrgInfo] = useState({});
  const [selectBranch, setSelectBranch] = useState(0);
  const [deliveryFare, setDeliveryFare] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [summaryCart, setSummaryCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [recipientInfo, setRecipientInfo] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);
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
  const [confirmPaymentState, setConfirmPaymentState] = useState(false);
  const [payTotal, setPayTotal] = useState(0);
  const [payWithVat, setPayWithVat] = useState(0);
  const [vat, setVat] = useState(0);
  const [payDeliveryFare, setPayDeliveryFare] = useState(0);
  const [payFinalTotal, setPayFinalTotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(undefined);
  const [lalaInfo, setLalaInfo] = useState({});
  const { promiseInProgress: gettingQR } = usePromiseTracker({
    area: "getQRCode",
  });
  const handlePaymentState = async () => {
    notification.success({
      message: "การชำระเงินเสร็จสิ้น!",
      description: "ระบบกำลังเตรียมการจัดส่ง...",
      duration: 5,
    });

    const data = {
      route: routes[selectBranch],
      recipientInfo: recipientInfo,
      cart: summaryCart,
      chrgInfo: chrgInfo,
      orderHeader: {
        payWithVat: +payWithVat.toFixed(2),
        payTotal: +payTotal.toFixed(2),
        payFinalTotal: +payFinalTotal.toFixed(2),
        payDeliveryFare: +payDeliveryFare.toFixed(2),
        totalQuantity: totalQuantity,
        vat: +vat.toFixed(2),
        omiseNet: chrgInfo.net / 100,
      },
    };
    await lalamoveService
      .doTransaction(data)
      .then((res) => {
        console.log(res.data);
        setLalaInfo(res.data.lalaInfo);

        handleClearCart();
        setConfirmPaymentState(true);
      })
      .catch((err) => console.log(err));
  };
  const handleOrderConfirm = async () => {
    await orderService
      .getQRCodeDelivery({
        brId: routes[selectBranch].brId,
        ordItems: cart,
        orderData: recipientInfo,
        amount: finalTotal,
      })
      .then((res) => {
        console.log(res.data);
        setChrgInfo(res.data);
        setQrURL(res.data.image);
        setPaymentState(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        notification.error({
          message: "พบข้อผิดพลาด!",
          description: resMessage,
        });
      });
  };
  const handleShowMap = () => {
    setShowMapModal(true);
  };
  const handleSelectBranch = (index) => {
    setDeliveryFare(routes[index].deliveryFare);
    setSelectBranch(index);
  };
  const handleBackToConfirm = () => {
    setPaymentState(false);
    setToConfirm(false);
  };
  const handleRouteRequest = async (destinationInfo) => {
    if (mapConfirm == false) {
      return openNotificationWithIcon("error");
    }
    const sendData = {
      coordinates: {
        lat: confirmPosition.lat.toString(),
        lng: confirmPosition.lng.toString(),
      },
      address: destinationInfo.recipientAddr,
      quantity: totalAmount,
      weight: totalWeight,
      ordItems: cart,
    };
    console.log(sendData);
    // setToConfirm(true);
    // setRecipientInfo(destinationInfo);
    // var resData = [
    //   {
    //     brId: 0,
    //     brName: "เซนทรัลปิ่นเกล้า",
    //     brTel: "0865419870",
    //     quotationId: "1222312232",
    //     destinationId: "23228998",
    //     deliveryFare: parseInt("43"),
    //   },
    //   {
    //     brId: 1,
    //     brName: "Central Pinklao",
    //     brTel: "0654987989",
    //     quotationId: "1233122322",
    //     destinationId: "232289298",
    //     deliveryFare: parseInt("54"),
    //   },
    //   {
    //     brId: 2,
    //     brName: "Central Rama3 ",
    //     brTel: "0909990000",
    //     quotationId: "12413122312",
    //     destinationId: "232289928",
    //     deliveryFare: parseInt("41"),
    //   },
    // ];`
    // setRoutes(resData);
    // setDeliveryFare(resData[0].deliveryFare);
    // setFinalTotal(total + deliveryFare);
    await lalamoveService
      .getFare(sendData)
      .then((res) => {
        console.log(res.data);
        setRecipientInfo(destinationInfo);
        setRoutes(res.data.quotations);
        setDeliveryFare(res.data.quotations[0].deliveryFare);
        setFinalTotal(total + deliveryFare);
        setTotalQuantity(res.data.totalQuantity);
        setSummaryCart(cart);
        setPayWithVat(total);
        setPayTotal(total / 1.07);
        setPayDeliveryFare(res.data.quotations[0].deliveryFare);
        setVat(total - total / 1.07);
        setPayFinalTotal(total + res.data.quotations[0].deliveryFare);
        setToConfirm(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
        notification.error({
          message: "พบข้อผิดพลาด!",
          description: resMessage,
        });
      });
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
  const handleClearCart = () => {
    cartStorageService.clearCart();
    setCartShow(false);
    setItem({});
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
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(resMessage);
      notification.error({
        message: "พบข้อผิดพลาด!",
        description: resMessage,
      });
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
    const tempWeight = prevCart.reduce(
      (current, traveler) => current + traveler.totalWeight,
      0
    );

    setTotal(tempTotal);
    setTotalAmount(tempAmount);
    setTotalWeight(tempWeight);
    return () => {};
  }, [item]);
  useEffect(() => {
    if (toConfirm && routes.length > 0) {
      setDeliveryFare(routes[selectBranch].deliveryFare);
      setFinalTotal(total + deliveryFare);
    }
    return () => {};
  }, [selectBranch, toConfirm, routes, deliveryFare, total]);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "เลือกพิกัด",
      description:
        "คุณลูกค้า กรุณาเลือกตำแหน่งที่ต้องการให้เราจัดส่งสินค้าให้ ก่อนทำรายการ",
    });
  };
  const orderConfirmModal = () => {
    confirm({
      tital: "ยืนยันคำสั่งซื้อ",
      content: "ท่านต้องการยืนยันคำสั่งซื้อหรือไม่ ?",
      okText: "ยืนยัน",
      cancelText: "ย้อนกลับ",
      centered: true,
      okButtonProps: { style: { width: 90 } },
      cancelButtonProps: { style: { width: 90 } },
      confirmLoading: gettingQR,
      onOk() {
        trackPromise(handleOrderConfirm(), "getQRCode");
      },
    });
  };
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
          handleClearCart={handleClearCart}
          cart={cart}
          total={total}
          totalWeight={totalWeight}
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
              <a
                onClick={() => {
                  window.location.reload();
                }}
              >
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
              </a>
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
              {confirmPaymentState ? (
                <FindingRider
                  summaryCart={summaryCart}
                  lalaInfo={lalaInfo}
                  payDeliveryFare={payDeliveryFare}
                  payTotal={payTotal}
                  vat={vat}
                  payFinalTotal={payFinalTotal}
                  recipientInfo={recipientInfo}
                />
              ) : (
                <Row>
                  <Col md={15}>
                    {paymentState ? (
                      <QRCodeContainer
                        qrURL={qrURL}
                        chrgInfo={chrgInfo}
                        confirmPaymentState={confirmPaymentState}
                        handlePaymentState={handlePaymentState}
                      />
                    ) : (
                      <PromoCarousel promo={promoData} />
                    )}
                  </Col>
                  {showDelivery ? (
                    toConfirm ? (
                      <OrderSummary
                        cart={cart}
                        routes={routes}
                        recipientInfo={recipientInfo}
                        handleSelectBranch={handleSelectBranch}
                        selectBranch={selectBranch}
                        total={total}
                        finalTotal={finalTotal}
                        deliveryFare={deliveryFare}
                        handleBackToConfirm={handleBackToConfirm}
                        orderConfirmModal={orderConfirmModal}
                        paymentState={paymentState}
                      />
                    ) : (
                      <DeliveryInfo
                        handleSetDelivery={handleSetDelivery}
                        handleShowModal={handleShowMap}
                        confirmPosition={confirmPosition}
                        mapConfirm={mapConfirm}
                        handleRouteRequest={handleRouteRequest}
                      />
                    )
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
              )}
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
