import React, { useState } from "react";
import QRCode from "qrcode";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "./QRCodeGenerator.css";

function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [dimension, setDimension] = useState(0);
  const [qrImageFormat, setQrImageFormat] = useState("png");
  const [qrCodeColor, setQRCodeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleGenerateClick = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = dimension;
      canvas.height = dimension;

      await QRCode.toCanvas(canvas, text, {
        errorCorrectionLevel: "H",
        margin: 1,
        color: {
          dark: qrCodeColor,
          light: backgroundColor,
        },
      });

      const dataUrl = canvas.toDataURL(`image/${qrImageFormat}`);
      setQRCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleResetClick = () => {
    setBackgroundColor("FFFFFF");
    setQRCodeColor("000000");
    setQrImageFormat("png");
    setText("");
    setDimension(0);
    setQRCodeDataUrl("");
  };
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;

    if (name === "dimension") {
      setDimension(parseInt(value));
    }
  };

  const handleDownloadClick = () => {
    if (qrCodeDataUrl) {
      const a = document.createElement("a");
      a.href = qrCodeDataUrl;
      a.download = `qr-code.${qrImageFormat}`;
      a.click();
    }
  };

  return (
    <Container className="qr-generator mt-5">
      <Row>
        <Col md={6}>
          <h1 style={{ color: "Tomato" }} className="text-center ">
            QR CODE GENERATOR
          </h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter the Data:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text or URL"
                value={text}
                onChange={handleInputChange}
              />
              <Form.Group>
                <Form.Label>Image Dimensions:</Form.Label>
                <Form.Control
                  type="number"
                  name="dimension"
                  value={dimension}
                  onChange={handleDimensionChange}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Label>QR Image Format:</Form.Label>
              <Form.Control
                as="select"
                value={qrImageFormat}
                onChange={(e) => setQrImageFormat(e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="svg">SVG</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>QR Code Color:</Form.Label>
              <Form.Control
                type="color"
                value={qrCodeColor}
                onChange={(e) => setQRCodeColor(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Background Color:</Form.Label>
              <Form.Control
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleGenerateClick}
              className="generate-button"
            >
              Generate QR Code
            </Button>{" "}
            <Button
              variant="success"
              onClick={handleDownloadClick}
              className="download-button mt-2 "
              disabled={!qrCodeDataUrl}
            >
              Download QR Code
            </Button>
            <Button
              className="m-2 mt-3"
              variant="danger"
              onClick={handleResetClick}
            >
              Reset
            </Button>
          </Form>
        </Col>
        <Col md={6} className="text-center " style={{ marginTop: "100px" }}>
          {qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR Code" />}
        </Col>
      </Row>
    </Container>
  );
}

export default QRCodeGenerator;
