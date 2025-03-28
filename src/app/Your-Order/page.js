"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Table, Button, Alert, ProgressBar } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsCheckCircle } from "react-icons/bs"; // Tick icon

export default function YourOrdersPage() {
  const orders = useSelector((state) => state.orders.orders);
  const router = useRouter();
  const statuses = ["Order Confirmed", "Item Packed", "Shipped", "Out for Delivery", "Delivered"];

  const [orderStatus, setOrderStatus] = useState({});
  const [completedOrders, setCompletedOrders] = useState({});

  useEffect(() => {
    const updateStatus = () => {
      const newStatus = {};
      const completed = {}; 

      orders.forEach((order) => {
        let elapsedTime = (new Date() - new Date(order.date)) / (1000 * 60); // Minutes elapsed
        let step = Math.min(Math.floor(elapsedTime / 15), statuses.length - 1);

        newStatus[order.id] = step;

        // If order is older than 1 hour, mark it as completed
        if (elapsedTime >= 60) {
          completed[order.id] = true;
        }
      });

      setOrderStatus(newStatus);
      setCompletedOrders(completed);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 15 * 60 * 1000); // Update every 15 minutes
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
              {completedOrders[order.id] && <BsCheckCircle color="green" size={20} />} {/* Tick icon after 1 hour */}
            </p>

            {/* Order Status */}
            <Alert variant="info">
              <h6>Status: {statuses[orderStatus[order.id]]}</h6>
            </Alert>
            <ProgressBar now={(orderStatus[order.id] + 1) * 20} label={statuses[orderStatus[order.id]]} />

            {/* Order Items */}
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

            {/* Track Order Button */}
            <Button variant="primary" onClick={() => router.push(`/TrackingPage?trackingId=${order.id}`)}>
              Track Order
            </Button>
          </div>
        ))
      )}
    </Container>
  );
}
