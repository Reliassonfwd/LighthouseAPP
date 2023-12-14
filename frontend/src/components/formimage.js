import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tours')
      .then(response => {
        setTours(response.data);
        if (response.data.length > 0) {
          setSelectedTour(response.data[0].id);
        }
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }, []);

  const onTourChange = event => {
    setSelectedTour(event.target.value);
  };

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    axios.post(`http://localhost:3001/api/v1/tours/${selectedTour}/add_image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <>
      <center>
        <div>

          <input type="file" onChange={onFileChange} />
          <br />
          <select onChange={onTourChange}>
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
          <br />
          <br />
          <button onClick={onFileUpload}>Upload</button>
        </div>
      </center>
    </>
  );
};

export default ImageUpload;