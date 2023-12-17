import React, { useState, useEffect } from 'react';
import axios from 'axios';
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";


function Order() {
  const [order, setOrder] = useState([]);
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.post(`http://localhost:8000/viewOrder/${userId}`);
        console.log(response)
        if (response.status === 200) {
          setOrder(response.data);
          
          
        } else {
          console.error("Failed to fetch order");
        }
      } catch (error) {
        console.error("Error fetching order", error);
      }
    }

    fetchOrders();
  }, []);

  console.log("aaaaaaa")

  let items = order.items;
  let bill = order.bill;

  return (
    <div className="Order">
      <div className="Medications">
      <div className="PharmaAdminViewMedicinePage" style={{width: 1440, height: 1026, position: 'relative', background: 'white'}}>
  <footer className="Botbar" style={{width: 1493, height: 131, left: -53, top: 937, position: 'absolute' , marginTop: "10%", }}>
    <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
    <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
    <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
  </footer>
  <div className="Navbar" style={{width: "100%", height: 446, left: -243, top: -89, position: 'absolute'}}>
    <div className="Rectangle1" style={{width: "100%", height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
    <div className="Logo" style={{width: 1290, height: 446, left: 0, top: 0, position: 'absolute'}}>
      <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo}/>
      <div className="PharmacyMedicine" style={{width: 618, height: 86, left: 672, top: 177, position: 'absolute', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Pharmacy</div>
      <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />cine
    </div>
    
  </div>
  <div className="Group3" style={{width: 1335, height: 625, left: 36, top: 212, position: 'absolute', marginBottom: "10%"}}>
    <div className="Line3" style={{width: 1335, height: 0, left: 0, top: 56, position: 'absolute', border: '5px #4685FF solid'}}></div>
    <div className="ViewAllMedicine" style={{width: 602, height: 56, left: 23, top: 0, position: 'absolute', color: 'black', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>My Cart</div>
  </div>
  <div className="Btn" style={{width: 294, height: 59, left: 56, top: 868, position: 'absolute'}}>
    <div className="Rectangle4" style={{width: 293.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
    <div className="SignUp" style={{width: 294, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Checkout Order</div>
  </div>
      <h2>Order</h2>
      {order.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
      <table style={{border: "3px solid", width: "100%" , left: 36, top: 312, position: 'absolute' }}>
        <thead className="thead-light" style={{border: "3px solid", width: "100%" , }}>
          <tr style={{border: "3px solid", width: "100%" , }}>
            <th style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
  textAlign: "left", }} >Name</th>
            <th style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
  textAlign: "left", }} >Quantity</th>
            <th style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
  textAlign: "left", }} >Price</th>
          </tr>
        </thead>
        <tbody>
          {(order).map((order, index) => (
              <tr key={index} style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.51)',
                borderBottom: "1px solid #000000",}} >
                <td style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
  textAlign: "left", }}>{order.index}</td>
                <td style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
            textAlign: "left", }}>
    
                 <table>
            {(items).map((item, index) => (
                <tr key={index} style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.51)',
                    borderBottom: "1px solid #000000",}} >
                    <td style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
            textAlign: "left", }}>{item.name}</td>
            <td style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
            textAlign: "left", }}>{item.quantity}</td>
                        <td style={{border: "3px #4685FF solid",height: "70px", padding: "15px",
            textAlign: "left", }}>{item.price}</td>  
            

          </tr>
           ))}
          </table>
        
        
  </td>

            </tr>
          ))}
          <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Total Bill: {bill}</p>
        </tbody>
      </table>
      
      )}

    

      <div className="Btn" style={{width: 294, height: 59, left: 56, top: 868, position: 'absolute'}}>
    <div className="Rectangle4" style={{width: 293.91, height: 59, left: 0.09, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 18}} />
                <button style={{ width: 294, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word', background: '#4685FF',
  color: 'white',}}>
                 Checkout Order
                </button>
                </div>
              
              <div className="Username" style={{width: 477, height: 54.22, left: 56, top: 781.69, position: 'absolute'}}>
    <div className="Rectangle5" style={{width: 477, height: 54.22, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <div className="DropdownWalletCashOnDeliveryCreditCard" style={{width: 454, height: 48, left: 12, top: 3.31, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 18, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Dropdown (Wallet/Cash On Delivery/ Credit Card)</div>
  </div>
              <div className="ChoosePaymentMethod" style={{width: 454, height: 48, left: 67, top: 734, position: 'absolute', color: '#4685FF', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Choose Payment Method</div>
  <div className="Username" style={{width: 477, height: 54.22, left: 56, top: 647.69, position: 'absolute'}}>
    <div className="Rectangle5" style={{width: 477, height: 54.22, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <div className="DropdownMenu" style={{width: 454, height: 48, left: 12, top: 3.31, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 18, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Dropdown Menu</div>
  </div>
  <div className="ChooseDeliveryAddress" style={{width: 454, height: 48, left: 67, top: 600, position: 'absolute', color: '#4685FF', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Choose Delivery Address</div>

    </div>
    </div>
    </div>
  );
}

export default Order;
