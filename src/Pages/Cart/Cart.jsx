import React, { useContext } from "react";
import { StoreContext } from "../../Components/Context/StoreContext";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
} from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    food_list,
    AddToCart,
    removeCart,
    getTotalCartAmount,
    getImageUrl,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const itemCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const handleDeleteItem = (itemId) => {
    const quantity = cartItems[itemId];
    for (let i = 0; i < quantity; i++) {
      removeCart(itemId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={28} className="text-gray-700" />
            Shopping Cart
            {itemCount > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-200">
                {food_list.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <div
                        key={item._id}
                        className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Info - Mobile: Full Width, Desktop: 6 cols */}
                          <div className="md:col-span-6 flex items-center gap-4">
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 md:hidden">
                                ₹{item.price}
                              </p>
                            </div>
                            {/* Mobile Delete Button */}
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="md:hidden p-2 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          {/* Price - Desktop Only */}
                          <div className="hidden md:block md:col-span-2 text-center">
                            <span className="text-gray-900 font-medium">
                              ₹{item.price}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                            <span className="text-sm text-gray-600 md:hidden">
                              Quantity:
                            </span>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <button
                                onClick={() => removeCart(item._id)}
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} className="text-gray-600" />
                              </button>
                              <span className="w-8 sm:w-10 text-center font-medium text-gray-900">
                                {cartItems[item._id]}
                              </span>
                              <button
                                onClick={() => AddToCart(item._id)}
                                className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} className="text-gray-600" />
                              </button>
                              {/* Desktop Delete Button */}
                              <button
                                onClick={() => handleDeleteItem(item._id)}
                                className="cursor-pointer hidden md:block ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Total Price */}
                          <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                            <span className="text-sm text-gray-600 md:hidden">
                              Subtotal:
                            </span>
                            <span className="font-semibold text-gray-900">
                              ₹{item.price * cartItems[item._id]}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Empty State */}
              {subtotal === 0 && (
                <div className="px-6 py-16 text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start adding items to your cart
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium text-gray-900">
                      ₹{deliveryFee}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        ₹{subtotal + deliveryFee}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={subtotal === 0}
                  onClick={() => navigate("/order")}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed duration-300 transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Promo Code */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button className="cursor-pointer px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
