"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomNavbar() {
  const router = useRouter();
  const [showCartPreview, setShowCartPreview] = useState(false);

  // 🛒 Get cart items from Redux
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🏠 Menu Items for easy mapping
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/aboutus" },
    { label: "Shop", path: "/shop" },  // ✅ Fixed
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/ContactUs" },  // ✅ Fixed
  ];

  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container fluid>
          {/* 🏠 Logo */}
          <Navbar.Brand onClick={() => router.push("/")} className="bg-white py-2 px-4">
            <img src="/images/logo__mk.png" alt="Logo" height="60" />
          </Navbar.Brand>

          {/* 📌 Mobile Menu Toggle */}
          <Navbar.Toggle aria-controls="navbar-nav">
            <FaBars size={24} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto text-center">
              {menuItems.map((item, index) => (
                <Nav.Link
                  key={index}
                  onClick={() => router.push(item.path)}
                  className="fw-semibold"
                >
                  {item.label}
                </Nav.Link>
              ))}

              {/* 🔽 Pages Dropdown Menu */}
              <NavDropdown title="Pages" id="pages-dropdown" className="fw-semibold">
                <NavDropdown.Item onClick={() => router.push("/chef")}>Chef</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/food-menu")}>Food Menu</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/gallery")}>Gallery</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/testimonials")}>Testimonials</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/reservation")}>Reservation</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/faq")}>FAQ's</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/my-account")}>My Account</NavDropdown.Item>
                <NavDropdown.Item onClick={() => router.push("/404")}>404 Page</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="d-flex align-items-center">
              {/* 🛒 Cart Button with Hover Preview */}
              <div 
                className="cart-container position-relative mx-3"
                onMouseEnter={() => setShowCartPreview(true)}
                onMouseLeave={() => setShowCartPreview(false)}
                style={{ cursor: "pointer" }}
              >
                <FaShoppingCart className="text-white" size={22} />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}

                {/* 🛍️ Cart Preview Dropdown */}
                {showCartPreview && (
                  <div className="cart-preview">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-muted">No items in cart</p>
                    ) : (
                      <>
                        {cartItems.map((item, index) => (
                          <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                              <p>{item.name}</p>
                              <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                        <hr />
                        <div className="cart-total">
                          <p>Total: <span>${totalPrice.toFixed(2)}</span></p>
                        </div>
                        <div className="cart-buttons">
                          <Button variant="danger" className="w-100" onClick={() => router.push("/Cart")}>View Cart</Button>
                          <Button variant="warning" className="w-100 mt-2" onClick={() => router.push("/checkout")}>Checkout</Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* 👤 User Profile - ✅ Fixed login navigation */}
              <FaUser 
                className="text-white mx-3" 
                size={20} 
                style={{ cursor: "pointer" }} 
                onClick={() => router.push("/login")} // ✅ Now redirects to login page
              />

              {/* 🔴 Order Now Button */}
              <Button variant="danger" className="ms-3 px-4 fw-bold">ORDER NOW</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Styles */}
      <style jsx>{`
        .cart-container {
          position: relative;
        }
        .cart-count {
          position: absolute;
          top: -5px;
          right: -8px;
          background: red;
          color: white;
          font-size: 12px;
          font-weight: bold;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-preview {
          position: absolute;
          top: 40px;
          right: 0;
          width: 250px;
          background: white;
          border-radius: 5px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 10px;
          z-index: 1000;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 0;
        }
        .cart-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 5px;
        }
        .cart-item-details {
          flex-grow: 1;
        }
        .cart-item-details p {
          margin: 0;
          font-weight: bold;
        }
        .cart-item-details span {
          font-size: 14px;
          color: #ff5e00;
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          padding: 5px 0;
          color: #ff5e00;
        }
        .cart-buttons {
          text-align: center;
        }
      `}</style>
    </>
  );
}
