import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Map } from "components/Map";
const MapModal = ({ showMapModal, handleConfirmMap, handleCancelMap }) => {
  const [markerPosition, setMarkerPosition] = useState(undefined);
  const [mapCenter, setMapCenter] = useState(undefined);

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarkerPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }),
    []
  );

  return (
    <Modal
      title={
        <>
          <div>
            <b>ตำแหน่งที่จัดส่ง</b>
          </div>
        </>
      }
      centered
      visible={showMapModal}
      onOk={() => handleConfirmMap(markerPosition)}
      onCancel={handleCancelMap}
      okText="ยืนยันตำแหน่ง"
      cancelText="ยกเลิก"
      width={1000}
    >
      <Map
        zoom={18}
        center={mapCenter}
        onCenterChanged={setMarkerPosition}
        marker={markerPosition}
      />
    </Modal>
  );
};

export default MapModal;
