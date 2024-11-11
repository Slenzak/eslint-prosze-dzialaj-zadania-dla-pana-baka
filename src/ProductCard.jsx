import React from "react";
import "./App.css";

const ProductCard = ({ name, price, genre, activibility, imageSrc, addToCart }) => {
  return (
    <div className="bg-blue-300 shadow-lg rounded-lg p-4 max-w-sm">
      <img className="w-full h-96 object-cover rounded-t-lg" src={imageSrc} alt={name} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-1"> {genre}</p>
        <p className="text-gray-600 mb-1">Dostepnosc: {activibility}</p>
        <p className="text-xl font-semibold mt-4">{price} zł</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={()=> addToCart({
          name,price,activibility,imageSrc
        })}>Kup</button>
      </div>
    </div>
  );
};

export default ProductCard;
