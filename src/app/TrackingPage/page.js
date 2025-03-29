"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateOrderStatus } from "@/app/store/orderSlice";
import { Container, Row, Col, ListGroup, Spinner, Image } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];
const updateInterval = 5 * 1000; // Check every 5 seconds
const trackingDuration = 60 * 60 * 1000; // 1 hour

export default function TrackingPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  
  const [trackingId, setTrackingId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ Get tracking ID safely inside useEffect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("trackingId");
    setTrackingId(id);
  }, []);

  // Load order from Redux or localStorage when trackingId is available
  useEffect(() => {
    if (!trackingId) return;

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    let foundOrder = orders.find((o) => o.id === trackingId) || storedOrders.find((o) => o.id === trackingId);

    if (foundOrder) {
      if (!foundOrder.startTime) {
        foundOrder.startTime = Date.now();
        localStorage.setItem("orders", JSON.stringify(storedOrders));
      }
      setOrder(foundOrder);
    }
    setLoading(false);
  }, [trackingId, orders]);

  // Auto-update order status every 5 seconds for 1 hour
  useEffect(() => {
    if (!order) return;
    const elapsedTime = Date.now() - order.startTime;
    if (elapsedTime >= trackingDuration) return; // Stop updates after 1 hour

    const interval = setInterval(() => {
      dispatch(updateOrderStatus());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [dispatch, order]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <h5>Loading tracking details...</h5>
      </Container>
    );
  }

  if (!order) {
    return <Container className="mt-5"><h4>Order not found!</h4></Container>;
  }

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg tracking-container">
      <Row>
        {/* Tracking Details (Left Side) */}
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
                  <Spinner animation="border" size="sm" className="me-3" />
                ) : (
                  <FaShippingFast size={24} className="me-3 text-muted" />
                )}
                <span className={index <= order.statusIndex ? "fw-bold" : "text-muted"}>{status}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Image Container (Right Side) */}
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <Image 
            src="/images/delivery-boy.png"  // 🔄 Change this to your preferred image
            alt="Tracking Image"
            fluid
            className="tracking-image"
          />
        </Col>
      </Row>

      {/* ✅ Styles */}
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
