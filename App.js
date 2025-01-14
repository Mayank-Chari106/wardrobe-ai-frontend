
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [outfit, setOutfit] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!file) return alert('Please select an image');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://your-backend-url.onrender.com/upload', formData);
      alert('Image uploaded and classified: ' + JSON.stringify(response.data));
    } catch (error) {
      alert('Error uploading image');
    }
  };

  const getOutfitSuggestion = async () => {
    try {
      const response = await axios.get('https://your-backend-url.onrender.com/suggest_outfit');
      setOutfit(response.data);
    } catch (error) {
      alert('Error fetching outfit suggestion');
    }
  };

  return (
    <div className="App">
      <h1>Wardrobe AI</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
      <button onClick={getOutfitSuggestion}>Get Outfit Suggestion</button>

      {outfit && (
        <div>
          <h2>Suggested Outfit:</h2>
          <p>Top: {outfit.top}</p>
          <p>Bottom: {outfit.bottom}</p>
          <p>Shoes: {outfit.shoes}</p>
        </div>
      )}
    </div>
  );
}

export default App;
