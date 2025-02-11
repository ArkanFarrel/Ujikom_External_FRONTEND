import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Footer from "./Footer.jsx";
import PropertyCard from "./Propertycard.jsx";
import FeatureCard from "./Featurecard.jsx";
import gambar from "../img/logo-rku.png";
import { IoLogInSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

const handleScrollToTestimonial = () => {
  const testimonialSection = document.getElementById("testimonials");
  if (testimonialSection) {
    testimonialSection.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollToFeaturecard = () => {
  const featurecard = document.getElementById("featurecard");
  if (featurecard) {
    featurecard.scrollIntoView({ behavior: "smooth" });
  }
};
const handleScrollTolayanan = () => {
  const testimonialSection = document.getElementById("layanan");
  if (testimonialSection) {
    testimonialSection.scrollIntoView({ behavior: "smooth" });
  }
};

const featureCards = [
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/cari_agen_eec1886a8f/cari_agen_eec1886a8f.svg",
    title: "Cari Agen",
    onclick: handleScrollToTestimonial,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/iklankan_properti_5f17f9d285/iklankan_properti_5f17f9d285.svg",
    title: "Iklankan Properti",
    onclick: handleScrollToFeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/Jual_Propertimu_749b908321/Jual_Propertimu_749b908321.svg",
    title: "Jual Propertimu",
    onclick: handleScrollToFeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/carikan_properti_d35e238a07/carikan_properti_d35e238a07.svg",
    title: "Carikan Properti",
    onclick: handleScrollToFeaturecard,
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/simulasi_kpr_105d56534d/simulasi_kpr_105d56534d.svg",
    title: "Simulasi KPR",
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/pindah_kpr_cc6669f5e3/pindah_kpr_cc6669f5e3.svg",
    title: "Pindah KPR",
  },
  {
    icon: "https://storage.googleapis.com/seo-cms/assets/Aset_Bank_adbb8a7b78/Aset_Bank_adbb8a7b78.svg",
    title: "Aset Lelang Bank",
  },
  {
    icon: "https://storage.googleapis.com/core-asset/static/images/assets/quick-menu-others-icon.svg",
    title: "Lainnya",
    onclick: handleScrollTolayanan,
  },
];

const propertyData = [
  {
    price: "Rp 400 Juta",
    pricePeriod: "1 Jutaan per bulan",
    title: "Rumah Dan Kosan Tembalang Dekat Universitas",
    location: "Tembalang, Semarang",
    bedrooms: 2,
    bathrooms: 1,
    landSize: 60,
    buildingSize: 30,
  },
  {
    price: "Rp 1,65 Miliar",
    pricePeriod: "7 Jutaan per bulan",
    title: "Rumah Besar 4+1 Kamar Pilihan Keluarga",
    location: "Serpong Villa Melati Mas, Tangerang Selatan",
    bedrooms: 4,
    bathrooms: 2,
    landSize: 90,
    buildingSize: 120,
  },
  {
    price: "Rp 28 Juta per tahun",
    pricePeriod: "Sewa Tahunan",
    title: "Rumah Minimalis Dekat Pintu Tol Kukusan",
    location: "Kukusan, Depok",
    bedrooms: 2,
    bathrooms: 1,
    landSize: 62,
    buildingSize: 70,
  },
  {
    price: "Rp 548 Juta",
    pricePeriod: "2 Jutaan per bulan",
    title: "Cuma 500 Jutaan Dapat Rumah Cantik",
    location: "Tembalang, Semarang",
    bedrooms: 1,
    bathrooms: 1,
    landSize: 60,
    buildingSize: 36,
  },
];

const testimonials = [
  {
    name: "Danang Tri Wibowo",
    role: "Agen",
    feedback:
      "Rumah123 membantu saya mendapatkan leads dari customer dengan optimal. Dengan memanfaatkan Feature Listing, calon pembeli datang setiap harinya.",
  },
  {
    name: "Ananta Aji Wiguna",
    role: "Pembeli",
    feedback:
      "Situsnya bagus, membantu dalam memberikan informasi untuk mencari rumah khususnya bagi yang suka cari-cari informasi.",
  },
  {
    name: "Adeline Puspa",
    role: "Agen",
    feedback:
      "Saya mendapatkan lebih banyak buyer setelah mengiklankan properti di Rumah123. Interface Rumah123 memudahkan saya mengatur promosi listing dengan baik.",
  },
];

const Landingpage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img src={gambar} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex space-x-4">
                {["Home", "About us", "Dijual", "Disewakan"].map((item) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a
                    key={item}
                    href=""
                    className="text-gray-700 hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Tombol Login & Register */}
            <div className="flex space-x-4">
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                <IoLogInSharp className="text-lg" />
                <span>Login</span>
              </button>
              <button
                onClick={handleRegister}
                className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
              >
                <IoPerson className="text-lg" />
                <span>Register</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div id="featurecard" className="mt-24 flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-6xl px-4">
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              title={card.title}
              onClick={card.onclick}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mx-12">
          <h2 className="text-2xl font-bold text-gray-800">
            Rekomendasi Sesuai Pencarianmu
          </h2>
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
            Lihat Selengkapnya
          </button>
        </div>
        <div className="flex p-4 space-x-2">
          {propertyData.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>

      <div id="testimonials" className="bg-gray-100 py-10 mt-10">
        <h2 className="text-2xl font-bold text-center mb-7">
          Kata Mereka yang Sudah Menggunakan Layanan Rumahku
        </h2>
        <div className="flex justify-center flex-wrap space-x-4 px-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 max-w-xs min-w-[300px]"
            >
              <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              <p className="mt-2 text-gray-700">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <iframe
          title="Google Maps"
          width="100%"
          height="500"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=pamulang+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </div>

      <div
        id="layanan"
        className="bg-gray-50 rounded-lg shadow-md p-6 mx-auto w-full max-w-2xl my-10"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Layanan Pengaduan Konsumen
        </h2>

        <div className="space-y-4">
          <div className="text-gray-700">
            <h3 className="text-lg font-medium">
              PT Web Marketing Rumahku Indonesia
            </h3>
            <p>
              Email:{" "}
              <a href="kosong" className="text-blue-600 hover:underline">
                infopengaduan@rumahku.com
              </a>
            </p>
          </div>
          <div className="text-gray-700">
            <h3 className="text-lg font-medium">
              Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga (Ditjen
              PKTN)
            </h3>
            <p>
              WhatsApp Ditjen PKTN:{" "}
              <a href="kosong" className="text-blue-600 hover:underline">
                0812345678910
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landingpage;
