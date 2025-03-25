'use client';

import { useRouter } from 'next/navigation'; // Import useRouter
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart, FaSearch, FaClock, FaBars, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {
  const router = useRouter(); // Initialize router

  return (
    <>
      {/* 🔴 Top Bar */}
      <div className="bg-danger text-white d-flex justify-content-center align-items-center px-4 py-2">
        <div className="d-flex align-items-center">
          <FaClock className="me-2" /> 09:00 am - 06:00 pm
        </div>
      </div>

      {/* 🚀 Navbar */}
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container fluid>
          {/* 🏢 Logo */}
          <Navbar.Brand href="/" className="bg-white py-2 px-4 d-flex align-items-center">
            <img src="/images/logo__mk.png" alt="Logo" height="60" />
          </Navbar.Brand>

          {/* 📱 Mobile Toggle */}
          <Navbar.Toggle aria-controls="navbar-nav" className="ms-auto d-lg-none">
            <FaBars size={24} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto text-center">
              {["Home", "About Us", "Shop", "Pages", "Blog", "Contact Us"].map((item, index) => (
                <Nav.Link key={index} href={`/${item.toLowerCase().replace(/\s/g, '')}`} className="fw-semibold">
                  {item} <span className="text-danger fw-bold">+</span>
                </Nav.Link>
              ))}
            </Nav>

            {/* 🛒 Right Icons */}
            <div className="d-flex align-items-center">
              <FaSearch className="text-white mx-3" style={{ cursor: 'pointer' }} />

              {/* Cart & Login Icons */}
              <div className="d-flex align-items-center mx-3 position-relative">
                <FaShoppingCart className="text-white mx-3" size={20} style={{ cursor: 'pointer' }} />

                {/* 👤 Login Icon (Navigates to Login Page) */}
                <FaUser 
                  className="text-white mx-3" 
                  size={20} 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => router.push('/Login')} // Navigate to Login Page
                />
              </div>

              {/* 🔴 Order Now Button */}
              <Button variant="danger" className="ms-3 px-4 fw-bold">
                ORDER NOW
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
