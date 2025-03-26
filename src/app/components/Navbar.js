"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button, Form, FormControl, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaSearch, FaClock, FaBars, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CustomNavbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery.trim()}`);
    }
  };

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
              {["Home", "About Us", "Shop", "Blog", "Contact Us"].map((item, index) => (
                <Nav.Link
                  key={index}
                  href={`/${item.toLowerCase().replace(/\s/g, "")}`}
                  className="fw-semibold"
                >
                  {item}
                </Nav.Link>
              ))}

              {/* 📌 Pages Dropdown with Click Event (All items in One Line) */}
              <NavDropdown title="Pages" id="pages-dropdown">
                <div className="d-flex flex-wrap px-3">
                  {[
                    { name: "Chef", path: "/chef" },
                    { name: "Food Menu", path: "/food-menu" },
                    { name: "Gallery", path: "/gallery" },
                    { name: "Testimonials", path: "/services/testimonials" },
                    { name: "Reservation", path: "/services/reservation" },
                    { name: "FAQs", path: "/services/faqs" },
                    { name: "My Account", path: "/my-account" },
                    { name: "404 Page", path: "/404" },
                  ].map((item, index) => (
                    <NavDropdown.Item key={index} href={item.path} className="me-3">
                      {item.name}
                    </NavDropdown.Item>
                  ))}
                </div>
              </NavDropdown>
            </Nav>

            {/* 🔎 Search Box */}
            <Form className="d-flex mx-3" onSubmit={handleSearch}>
              <FormControl
                type="text"
                placeholder="Search..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                <FaSearch />
              </Button>
            </Form>

            {/* 🛒 Right Icons */}
            <div className="d-flex align-items-center">
              <FaShoppingCart className="text-white mx-3" size={20} style={{ cursor: "pointer" }} />

              {/* 👤 Login Icon */}
              <FaUser 
                className="text-white mx-3" 
                size={20} 
                style={{ cursor: "pointer" }} 
                onClick={() => router.push("/Login")} 
              />

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
