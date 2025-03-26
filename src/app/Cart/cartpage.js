"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/app/store/shoppingCartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container, Table, Button, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.shoppingCart.items);
  const [shipping, setShipping] = useState("free"); // Shipping State

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container className="cart-page mt-5">
      {/* Cart Table */}
      <div className="cart-box p-3">
        <Table responsive bordered>
          <thead className="bg-danger text-white">
            <tr>
              <th>Menu Image</th>
              <th>Menu Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {!cartItems?.length ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No items in cart
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(updateQuantity({ id: item.id, amount: -1 }))
                        }
                      >
                        -
                      </Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, amount: 1 }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {/* Coupon Code Section */}
        <div className="coupon-box d-flex justify-content-between">
          <Form.Control type="text" placeholder="Coupon Code..." className="w-50" />
          <Button variant="danger">Apply Coupon</Button>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-3">
          <Button variant="danger" className="me-2">
            Update Cart
          </Button>
          <Button variant="danger" onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Cart Totals Section */}
      <div className="cart-totals p-3 mt-4">
        <h5 className="fw-bold">Cart Totals</h5>
        <div className="d-flex justify-content-between">
          <span>Cart Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="d-flex flex-column mt-2">
          <Form.Check
            type="radio"
            label="Free Shipping"
            name="shipping"
            checked={shipping === "free"}
            onChange={() => setShipping("free")}
          />
          <Form.Check
            type="radio"
            label="Flat Rate"
            name="shipping"
            checked={shipping === "flat"}
            onChange={() => setShipping("flat")}
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <span>Order Total</span>
          <span className="fw-bold text-danger">${totalPrice.toFixed(2)}</span>
        </div>
        <Button
          variant="danger"
          className="w-100 mt-3"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      </div>

      {/* Styles */}
      <style jsx>{`
        .cart-page {
          max-width: 900px;
          margin: auto;
        }
        .cart-box, .cart-totals {
          border: 1px solid #ddd;
          border-radius: 5px;
          background: #fff;
        }
        .cart-img {
          border-radius: 5px;
        }
      `}</style>
    </Container>
  );
}
