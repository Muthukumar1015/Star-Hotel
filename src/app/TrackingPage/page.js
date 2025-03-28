"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Container, Table, Alert, ProgressBar } from "react-bootstrap";

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("trackingId") || "";
  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [extraUpdates, setExtraUpdates] = useState([]);
  const orders = useSelector((state) => state.orders.orders);

  const statuses = [
    "Order Confirmed",
    "Item Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    if (trackingId) {
      const foundOrder = orders.find((o) => o.id === trackingId);
      if (foundOrder) {
        setOrder(foundOrder);

        // Load tracking status from localStorage
        const savedStatus = localStorage.getItem(`tracking_${trackingId}`);
        const savedExtraUpdates = JSON.parse(
          localStorage.getItem(`extra_updates_${trackingId}`) || "[]"
        );

        if (savedStatus) {
          setStatusIndex(parseInt(savedStatus));
        } else {
          let elapsedTime = (new Date() - new Date(foundOrder.date)) / (1000 * 60);
          let step = Math.min(Math.floor(elapsedTime / 12), statuses.length - 1);
          setStatusIndex(step);
          localStorage.setItem(`tracking_${trackingId}`, step);
        }

        setExtraUpdates(savedExtraUpdates);

        // Update status every 12 minutes
        const interval = setInterval(() => {
          setStatusIndex((prev) => {
            if (prev < statuses.length - 1) {
              const newIndex = prev + 1;
              localStorage.setItem(`tracking_${trackingId}`, newIndex);
              return newIndex;
            } else {
              clearInterval(interval);
              return prev;
            }
          });
        }, 12 * 60 * 1000);

        // Delivery boy updates after delivery
        const extraUpdateInterval = setInterval(() => {
          if (statusIndex === statuses.length - 1) {
            const newUpdate = `Delivery Boy Update: Order checked & verified at ${new Date().toLocaleTimeString()}`;
            setExtraUpdates((prevUpdates) => {
              const updatedList = [...prevUpdates, newUpdate];
              localStorage.setItem(`extra_updates_${trackingId}`, JSON.stringify(updatedList));
              return updatedList;
            });
          }
        }, 10 * 60 * 1000);

        return () => {
          clearInterval(interval);
          clearInterval(extraUpdateInterval);
        };
      }
    }
  }, [trackingId, orders, statusIndex]);

  return (
    <Container className="tracking-page mt-5">
      <h3 className="fw-bold">Track Your Order</h3>
      {order ? (
        <div className="order-details p-3 border rounded">
          <h5 className="fw-bold">Tracking ID: {order.id}</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(({ id, name, price, quantity }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>{quantity}</td>
                  <td>${(price * quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">Total</td>
                <td>${order.totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>

          {/* Order Status Section */}
          <Alert variant="info" className="text-center mt-3">
            <h5 className="fw-bold">Current Status</h5>
            <p className="fs-5">{statuses[statusIndex]}</p>
          </Alert>

          {/* Progress Bar */}
          <ProgressBar now={(statusIndex + 1) * 20} label={`${statuses[statusIndex]}`} />

          {/* Status Timeline */}
          <div className="status-timeline mt-4">
            {statuses.map((status, index) => (
              <div key={index} className={`status-item ${index <= statusIndex ? "completed" : ""}`}>
                <span className={`status-circle ${index <= statusIndex ? "active" : ""}`}>&#10003;</span>
                <p className="status-text">{status}</p>
              </div>
            ))}
          </div>

          {/* Delivery Boy Updates */}
          {extraUpdates.length > 0 && (
            <div className="extra-updates mt-4">
              <h5 className="fw-bold">Delivery Boy Updates</h5>
              <ul>
                {extraUpdates.map((update, index) => (
                  <li key={index}>{update}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        trackingId && <Alert variant="danger">Tracking ID not found!</Alert>
      )}
    </Container>
  );
}
