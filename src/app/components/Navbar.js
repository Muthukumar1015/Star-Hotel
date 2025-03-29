"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/authSlice";
import { clearCart } from "@/app/store/cartSlice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cartRef = useRef(null);
  const navbarRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Hide Cart & Navbar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartRef.current && !cartRef.current.contains(event.target) &&
        navbarRef.current && !navbarRef.current.contains(event.target)
      ) {
        setShowCartPreview(false);
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart(user?.email));
    router.push("/");
  };

  return (
    <>
      <Navbar ref={navbarRef} expand="lg" className="custom-navbar fixed-navbar" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} href="/" className="brand">
            <img src="/images/logo__mk.png" alt="Logo" height="60" />
          </Navbar.Brand>

          {/* Mobile View - Cart & Profile Icons */}
          <div className="mobile-icons d-lg-none">
            <div
              className="cart-container mx-3"
              onClick={() => (!user ? router.push("/Login") : setShowCartPreview(!showCartPreview))}
            >
              <FaShoppingCart className="cart-icon" size={22} />
              {user && cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
            </div>
            <FaUser className="profile-icon" size={22} onClick={() => router.push(user ? "/profile" : "/Login")} />
          </div>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(!expanded)}
          >
            <FaBars size={24} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto text-center">
              <Nav.Link as={Link} href="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <Nav.Link as={Link} href="/aboutus" onClick={() => setExpanded(false)}>About Us</Nav.Link>
              <Nav.Link as={Link} href="/shop" onClick={() => setExpanded(false)}>Shop</Nav.Link>
              <Nav.Link as={Link} href="/blog" onClick={() => setExpanded(false)}>Blog</Nav.Link>
              <Nav.Link as={Link} href="/ContactUs" onClick={() => setExpanded(false)}>Contact Us</Nav.Link>

              {/* Pages Dropdown */}
              <NavDropdown title="Pages" id="pages-dropdown" className="fw-semibold">
                <NavDropdown.Item as={Link} href="/Service">Service</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/Gallery">Gallery</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/Testimonials">Testimonials</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/reservation">Reservation</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/faq">FAQ's</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/Login">My Account</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/Your-Order">Your Order</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/TrackingPage">Tracking</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* Desktop View - Cart & Profile Icons */}
            <div className="d-none d-lg-flex align-items-center">
              <div
                className="cart-container mx-3"
                onClick={() => (!user ? router.push("/Login") : setShowCartPreview(!showCartPreview))}
              >
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
          </Navbar.Collapse>
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

      {/* ✅ Styles */}
      <style jsx>{`
        .fixed-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.9);
          transition: background 0.3s ease-in-out;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        }

        .mobile-icons {
          display: flex;
          align-items: center;
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
          .cart-preview {
    position: fixed;
    top: 60px;
    right: 10px;
    width: 280px;
    max-height: 400px; /* Set a fixed height */
    overflow-y: auto;  /* Enable vertical scrolling */
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    z-index: 1050;
  }

  /* Add smooth scrolling */
  .cart-preview::-webkit-scrollbar {
    width: 6px;
  }
  .cart-preview::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .cart-preview::-webkit-scrollbar-track {
    background: transparent;
  }
      `}</style>
    </>
  );
}
