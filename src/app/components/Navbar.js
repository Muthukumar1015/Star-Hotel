"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown, Offcanvas } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { clearCart } from "@/app/store/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const cartRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Hide Cart Preview when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartPreview(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart(user?.email));
    router.push("/");
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-navbar">
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} href="/" className="brand">
            <img src="/images/logo__mk.png" alt="Logo" height="60" />
          </Navbar.Brand>

          {/* Mobile Cart & Profile Icons */}
          <div className="d-flex d-lg-none">
            <div className="cart-container" onClick={() => !user ? router.push("/Login") : setShowCartPreview(!showCartPreview)}>
              <FaShoppingCart className="cart-icon" size={22} />
              {user && cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </div>
            <FaUser className="profile-icon" size={22} onClick={() => router.push(user ? "/profile" : "/Login")} />
          </div>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setShowOffcanvas(true)}>
            <FaBars size={24} />
          </Navbar.Toggle>

          {/* Offcanvas Navbar for Mobile */}
          <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto text-center">
                <Nav.Link as={Link} href="/" onClick={() => setShowOffcanvas(false)}>Home</Nav.Link>
                <Nav.Link as={Link} href="/aboutus" onClick={() => setShowOffcanvas(false)}>About Us</Nav.Link>
                <Nav.Link as={Link} href="/shop" onClick={() => setShowOffcanvas(false)}>Shop</Nav.Link>
                <Nav.Link as={Link} href="/blog" onClick={() => setShowOffcanvas(false)}>Blog</Nav.Link>
                <Nav.Link as={Link} href="/ContactUs" onClick={() => setShowOffcanvas(false)}>Contact Us</Nav.Link>
                <NavDropdown title="Pages" id="pages-dropdown" className="fw-semibold">
                  <NavDropdown.Item as={Link} href="/Service">Service</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/Gallery">Gallery</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/Testimonials">Testimonials</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/faq">FAQ's</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/Login">My Account</NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/Your-Order">Your Order</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Desktop View - Cart & Profile Icons */}
          <div className="d-none d-lg-flex align-items-center">
            <div className="cart-container" onClick={() => !user ? router.push("/Login") : setShowCartPreview(!showCartPreview)}>
              <FaShoppingCart className="cart-icon" size={22} />
              {user && cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </div>

            {user ? (
              <NavDropdown title={<FaUser size={20} />} id="user-dropdown">
                <NavDropdown.Item as={Link} href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <FaUser className="profile-icon" size={20} onClick={() => router.push("/Login")} />
            )}
            <Button variant="danger" className="ms-3 px-4 fw-bold order-now">ORDER NOW</Button>
          </div>
        </Container>
      </Navbar>

      {/* Cart Preview */}
      {showCartPreview && user && (
        <div ref={cartRef} className="cart-preview">
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

      {/* ✅ Internal CSS */}
      <style jsx>{`
        .fixed-navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          background: black;
        }

        .cart-container {
          position: relative;
          cursor: pointer;
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
          position: fixed;
          top: 60px;
          right: 10px;
          width: 280px;
          background: white;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          z-index: 1050;
        }

        @media (max-width: 768px) {
          .cart-preview {
            width: 90%;
            left: 5%;
          }
        }
      `}</style>
    </>
  );
}
