import React from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

function Contact() {
  const openWhatsApp = () => {
    const phoneNumber = "9716159710"; // your number
    const message = "Hello! I want to order food";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };
  return (
    <>
      <hr className="mt-15 mx-15" />
      <div
        className="w-full bg-gradient-to-b from-white via-orange-50 to-white px-5 relative overflow-hidden"
        id="contact"
      >
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* HERO */}
        <section className="text-center py-16 px-6 relative">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
              Let's Connect
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
            We're here to serve you the best. Reach out for orders, queries, or
            just to say hello!
          </p>
        </section>

        {/* CONTACT CARDS */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Phone Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Mon-Sun, 10 AM - 11 PM</p>
              <a
                href="#"
                className="text-orange-500 font-semibold text-lg hover:text-orange-600 transition-colors"
              >
                +91 9716159710
              </a>
            </div>

            {/* Email Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">Quick response within 24hrs</p>
              <a
                href="mailto:support@spicedrama.com"
                className="text-orange-500 font-semibold text-lg hover:text-orange-600 transition-colors break-all"
              >
                support@spicedrama.com
              </a>
            </div>

            {/* Location Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-4">Cloud Kitchen Location</p>
              <p className="text-orange-500 font-semibold">
                Spice Drama Resturant,
                <br />
                Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Large Info Banner */}
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-3xl p-10 md:p-12 text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Order?
                </h2>
                <p className="text-orange-100 text-lg mb-6">
                  Fresh, hygienic, and delicious food delivered straight to your
                  doorstep. Experience the Spice Drama difference today!
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={openWhatsApp}
                    className="bg-white text-orange-600 md:px-4 md:py-2 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Chat Now
                  </button>
                  <a
                    href="mailto:support@spicedrama.com"
                    className="bg-white/20 backdrop-blur text-white border-2 md:px-4 md:py-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-orange-200" />
                    <div>
                      <p className="font-semibold text-lg">Operating Hours</p>
                      <p className="text-orange-100">Monday - Sunday</p>
                      <p className="text-orange-100">10:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4">
                    <MessageCircle className="w-6 h-6 text-orange-200" />
                    <div>
                      <p className="font-semibold text-lg">Quick Support</p>
                      <p className="text-orange-100">Available on WhatsApp</p>
                      <p className="text-orange-100">Response within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-4xl font-bold text-orange-500 mb-2">1000+</p>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-4xl font-bold text-orange-500 mb-2">500+</p>
              <p className="text-gray-600 font-medium">Daily Orders</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-4xl font-bold text-orange-500 mb-2">4.8★</p>
              <p className="text-gray-600 font-medium">Average Rating</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-4xl font-bold text-orange-500 mb-2">
                30 - 40 min
              </p>
              <p className="text-gray-600 font-medium">Delivery Time</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
