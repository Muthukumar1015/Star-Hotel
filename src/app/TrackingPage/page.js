"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateOrderStatus } from "@/app/store/orderSlice";
import { Container, Row, Col, ListGroup, Image, Spinner } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];
const updateInterval = 30 * 1000; // 30 seconds

export default function TrackingPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const trackingStatus = useSelector((state) => state.orders.trackingStatus);

  const [trackingId, setTrackingId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get Tracking ID from URL on first load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("trackingId");
    console.log("Extracted Tracking ID:", id); // Debugging

    if (id) {
      setTrackingId(id);
    }
  }, []);

  // ✅ Fetch Order from Redux & Local Storage
  useEffect(() => {
    if (!trackingId) return;

    console.log("Fetching order for tracking ID:", trackingId);

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Stored Orders:", storedOrders);

    let foundOrder = orders.find((o) => o.id === trackingId) || storedOrders.find((o) => o.id === trackingId);
    console.log("Found Order:", foundOrder);

    if (foundOrder) {
      setOrder({
        ...foundOrder,
        statusIndex: trackingStatus[trackingId]?.index ?? 0, // Ensure valid index
      });
    }
    setLoading(false);
  }, [trackingId, orders, trackingStatus]);

  // ✅ Keep Updating Order Status
  useEffect(() => {
    if (!trackingId) return;
    console.log("Starting order status updates for tracking ID:", trackingId);

    const interval = setInterval(() => {
      console.log("Dispatching updateOrderStatus...");
      dispatch(updateOrderStatus(trackingId));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [dispatch, trackingId]);

  // ✅ If Loading, Show Spinner
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <h5>Loading tracking details...</h5>
      </Container>
    );
  }

  // ✅ If No Order Found, Show Error Message
  if (!order) {
    return (
      <Container className="mt-5 text-center">
        <h4>Order not found! Please check your tracking ID.</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg tracking-container">
      <Row>
        <Col md={8}>
          <h3 className="fw-bold text-center mb-4">Order Tracking</h3>
          <h6 className="text-center mb-3">Tracking ID: {trackingId}</h6>

          <ListGroup>
            {statuses.map((status, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex align-items-center p-3"
                style={{ backgroundColor: index <= order.statusIndex ? "#d4edda" : "#f8f9fa" }}
              >
                {index < order.statusIndex ? (
                  <BsCheckCircleFill color="green" size={24} className="me-3" />
                ) : index === order.statusIndex ? (
                  <span className="me-3">🔄</span>
                ) : (
                  <FaShippingFast size={24} className="me-3 text-muted" />
                )}
                <span className={index <= order.statusIndex ? "fw-bold" : "text-muted"}>{status}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4} className="d-flex align-items-center justify-content-center">
          <Image 
            src="/images/delivery-boy1.png"
            alt="Tracking Image"
            fluid
            className="tracking-image"
          />
        </Col>
      </Row>

      <style jsx>{`
        .tracking-container {
          max-width: 900px;
          background-color: #f8f9fa;
        }
        .tracking-image {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .tracking-image {
            max-width: 70%;
          }
        }
      `}</style>
    </Container>
  );
}
