import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Base API URL (works for Render / Vercel etc)
  const rawUrl = import.meta.env.VITE_USER_API || "";
  const url = (() => {
    let base = String(rawUrl).trim().replace(/\/+$/, "");
    // Avoid mixed-content when frontend is on https but env is accidentally set to http
    if (typeof window !== "undefined" && window.location?.protocol === "https:") {
      base = base.replace(/^http:\/\//i, "https://");
    }
    return base;
  })();

  // Build a safe image URL from whatever is stored in DB (filename, /images/x, /uploads/x, full URL)
  const getImageUrl = (image) => {
    if (!image) return "";
    const val = String(image).trim();
    if (!val) return "";

    // Already absolute URL
    if (/^https?:\/\//i.test(val)) {
      if (typeof window !== "undefined" && window.location?.protocol === "https:") {
        return val.replace(/^http:\/\//i, "https://");
      }
      return val;
    }

    // Path stored with a leading slash
    if (val.startsWith("/images/") || val.startsWith("/uploads/")) return `${url}${val}`;

    // Some old data might have "images/xxx" or "uploads/xxx" without leading slash
    if (val.startsWith("images/") || val.startsWith("uploads/")) return `${url}/${val}`;

    // Default: treat as filename served from /images
    return `${url}/images/${val}`;
  };

  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  const AddToCart = async (itemID) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId: itemID },
        { headers: { token } },
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // fetch food_list from database
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } },
    );
    setCartItems(response.data.cartData);
  };

  // when we reload it not logout
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const removeCart = async (itemID) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId: itemID },
        { headers: { token } },
      );
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    AddToCart,
    removeCart,
    getTotalCartAmount,
    url,
    getImageUrl,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
