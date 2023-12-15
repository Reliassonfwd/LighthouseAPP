import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  // Component State
  const [tours, setTours] = useState([]);        // List of tours
  const [selectedTour, setSelectedTour] = useState(null);  // Currently selected tour
  const [selectedFile, setSelectedFile] = useState(null);  // Selected image file

  // Fetches the list of tours from the server on component mount.
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tours')
      .then(response => {
        setTours(response.data);
        if (response.data.length > 0) {
          setSelectedTour(response.data[0].id);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handles the change event when the selected tour is changed.
  const onTourChange = event => {
    setSelectedTour(event.target.value);
  };

  // Handles the change event when an image file is selected.
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles the file upload process.
  const onFileUpload = () => {
    // Create FormData object and append selected file
    const formData = new FormData();
    formData.append('image', selectedFile);

    // Make a POST request to upload the image to the selected tour
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

  // Render:
  // - Renders a file input for selecting an image file.
  // - Renders a dropdown to select a tour.
  // - Renders a button to initiate the file upload.
  return (
    <>
      <center>
        <div>
          {/* Input for selecting an image file */}
          <input type="file" onChange={onFileChange} />
          <br />

          {/* Dropdown for selecting a tour */}
          <select onChange={onTourChange}>
            {tours.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
          <br />
          <br />

          {/* Button to initiate the file upload */}
          <button onClick={onFileUpload}>Upload</button>
        </div>
      </center>
    </>
  );
};

// Export:
// - Exports the ImageUpload component as the default export.
export default ImageUpload;
