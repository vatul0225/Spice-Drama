import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list = [] } = useContext(StoreContext);

  // Default category only when NOT passed
  const activeCategory = category ? category : "Pizza";

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white" id="food-display">
      <h1 className="text-3xl mt-20 pt-10 mb-15 mx-20 justify-center flex">
        Top dishes near you
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5 justify-items-center ml-30 mr-30">
        {food_list.length === 0 ? (
          <p className="col-span-full text-gray-500 text-lg">
            No food items available
          </p>
        ) : (
          food_list
            .filter((item) => item?.category === activeCategory)
            .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
