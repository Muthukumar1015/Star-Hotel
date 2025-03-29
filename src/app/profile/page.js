"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, logout } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import { Button, Image } from "react-bootstrap";
import { FaCamera, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "N/A",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const savedProfileImage = typeof window !== "undefined"
    ? localStorage.getItem(`profileImage_${user?.email}`) || "/images/default-avatar.png"
    : "/images/default-avatar.png";

  const [profileImage, setProfileImage] = useState(savedProfileImage);

  useEffect(() => {
    if (user?.email) {
      const storedImage = localStorage.getItem(`profileImage_${user.email}`);
      if (storedImage) {
        setProfileImage(storedImage);
      }
    }
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <h3>Please log in to view your profile.</h3>
        <Button variant="primary" onClick={() => router.push("/Login")}>Go to Login</Button>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ ...formData, profileImage }));
    localStorage.setItem(`profileImage_${user.email}`, profileImage);
    alert("Profile updated successfully!");
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
        localStorage.setItem(`profileImage_${user.email}`, imageURL);
        dispatch(updateProfile({ ...formData, profileImage: imageURL }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Image */}
        <div className="profile-image-container">
          <Image src={profileImage} alt="Profile" className="profile-image" />
        </div>

        {/* Camera Icon (Outside the Profile Image) */}
        <div className="upload-icon-container">
          <label className="upload-icon">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* User Info */}
        <h3 className="profile-name">{user.name}</h3>

        <div className="profile-details">
          <p><strong>📅 Age:</strong> {formData.age}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>📞 Phone:</strong> {user.phone}</p>
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
        </div>

        {/* Buttons */}
        <Button variant="primary" className="update-button" onClick={handleUpdate}>Update Profile</Button>
        <Button variant="danger" className="logout-button" onClick={handleLogout}>Logout</Button>
      </div>

      {/* ✅ Internal CSS for Correct Camera Icon Positioning */}
      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, rgb(133, 133, 133), rgb(117, 112, 122));
          padding: 20px;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
          text-align: center;
          width: 100%;
          max-width: 400px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .profile-image-container {
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          overflow: hidden;
          background: white;
          margin: 0 auto 15px auto;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ✅ Camera Icon is Fully Outside the Profile Image */
        .upload-icon-container {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .upload-icon {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px;
          border-radius: 50%;
          border: 2px solid white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, transform 0.3s;
        }

        .upload-icon:hover {
          background: rgba(0, 0, 0, 1);
          transform: scale(1.1);
        }

        .upload-icon input {
          display: none;
        }

        .profile-name {
          font-size: 26px;
          font-weight: bold;
          color: white;
          margin-bottom: 5px;
        }

        .profile-details {
          text-align: left;
          padding: 10px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 20px;
          color: white;
        }

        .profile-details p {
          font-size: 16px;
          margin: 5px 0;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 15px;
          font-size: 24px;
          color: white;
          margin-bottom: 20px;
        }

        .social-icons svg {
          cursor: pointer;
          transition: transform 0.2s, color 0.3s;
        }

        .social-icons svg:hover {
          transform: scale(1.2);
          color: #f5f5f5;
        }

        .update-button {
          background: #22c1c3;
          border: none;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          margin-bottom: 10px;
          transition: background 0.3s;
        }

        .update-button:hover {
          background: #1b9aaa;
        }

        .logout-button {
          background: #ff6b6b;
          border: none;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          transition: background 0.3s;
        }

        .logout-button:hover {
          background: #ff4f4f;
        }

        @media (max-width: 768px) {
          .profile-card {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
