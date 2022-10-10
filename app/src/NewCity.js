import { useState } from "react";

const NewCity = ({ handleNewCity }) => {
  const [newCity, setNewCity] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex-container gutter-xl ">
        <label>City:</label>
        <input
          name="city_label"
          style={{ marginBottom: "10px" }}
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <label>Country:</label>
        <input
          name="country"
          style={{ marginBottom: "10px" }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          style={{ marginBottom: "10px" }}
          onClick={() =>
            handleNewCity({ city_label: newCity, country: country })
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NewCity;
