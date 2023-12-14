import React, { useState } from 'react';

const FilterBar = ({ tours, onFilter }) => {
  const [selectedTours, setSelectedTours] = useState([]);

  const handleFilter = (tour) => {
    if (selectedTours.includes(tour)) {
      setSelectedTours(selectedTours.filter(t => t !== tour));
    } else {
      setSelectedTours([...selectedTours, tour]);
    }
    onFilter(selectedTours);
  };

  return (
    <div>
      {tours.map(tour => (
        <div key={tour.id}>
          <input type="checkbox" id={tour.id} onChange={() => handleFilter(tour)} />
          <label htmlFor={tour.id}>{tour.name}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;