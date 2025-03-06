"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import productImage from "../../../images/product-image1.png";
import Breadcrumb from "../../../component/BreadCrumb/page";
import "../product.css";
import axios from "axios";

const Page = () => {
  const { productDetails } = useParams(); // Get dynamic route parameter
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details based on the dynamic route parameter
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.shrirattantraders.com/api/v1/product/sing/${productDetails}`
        );
        setProduct(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details.");
        setLoading(false);
      }
    };

    if (productDetails) {
      fetchProduct();
    }
  }, [productDetails]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-muted">Product not found.</p>;
  }

  return (
    <>
      <Breadcrumb title="All Products" product="Product" />
      <div className="container py-3">
        <div className="product-detail-heading">
          <h4 className="fw-bold text-danger">{product.name}</h4>
        </div>
        <div className="row">
          {/* Product Image */}
          <div className="col-md-4 text-center">
            <Image
              src={product.image || productImage} // Use fallback image if product.image is not available
              alt={product.name}
              width={200}
              height={300}
              className="img-fluid"
            />
          </div>

          {/* Product Details */}
          <div className="col-md-8">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="fw-bold">Brand</td>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Grade</td>
                  <td>{product.temp}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Type</td>
                  <td>{product.type}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Size</td>
                  <td>{product.use}</td>
                </tr>
                {/* <tr>
                  <td className="fw-bold product-price">Price</td>
                  <td className="fw-bold product-price">{product.price}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
