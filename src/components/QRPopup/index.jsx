import { useState } from "react";
import QRCode from "react-qr-code";
import "./QRPopup.scss";

function QRPopup({ model }) {
  const [showPopup, setShowPopup] = useState(false);
  const qrValue = `https://qr-code-ruby-beta.vercel.app/?name=${encodeURIComponent(
    model.name
  )}&glb=${encodeURIComponent(model.model)}&usdz=${encodeURIComponent(
    model.usdz
  )}`;

  return (
    <div className="qr-wrapper">
      <button className="btn-open" onClick={() => setShowPopup(true)}>
        Trải nghiệm AR
      </button>

      {showPopup && (
        <div onClick={() => setShowPopup(false)} className="popup-overlay">
          <div className="popup-content">
            <h2 className="title">Quét QR bằng điện thoại để trình diễn AR</h2>
            <QRCode value={qrValue} size={500} />
          </div>
        </div>
      )}
    </div>
  );
}

export default QRPopup;
