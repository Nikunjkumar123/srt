"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductSlider.css"; // Import the updated CSS file
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://api.shrirattantraders.com/api/v1/product"
        );
        // console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else if (Array.isArray(response.data.products)) {
          setItems(response.data.products);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className="showcase-wrapper">
        <div className="container">
          <div className="text-center my-3">
            <h2 className="about-us-title">
              Our <span className="highlight">Products</span>
            </h2>
          </div>
          {/* <div className="row">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={item.id || item._id || index} className="col-md-3 mb-4">
                                    <div className="item-card p-3 text-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="item-image img-fluid"
                                        />
                                        <div className="item-details mt-2">
                                            <h5 className="item-title">{item.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-items text-center">No items available</p>
                        )}
                    </div> */}
          <div className="row">
            {items.length > 0 ? (
              items.map((product, index) => (
                <div
                  key={product.id || index}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <Link
                    href={`/pages/products/${product._id}`}
                    className="text-decoration-none"
                  >
                    <div className="product-bg text-center shadow-sm rounded p-3">
                      <div className="product-img rounded-top">
                        <Image
                          src={product.image || "/fallback-image.png"}
                          alt={product.name}
                          width={150}
                          height={200}
                          className="img-fluid"
                        />
                      </div>
                      <div className="product-card-body">
                        <h5 className="product-title">{product.name}</h5>
                        <p className="product-category">
                          {product.description}
                        </p>
                        <button className="btn btn-danger btn-sm">
                          Know More
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <div className="together-content"></div>
    </>
  );
};

export default Page;
