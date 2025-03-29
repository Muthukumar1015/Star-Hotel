"use client";

import { useSelector, useDispatch } from "react-redux";
import { setBillingDetails, setShippingDetails, toggleShipping, setPaymentMethod } from "@/app/store/checkoutSlice";
import { clearCart } from "@/app/store/cartSlice";
import { addOrder } from "@/app/store/orderSlice"; // ✅ Import addOrder to save order details
import { Container, Row, Col, Form, Button, Table, Image, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter for navigation

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Initialize router
  const cartItems = useSelector((state) => state.cart.items);
  const { billingDetails, shippingDetails, shipToDifferent, paymentMethod } = useSelector((state) => state.checkout);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [canPlaceOrder, setCanPlaceOrder] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false); // ✅ State for popup

  useEffect(() => {
    setCanPlaceOrder(
      billingDetails.firstName && billingDetails.lastName && billingDetails.email && billingDetails.phone &&
      billingDetails.address && billingDetails.city && billingDetails.state && billingDetails.zipCode &&
      (!shipToDifferent || (shippingDetails.firstName && shippingDetails.lastName && shippingDetails.email &&
        shippingDetails.phone && shippingDetails.address && shippingDetails.city &&
        shippingDetails.state && shippingDetails.zipCode)) &&
      paymentMethod
    );
  }, [billingDetails, shippingDetails, shipToDifferent, paymentMethod]);

  const handleInputChange = (e, type) => {
    const action = type === "billing" ? setBillingDetails : setShippingDetails;
    dispatch(action({ ...type === "billing" ? billingDetails : shippingDetails, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (method) => {
    dispatch(setPaymentMethod(method));
    setPaymentDetails({}); // Reset payment details when method changes
  };

  const handleOrder = () => {
    if (canPlaceOrder) {
      const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder = {
        id: trackingNumber,
        items: cartItems,
        totalPrice,
        billingDetails,
        shippingDetails: shipToDifferent ? shippingDetails : billingDetails,
        paymentMethod,
        date: new Date().toLocaleDateString(),
      };

      dispatch(addOrder(newOrder)); // ✅ Save order to Redux
      dispatch(clearCart()); // ✅ Clear cart after order is placed

      setShowPopup(true); // ✅ Show popup before redirect
    }
  };

  const closePopupAndRedirect = () => {
    setShowPopup(false);
    router.push("/Your-Order"); // ✅ Redirect to "Your Orders" page
  };

  return (
    <Container className="checkout-page mt-5">
      <Row>
        {/* Billing Details */}
        <Col md={6}>
          <h5 className="fw-bold">Billing Address</h5>
          <Form>
            {["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"].map((field) => (
              <Form.Control key={field} name={field} placeholder={field.replace(/([A-Z])/g, " $1")} className="mb-3"
                value={billingDetails[field] || ""} onChange={(e) => handleInputChange(e, "billing")} />
            ))}
          </Form>
        </Col>

        {/* Shipping Details */}
        <Col md={6}>
          <h5 className="fw-bold">
            <Form.Check type="checkbox" label="Ship to a different address?" checked={shipToDifferent} onChange={() => dispatch(toggleShipping())} />
          </h5>
          {shipToDifferent && (
            <Form>
              {["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"].map((field) => (
                <Form.Control key={field} name={field} placeholder={field.replace(/([A-Z])/g, " $1")} className="mb-3"
                  value={shippingDetails[field] || ""} onChange={(e) => handleInputChange(e, "shipping")} />
              ))}
            </Form>
          )}
        </Col>
      </Row>

      {/* Order Summary */}
      <div className="order-summary mt-4 p-3 border rounded">
        <h5 className="fw-bold">Your Order</h5>
        <Table bordered>
          <thead>
            <tr><th>Image</th><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th></tr>
          </thead>
          <tbody>
            {cartItems.map(({ id, image, name, price, quantity }) => (
              <tr key={id}>
                <td><Image src={image} alt={name} width={50} height={50} rounded /></td>
                <td>{name}</td>
                <td>${price.toFixed(2)}</td>
                <td>{quantity}</td>
                <td>${(price * quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr><td colSpan="4" className="text-end fw-bold">Total</td><td>${totalPrice.toFixed(2)}</td></tr>
          </tbody>
        </Table>

        {/* Payment Options */}
        <h5>Payment Options</h5>
        {["cashOnDelivery", "gpayOnDelivery", "card", "paypal", "bank"].map((method) => (
          <Form.Check key={method} type="radio" label={method.replace(/([A-Z])/g, " $1")} name="payment"
            checked={paymentMethod === method} onChange={() => handlePaymentChange(method)} className="mb-2" />
        ))}

        {/* Payment Details Form */}
        {paymentMethod === "card" && (
          <Form className="mt-3">
            {["cardNumber", "expiryDate", "cvv"].map((field) => (
              <Form.Control key={field} name={field} placeholder={field.replace(/([A-Z])/g, " $1")} className="mb-3"
                onChange={(e) => setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value })} />
            ))}
          </Form>
        )}
        {paymentMethod === "paypal" && <p className="mt-2 text-info">You will be redirected to PayPal for payment.</p>}
        {paymentMethod === "bank" && <p className="mt-2 text-info">Bank transfer details will be provided after order placement.</p>}
        {paymentMethod === "cashOnDelivery" && <p className="mt-2 text-success fw-bold">Pay with cash when your order arrives.</p>}
        {paymentMethod === "gpayOnDelivery" && <p className="mt-2 text-primary fw-bold">Pay using Google Pay when your order arrives.</p>}

        {/* Place Order Button */}
        <Button variant="danger" className="w-100 mt-3" disabled={!canPlaceOrder} onClick={handleOrder}>
          Place Order
        </Button>
      </div>

      {/* ✅ Order Placed Popup */}
      <Modal show={showPopup} onHide={closePopupAndRedirect} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed successfully! 🎉<br />Check the "Your Orders" page for details.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closePopupAndRedirect}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
