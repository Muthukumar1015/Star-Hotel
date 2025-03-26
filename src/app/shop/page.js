"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterProducts } from "@/app/store/productsSlice";
import { addToCart } from "@/app/store/cartSlice"; // Import Add to Cart action
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaSearch, FaStar, FaTh, FaList, FaShoppingCart } from "react-icons/fa";
import styles from "@/app/shop/shop.module.css";

export default function Shop() {
  const dispatch = useDispatch();
  const { products, filteredProducts } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(filterProducts({ searchQuery, selectedCategory, priceRange }));
  }, [searchQuery, selectedCategory, priceRange, dispatch]);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // 🛒 Add to Cart Function
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`🛒 ${product.name} added to cart!`);
  };

  return (
    <Container className="mt-4">
      {/* 🔍 Search Bar */}
      <Row>
        <Col md={12} className="mb-3">
          <div className="d-flex align-items-center border rounded p-2 bg-light">
            <FaSearch className="me-2" />
            <input
              type="text"
              placeholder="Search here..."
              className="form-control border-0 bg-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Col>
      </Row>

      <Row>
        {/* 🎯 Sidebar Filters */}
        <Col md={3}>
          <div className="mb-4">
            <h5 className="fw-bold">Categories</h5>
            {["Chicken", "Cocktail", "Drink"].map((category) => (
              <Form.Check
                key={category}
                type="radio"
                label={category}
                name="category"
                className="mb-2"
                onChange={() => setSelectedCategory(category)}
              />
            ))}
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">Filter By Price</h5>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              className="form-range"
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <p>Price: ${priceRange[0]} - ${priceRange[1]}</p>
          </div>
        </Col>

        {/* 🛍 Product Grid/List */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Select
              onChange={(e) => setSortOption(e.target.value)}
              className="w-auto"
            >
              <option value="">Default Sorting</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </Form.Select>

            <div className="d-flex">
              <FaTh
                className={`${styles.toggleIcon} ${
                  viewMode === "grid" ? styles.active : ""
                }`}
                onClick={() => setViewMode("grid")}
              />
              <FaList
                className={`${styles.toggleIcon} ${
                  viewMode === "list" ? styles.active : ""
                }`}
                onClick={() => setViewMode("list")}
              />
            </div>
          </div>

          <Row className={viewMode === "list" ? "flex-column" : ""}>
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <Col md={6} lg={4} xl={3} key={product.id} className="mb-4">
                  <Card className={`shadow-sm ${styles.productCard} ${styles[viewMode]}`}>
                    <div className={styles.productImgContainer}>
                      <Card.Img variant="top" src={product.image} className={styles.productImg} />
                    </div>
                    <Card.Body className={viewMode === "list" ? "d-flex align-items-center" : ""}>
                      <div className={viewMode === "list" ? styles.textContent : ""}>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text className="fw-bold text-danger">${product.price.toFixed(2)}</Card.Text>
                        <div className="mb-2">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color={index < product.rating ? "gold" : "gray"} />
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        className={`cart-button ${viewMode === "list" ? "ms-auto" : ""}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center fw-bold">No products found.</p>
            )}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "danger" : "light"}
                onClick={() => setCurrentPage(index + 1)}
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
