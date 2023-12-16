import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PharmacistViewSales() {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    // Fetch sales data when the component mounts
    fetchSalesData();
  }, [year, month]);

  const fetchSalesData = async () => {
    try {
      // Fetch sales data from the server for the specified month and year
      const response = await axios.get(`http://localhost:5000/pharmacistViewSales?year=${year}&month=${month}`);

      // Set the sales data from the response data
      setSalesData(response.data.monthlySales);

      // Calculate total sales
      const total = response.data.monthlySales.reduce((acc, sale) => acc + sale.totalAmount, 0);
      setTotalSales(total);

      console.log('Sales data retrieved successfully');
    } catch (error) {
      console.error('Error fetching sales data:', error);
      setError('Error fetching sales data');
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div>
      <h3>Monthly Sales Data</h3>
      <div>
        <label htmlFor="year">Year:</label>
        <input type="number" id="year" value={year} onChange={handleYearChange} />
      </div>
      <div>
        <label htmlFor="month">Month:</label>
        <input type="number" id="month" value={month} onChange={handleMonthChange} />
      </div>
      <button onClick={fetchSalesData}>Fetch Sales Data</button>
      <p>Total Sales: {totalSales}</p>
      {salesData.length === 0 && <p>No sales data found.</p>}
      <ul>
        {salesData.map((sale, index) => (
          <li key={index}>
            <p>Medicine: {sale.medicine.name}</p>
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

export default PharmacistViewSales;
