import React, { useState } from 'react';
import axios from 'axios';
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";


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
      const response = await axios.post(`http://localhost:8000/filtersales`, {
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
    <div className="PharmaPatientCheckWalletPage" style={{width: 1440, height: 1016, position: 'relative', background: 'white'}}>
    <div className="Botbar" style={{width: 1493, height: 131, left: -53, top: 927, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
      <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
      <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
    </div>
    <div className="Navbar" style={{width: 1683, height: 446, left: -243, top: -89, position: 'absolute'}}>
      <div className="Rectangle1" style={{width: 1440, height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
      <div className="Logo" style={{width: 1290, height: 446, left: 0, top: 0, position: 'absolute'}}>
        <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
        <div className="Pharmacy" style={{width: 618, height: 86, left: 672, top: 177, position: 'absolute', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Pharmacy</div>
        <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />
      </div>
      
      <a href="/pharmacist" className="Signup" style={{width: 163, height: 59, left: 1451, top: 177, position: 'absolute'}}>
        <div className="Rectangle4" style={{width: 160.55, height: 59, left: 2.45, top: 0, position: 'absolute', background: 'white', borderRadius: 18}} />
        <div className="SignUp" style={{width: 163, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Home</div>
      </a>
    </div>
    <div className="Btn" style={{width: 304, height: 59, left: 542, top: 612, position: 'absolute'}}>
      <div className="Rectangle4" style={{width: 303.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
      <button className="SignUp" style={{width: 304, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white',  background: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}} onClick={handleFilterSales}>Filter Sales Data</button>
      <div style= {{marginTop: "10vh"}}>
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
      {error && <div style={{ color: 'red' }}>{error}
      </div>}
      </div>
    </div>
    <div className="FilterSalesReport" style={{width: 663, height: 47, left: 56, top: 222, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Filter Sales Report</div>
    <div className="Login" style={{width: 359.73, height: 331.06, left: 510, top: 246, position: 'absolute'}}>
      <div className="Rectangle5" style={{width: 351.42, height: 56.26, left: 0.74, top: 44.74, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
      <div className="Year" style={{width: 335.08, height: 49.48, left: 8.17, top: 0, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Start Date:</div>
      <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} style={{width: 351.42, height: 56.26, left: 0.74, top: 44.74, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}  />
      <div className="Month" style={{width: 335.08, height: 49.48, left: 8, top: 111, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>End Date:</div>
      <div className="Name" style={{width: 351.42, height: 56.26, left: -0, top: 158.61, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 351.42, height: 56.26, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} style={{width: 351.42, height: 56.26, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}/>      </div>
      <div className="Month" style={{width: 335.08, height: 49.48, left: 17, top: 215, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Medicine Name:</div>
      <div className="Name" style={{width: 351.42, height: 56.26, left: 8.31, top: 274.80, position: 'absolute'}}>
        <div className="Rectangle5" style={{width: 351.42, height: 56.26, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input type="text" id="medicineName" value={medicineName} onChange={handleMedicineNameChange} style={{width: 351.42, height: 56.26, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />      </div>
    </div>
  </div>
  )
}

export default FilterSalesReport;
