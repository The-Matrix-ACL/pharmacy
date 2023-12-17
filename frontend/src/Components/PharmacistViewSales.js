import React, { useState, useEffect } from 'react';
import axios from 'axios';
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";


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
      const response = await axios.get(`http://localhost:8000/pharmacistViewSales?year=${year}&month=${month}`);

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
  <div className="PharmaPatientCheckWalletPage" style={{width: 1440, height: 1016, position: 'relative', background: 'white'}}>
  <div className="Botbar" style={{width: 1493, height: 131, left: -53, top: 927, position: 'absolute'}}>
    <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
    <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo}/>
    <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
  </div>
  <div className="Navbar" style={{width: 1683, height: 446, left: -243, top: -89, position: 'absolute'}}>
    <div className="Rectangle1" style={{width: 1440, height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
    <div className="Logo" style={{width: 1290, height: 446, left: 0, top: 0, position: 'absolute'}}>
      <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo}/>
      <div className="Pharmacy" style={{width: 618, height: 86, left: 672, top: 177, position: 'absolute', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Pharmacy</div>
      <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />
    </div>
    
    <a href="/pharmacist" className="Signup" style={{width: 163, height: 59, left: 1451, top: 177, position: 'absolute'}}>
        <div className="Rectangle4" style={{width: 160.55, height: 59, left: 2.45, top: 0, position: 'absolute', background: 'white', borderRadius: 18}} />
        <div className="SignUp" style={{width: 163, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Home</div>
      </a>
  </div>
  <div className="Btn" style={{width: 304, height: 59, left: 488, top: 568, position: 'absolute'}}>
    <div className="Rectangle4" style={{width: 303.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
    <button onClick={fetchSalesData} style={{width: 304, height: 59, left: 0, top: 0, position: 'absolute', background: '#4685FF',textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Fetch Sales Data</button>
  </div>
  <a href = "/filtersales" className="Btn" style={{width: 304, height: 59, left: 491, top: 662, position: 'absolute'}}>
    <div className="Rectangle4" style={{width: 303.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
    <div className="SignUp" style={{width: 304, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Filter Sales Data</div>
  </a>
  <div className="MonthlySalesReport" style={{width: 663, height: 47, left: 56, top: 222, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Monthly Sales Report</div>
  <div className="Login" style={{width: 387.06, height: 264.29, left: 450, top: 269, position: 'absolute'}}>
    <div className="Rectangle5" style={{width: 380.62, height: 69.20, left: 0.80, top: 55.03, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <div className="Year" style={{width: 362.92, height: 60.86, left: 8.85, top: 0, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Year:</div>
    <input type="number" id="year" value={year} onChange={handleYearChange} style={{width: 380.62, height: 69.20, left: 0.80, top: 55.03, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <div className="Month" style={{width: 362.92, height: 60.86, left: 9.66, top: 148.40, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Month:</div>
    <div className="Name" style={{width: 380.62, height: 69.20, left: 0, top: 195.09, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 380.62, height: 69.20, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <input type="number" id="month" value={month} onChange={handleMonthChange} style={{width: 380.62, height: 69.20, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}/>    
      
      </div>
      

  
      <div style={{marginTop:"50vh", fontSize: 24, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>

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

  </div>
</div>
   
  );
}

export default PharmacistViewSales;
