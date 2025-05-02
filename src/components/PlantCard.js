import React, { useState } from "react";
import InStockButton from "./InStockButton";
import OutOfStockButton from "./OutOfStockButton";
import SoldOutButton from "./SoldOutButton";

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

      <div>
        {inStock ? (
          <OutOfStockButton onClick={() => toggleStock(id)} disabled={!inStock} />
        ) : (
          <>
            <InStockButton onClick={() => toggleStock(id)} disabled={inStock} />
            <SoldOutButton />
          </>
        )}
      </div>
    </li>
  );
}

export default PlantCard;