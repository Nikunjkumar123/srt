"use client"; // Ensure client-side rendering

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Correct import for App Router
// import "../../product.css";
import "../../products/product.css";
import Breadcrumb from "../../../component/BreadCrumb/page";
import axios from "axios";

const Page = () => {
  const { category } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  //   const getData = async () => {
  //     try {
  //       setLoading(true);
  //       if (typeof window !== "undefined") {
  //         const categoryId = localStorage.getItem("selectedCategoryId");

  //         if (!categoryId) {
  //           setError("No category selected.");
  //           setLoading(false);
  //           return;
  //         }

  //         const response = await axios.get(
  //           `https://api.shrirattantraders.com/api/v1/product/${categoryId}`
  //         );
  //         setProducts(response.data);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setError("Failed to fetch products.");
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const storedCategoryId = localStorage.getItem("selectedCategoryId");
  //       if (storedCategoryId) {
  //         setSelectedCategoryId(storedCategoryId);
  //       } else {
  //         setError("No category selected.");
  //         setLoading(false);
  //       }
  //     }
  //   }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.shrirattantraders.com/api/v1/product/${category}`
      );
      // console.log("response",response);

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, [category]);

  //67c83128fd5bba05a3f0e1d4
  //67c830a2fd5bba05a3f0e1c9
  return (
    <>
      <Breadcrumb title="All Products" />

      <div className="container my-5">
        <h2 className="text-center text-danger">Products</h2>
        <p className="text-center">
          Our premium bike engine oils help maintain engine health, reduce
          friction, and enhance performance.
        </p>

        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => (
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
                      <p className="product-category">{product.description}</p>
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
    </>
  );
};

export default Page;
