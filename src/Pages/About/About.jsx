import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

const About = () => {
  return (
    <>
      <div className=" bg-gradient-to-b from-orange-50 to-white text-gray-800 overflow-hidden px-5 md:px-10">
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[80vh] flex items-center">
          <img
            src="./about-img.jpg"
            alt="Spice Drama Food"
            className="absolute inset-0 w-full h-full object-cover rounded"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-center text-white px-6"
          >
            <h1 className="text-4xl md:text-6xl px-10 font-bold mb-4 text-justify">
              Where Every Bite <br /> Tells a Story
            </h1>
            <p className="text-lg  md:text-lg px-10 py-5 text-gray-200 max-w-3xl mx-auto text-justify">
              Welcome to{" "}
              <span className="text-orange-400 font-semibold">Spice Drama</span>
              , a cloud kitchen crafted for bold flavors, unforgettable aromas,
              and food that creates drama on your taste buds.
            </p>
          </motion.div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Cooking"
              className="rounded-3xl shadow-xl"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Story 🍲</h2>
              <p className="text-gray-600 leading-relaxed">
                Spice Drama was born from a simple idea — **great food doesn’t
                need a fancy dining room, it needs soul.**
                <br />
                <br />
                As a cloud kitchen, we focus on what truly matters: fresh
                ingredients, authentic spices, and recipes that deliver
                restaurant-quality taste straight to your doorstep.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="bg-orange-100 py-20 px-6 md:px-20">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Spice Drama? 🔥
          </motion.h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Bold Flavors",
                desc: "Every dish is crafted with hand-picked spices to create unforgettable taste.",
              },
              {
                title: "Cloud Kitchen Fresh",
                desc: "No compromise on hygiene, freshness, and quality — only made-to-order food.",
              },
              {
                title: "Fast Delivery",
                desc: "Straight from our kitchen to your door, hot and full of drama.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3 text-orange-500">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="relative py-20 text-center text-white">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>

          <motion.div
            className="relative z-10 px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Some Drama on Your Plate?
            </h2>
            <p className="text-gray-200 mb-6">
              Order now and experience flavors that speak louder than words.
            </p>
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition"
            >
              Order Now 🍽️
            </Link>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
