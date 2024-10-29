import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../apiConfig';

function NewCardForm() {
  const [cards, setCards] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Yeni URL state'i
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Hata durumu için state
  const [isEditing, setIsEditing] = useState(false); // Edit durumunu tutacak state
  const [currentCardId, setCurrentCardId] = useState(null); // Güncellenen kartın ID'si

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await axios.get(API_URL);
    setCards(response.data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
      setImageUrl(""); // Dosya seçildiğinde URL'yi sıfırla
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // En az bir resim kaynağı olmasını sağla
    if (!image && !imageUrl) {
      setError("Lütfen bir dosya seçiniz veya bir URL giriniz.");
      return;
    }

    setError(""); // Hata durumunu sıfırla
    const newCard = { image: imageUrl || image, title, description }; // URL varsa, onu kullan

    if (isEditing) {
      // Eğer düzenleme modundaysak güncelle
      await axios.put(`${API_URL}/${currentCardId}`, newCard);
      setCards(cards.map(card => (card._id === currentCardId ? newCard : card))); // Kart listesini güncelle
      setIsEditing(false); // Düzenleme modunu kapat
      setCurrentCardId(null); // Güncellenen kartın ID'sini sıfırla
    } else {
      // Yeni kart ekle
      await axios.post(API_URL, newCard);
      setCards([...cards, newCard]);
    }

    // Formu sıfırla
    setImage("");
    setImageUrl(""); // URL alanını sıfırla
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`${API_URL}/${cardId}`);
      fetchCards(); // Başarı durumunda kartları yeniden yükler
    } catch (error) {
      console.error('Error deleting card:', error); // Hata çıktısını göster
      setError("Kart silinirken bir hata oluştu."); // Hata mesajını kullanıcıya göster
    }
  };

  const handleEdit = (card) => {
    setImage(card.image); // Seçilen kartın resmini ayarla
    setImageUrl(""); // URL'yi sıfırla
    setTitle(card.title); // Kart başlığını ayarla
    setDescription(card.description); // Kart açıklamasını ayarla
    setIsEditing(true); // Düzenleme modunu aç
    setCurrentCardId(card._id); // Güncellenen kartın ID'sini ayarla
  };

  return (
    <div className="container" >
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-md-4 mb-4 d-flex justify-content-center align-items-center" >
            <div className="card custom-card"style={{ marginBottom: '16px' }}>
              <img src={card.image} alt={card.title} className="card-img-top" />
              <div className="d-flex justify-content-center align-items-center" 
          style={{ height: '100px' }}>
                <h5 className="card-title text-center">{card.title}</h5>
                <div className="card-overlay">
                  <p className="card-text">{card.description}</p>
                  <div className="d-flex justify-content-between">
                  <button className="custom-btn" onClick={() => handleDelete(card._id)}>Delete</button>
                  <button className="custom-btn" onClick={() => handleEdit(card)}>Update</button> 
                </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-4 mb-4 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit} className="card p-3" style={{ width: '250px', height:'350px', }}>
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} 
              />
              Show Me What I’ve Got!
            </label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Pinterest Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit" className="custom-btn">
              {isEditing ? "Update Card" : "Add Card"} 
            </button>
            {error && <p className="custom-btn">{error}</p>} 
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCardForm;
