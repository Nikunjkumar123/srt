"use client";
import React from "react";
import Image from "next/image";
import banner from "../../images/banner.png";
import banner2 from "../../images/banner2.png";
import banner3 from "../../images/banner3.png";
import "./hero.css";

const Page = () => {
    return (
        <>
            <section className="hero-section">
                {/* Banner Section */}
                <div className="banner">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        {/* Carousel Indicators */}
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        {/* Carousel Items */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Image src={banner} className="d-block w-100" alt="Banner 1" priority  />
                            </div>
                            <div className="carousel-item">
                                <Image src={banner2} className="d-block w-100" alt="Banner 2"  />
                            </div>
                            <div className="carousel-item">
                                <Image src={banner3} className="d-block w-100" alt="Banner 3" />
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Hero About Section */}
                <section className="hero-about">
                    <div className="container">
                        <div className="heading-back">
                            <p>Engine Oil Distributors and Wholesalers</p>
                        </div>
                        <p className="hero-description">
                            Looking for a reliable engine oil wholesaler? We specialize in supplying
                            high-quality car and bike engine oils at the most competitive prices. Our extensive
                            range includes premium lubricants, synthetic and semi-synthetic oils, and high-performance
                            motor oils designed to enhance engine efficiency and longevity.
                        </p>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Page;
