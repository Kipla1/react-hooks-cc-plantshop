import React, { useState } from "react";

function PlantCard({ plant, toggleStock, updatePrice, deletePlant }) {
  const { id, name, image, price, inStock = true } = plant;
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price);
  
  const handlePriceUpdate = () => {
    updatePrice(id, newPrice);
    setIsEditing(false);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      
      {isEditing ? (
        <div>
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handlePriceUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Price: {price}</p>
          {updatePrice && (
            <button onClick={() => setIsEditing(true)}>Edit Price</button>
          )}
          {deletePlant && (
            <button onClick={() => deletePlant(id)}>Delete</button>
          )}
        </div>
      )}
      
      {inStock ? (
        <button className="primary" onClick={() => toggleStock(id)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => toggleStock(id)}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;