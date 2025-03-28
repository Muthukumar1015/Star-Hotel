"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { Container, Button, Form, Card, Alert, Image } from "react-bootstrap";
import { FaUserEdit, FaCamera, FaSignOutAlt } from "react-icons/fa";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [profileImage, setProfileImage] = useState(user?.profileImage || "/images/default-avatar.png");
  const [message, setMessage] = useState(null);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">Please log in to view your profile.</Alert>
        <Button variant="primary" onClick={() => router.push("/Login")}>Go to Login</Button>
      </Container>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...formData, profileImage }));
    setMessage("Profile updated successfully!");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/Login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageURL = reader.result;
        setProfileImage(imageURL);
        dispatch(updateProfile({ ...formData, profileImage: imageURL })); // Save to Redux
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        {/* Profile Image & Upload Button */}
        <div className="profile-image-container">
          <Image src={profileImage} alt="Profile" className="profile-image" />
          <label className="upload-icon">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* User Details */}
        <Card.Body>
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-email">{user.email}</p>
          <p className="profile-phone"><strong>Phone:</strong> {user.phone}</p>
          <p className="profile-dob"><strong>DOB:</strong> {user.dob}</p>

          {/* Update Profile Form */}
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100"><FaUserEdit /> Update Profile</Button>
          </Form>

          {/* Logout Button */}
          <Button variant="danger" className="w-100 mt-3" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </Button>

          {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        </Card.Body>
      </Card>

      {/* ✅ Styles */}
      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #ff7e5f, #feb47b);
        }

        .profile-card {
          width: 400px;
          padding: 20px;
          border-radius: 15px;
          background: white;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .profile-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #ff7e5f;
        }

        .upload-icon {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: white;
          color: #ff7e5f;
          padding: 10px;
          border-radius: 50%;
          border: 2px solid #ff7e5f;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-icon input {
          display: none;
        }

        .profile-name {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }

        .profile-email {
          font-size: 14px;
          color: #666;
        }

        .profile-phone, .profile-dob {
          font-size: 16px;
          margin-top: 5px;
        }

        button {
          transition: 0.3s;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </Container>
  );
}
