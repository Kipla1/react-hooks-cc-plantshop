import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);


const addPlant = (newPlant) => {
  return fetch("http://localhost:6001/plants", {
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(newPlant),
  })
    .then((response) => response.json())
    .then((data) => {
      setPlants([...plants, data]);
      return data; 
    });
};

  const toggleStock = (plantId) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === plantId) {
        return { ...plant, inStock: !plant.inStock };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const updatePrice = (plantId, newPrice) => {
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        const updatedPlants = plants.map((plant) =>
          plant.id === plantId ? updatedPlant : plant
        );
        setPlants(updatedPlants);
      });
  };

  const deletePlant = (plantId) => {
    fetch(`http://localhost:6001/plants/${plantId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPlants = plants.filter((plant) => plant.id !== plantId);
        setPlants(updatedPlants);
      });
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList 
        plants={filteredPlants} 
        toggleStock={toggleStock} 
        updatePrice={updatePrice}
        deletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;