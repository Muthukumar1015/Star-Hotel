"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { removeFromCart, updateQuantity } from "@/app/store/cartSlice";
import { Container, Table, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Initialize router
  const cartItems = useSelector((state) => state.cart.items || []);

  return (
    <Container className="cart-page mt-5">
      <h2>Shopping Cart</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}
                >
                  -
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}
                >
                  +
                </Button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => dispatch(removeFromCart(item.id))}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Proceed to Checkout Button */}
      {cartItems.length > 0 && (
        <Button variant="success" className="mt-3 w-100" onClick={() => router.push("/checkout")}>
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
}
