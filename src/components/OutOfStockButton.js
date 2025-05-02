import React from "react";

function OutOfStockButton({ onClick, disabled }) {
  return (
    <button className="primary" onClick={onClick} disabled={disabled}>
      Out of Stock
    </button>
  );
}

export default OutOfStockButton;