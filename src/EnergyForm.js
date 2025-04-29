import React, { useState } from "react";
import { db } from "./firebase"; // make sure you have firebase.js setup correctly
import { collection, addDoc } from "firebase/firestore";

const EnergyForm = () => {
  const [formData, setFormData] = useState({
    appliance: "",
    usageHours: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "energyUsage"), formData);
      alert("Energy data saved!");
      setFormData({ appliance: "", usageHours: "", date: "" });
    } catch (err) {
      alert("Error saving data: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Energy Usage Form</h2>
      <input
        type="text"
        name="appliance"
        placeholder="Appliance"
        value={formData.appliance}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="usageHours"
        placeholder="Usage Hours"
        value={formData.usageHours}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnergyForm;
