import React from "react";

function InStockButton({ onClick, disabled }) {
  return (
    <button className="secondary" onClick={onClick} disabled={disabled}>
      In Stock
    </button>
  );
}

export default InStockButton;