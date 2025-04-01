"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Table, Button, Alert, ProgressBar } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsCheckCircle } from "react-icons/bs"; 

export default function YourOrdersPage() {
  const orders = useSelector((state) => state.orders.orders);
  const router = useRouter();
  const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];

  const [orderStatus, setOrderStatus] = useState({});
  const [completedOrders, setCompletedOrders] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStatus = JSON.parse(localStorage.getItem("orderStatus") || "{}");
      setOrderStatus(savedStatus);
    }
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      const newStatus = { ...orderStatus };
      const completed = {};

      orders.forEach((order) => {
        let startTime = order.startTime || JSON.parse(localStorage.getItem(`startTime-${order.id}`) || "0");
        if (!startTime) {
          startTime = Date.now();
          localStorage.setItem(`startTime-${order.id}`, JSON.stringify(startTime));
        }

        const elapsedTime = (Date.now() - startTime) / (1000 * 60); // Minutes elapsed

        let step = 0;
        if (elapsedTime >= 5) step = 1; // Item Packed after 5 minutes
        if (elapsedTime >= 20) step = 2; // Shipped after 15 minutes
        if (elapsedTime >= 35) step = 3; // Out for Delivery after 15 minutes
        if (elapsedTime >= 45) step = 4; // Delivered after 10 minutes

        newStatus[order.id] = step;

        if (elapsedTime >= 60) {
          completed[order.id] = true;
        }
      });

      setOrderStatus(newStatus);
      setCompletedOrders(completed);
      localStorage.setItem("orderStatus", JSON.stringify(newStatus));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 3000);
    return () => clearInterval(interval);
  }, [orders]);

  return (
    <Container className="your-orders-page mt-5">
      <h3 className="fw-bold">Your Orders</h3>
      {orders.length === 0 ? (
        <Alert variant="warning">No orders found.</Alert>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-3 mb-4 rounded">
            <h5 className="fw-bold">Tracking ID: {order.id}</h5>
            <p>
              <strong>Date:</strong> {order.date}{" "}
              {completedOrders[order.id] && <BsCheckCircle color="green" size={20} />}
            </p>

            <Alert variant="info">
              <h6>Status: {statuses[orderStatus[order.id]] || "Processing"}</h6>
            </Alert>
            <ProgressBar now={(orderStatus[order.id] + 1) * 20} label={statuses[orderStatus[order.id]] || "Processing"} />

            <Table bordered className="mt-3">
              <thead>
                <tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th></tr>
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
                <tr><td colSpan="3" className="text-end fw-bold">Total</td><td>${order.totalPrice.toFixed(2)}</td></tr>
              </tbody>
            </Table>

            <Button variant="primary" onClick={() => router.push(`/TrackingPage?trackingId=${order.id}`)}>
              Track Order
            </Button>
          </div>
        ))
      )}
    </Container>
  );
} 