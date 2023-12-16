import React, { useState } from 'react';
import axios from 'axios';

function FilterSalesReport() {
  const [medicineName, setMedicineName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredSales, setFilteredSales] = useState([]);
  const [error, setError] = useState(null);

  const handleMedicineNameChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterSales = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/filtersales`, {
        medicine: medicineName,
        startDate,
        endDate,
      });

      setFilteredSales(response.data.filteredSales);
      setError(null);
    } catch (error) {
      console.error('Error fetching filtered sales data:', error);
      setFilteredSales([]);
      setError('Error fetching filtered sales data');
    }
  };

  return (
    <div>
      <h3>Filter Sales Report</h3>
      <div>
        <label htmlFor="medicineName">Medicine Name:</label>
        <input type="text" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} />
      </div>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
      </div>
      <button onClick={handleFilterSales}>Filter Sales</button>
      {filteredSales.length === 0 && <p>No filtered sales data found.</p>}
      <ul>
        {filteredSales.map((sale, index) => (
          <li key={index}>
            <p>Medicine: {sale.medicine}</p>
            <p>Quantity Sold: {sale.quantitySold}</p>
            <p>Total Amount: {sale.totalAmount}</p>
            <p>Sale Date: {new Date(sale.saleDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default FilterSalesReport;
