import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios'u içe aktardık
import { HEALTH_LOGS_URL } from '../apiConfig'; // HEALTH_LOGS_URL'i içe aktardık

const HealthForm = ({ onLogSubmitted, logToEdit, setLogToEdit }) => {
  const [weight, setWeight] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [exercise, setExercise] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (logToEdit) {
      setWeight(logToEdit.weight);
      setWaterIntake(logToEdit.waterIntake);
      setExercise(logToEdit.exercise);
    } else {
      setWeight("");
      setWaterIntake("");
      setExercise("");
    }
  }, [logToEdit]);

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    try {
      if (logToEdit) {
        // Güncelleme isteği
        await axios.put(`${HEALTH_LOGS_URL}/${logToEdit._id}`, { // `_id` kullanın
          weight: Number(weight),          // Sayısal değer olmalı
          waterIntake: Number(waterIntake),// Sayısal değer olmalı
          exercise,                        // String olabilir
        });
      } else {
        // Yeni kayıt
        await axios.post(HEALTH_LOGS_URL, {
          date: today,
          weight: Number(weight),          // Sayısal değer olmalı
          waterIntake: Number(waterIntake),// Sayısal değer olmalı
          exercise,                        // String olabilir
        });
      }

      setError("");
      onLogSubmitted(); // Güncellenen logları yeniden yükle
      setWeight("");
      setWaterIntake("");
      setExercise("");
      setLogToEdit(null); // Güncelleme sonrası formu sıfırla
    }catch (err) {
        console.error("Error updating log:", err); // Hata detaylarını kontrol edin
        console.error("Error response:", err.response); // Hata yanıtını kontrol et
        setError(err.response?.data?.message || "An unknown error occurred.");
      }
      
  };
  
  return (
    <form onSubmit={handleLogSubmit} className="health-form">
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Water Intake (L)"
        value={waterIntake}
        onChange={(e) => setWaterIntake(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Exercise (mins)"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
      <button type="submit">{logToEdit ? "Update Log" : "Log Today’s Data"}</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default HealthForm;
