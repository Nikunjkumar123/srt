"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./header.css";
import icon1 from "../../images/facebook.png";
import icon2 from "../../images/whatsapp.png";
import icon3 from "../../images/instagram.png";
import logo from "../../images/headerLogo.png";
import axios from "axios";
import { useRouter } from "next/navigation"; // For navigation in Next.js 13+

const Header = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Fetch categories from API
  useEffect(() => {
    const getCate = async () => {
      try {
        const response = await axios.get(
          "https://api.shrirattantraders.com/api/v1/category"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCate();
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/pages/about-us" },
    {
      name: "Products",
      subcategories: data.map((category) => ({
        name: category.name,
        id: category._id, // Store ID
      })),
    },
    { name: "CONTACT US", path: "/pages/contact-us" },
  ];

  // Function to handle category selection
  const handleCategoryClick = (categoryId) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCategoryId", categoryId); // Store in local storage
      router.push(`/pages/category/${categoryId}`);
      setIsOpen(false); // Close dropdown on selection
    }
  };

  return (
    <>
      <div className="nav-top w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-6">
              <div className="header-details">
                <p>
                  <i className="bi bi-envelope"></i>&nbsp;
                  <a href="mailto:srtlubricants@gmail.com">
                    srtlubricants@gmail.com
                  </a>
                </p>
                <p>
                  <i className="bi bi-telephone-outbound"></i> &nbsp;
                  <a href="tel:+919711851277">+91-9711851277</a>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="float-social">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/CaltexLubricantsIN"
                      target="_blank"
                    >
                      <Image src={icon1} alt="social-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/919711851277"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image src={icon2} alt="social-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/CaltexIndia" target="_blank">
                      <Image src={icon3} alt="social-icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image src={logo} alt="Logo" className="navbar-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="bi bi-list text-dark"></i>
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            style={{ flexGrow: "0" }}
          >
            <ul className="navbar-nav">
              {menuItems.map((item, index) => (
                <li
                  className={`nav-item ${item.subcategories ? "dropdown" : ""}`}
                  key={index}
                >
                  {item.subcategories ? (
                    <>
                      <span
                        className="nav-link dropdown-toggle"
                        id={`navbarDropdown-${index}`}
                        role="button"
                      >
                        {item.name}
                      </span>
                      <ul className="dropdown-menu">
                        {item.subcategories.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <span
                              className="dropdown-item"
                              onClick={() => handleCategoryClick(sub.id)}
                            >
                              {sub.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      className="nav-link"
                      href={item.path}
                      onClick={() => setIsOpen(false)} // Close on link click
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
