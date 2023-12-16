import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Loginstyle.css";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
        userType,
      });

      if (response.status === 200) {
        const { token, userType, username, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);

        // Use the navigate function to redirect
        if (userType === 'admin') {
          navigate('/admin');
        } else if (userType === 'pharmacist') {
          navigate('/pharmacist');
        } else if (userType === 'patient') {
          navigate('/patient');
        }
      } else {
        alert('Invalid username or password.');
        console.error('Authentication failed');
      }
    } catch (error) {
      alert('Invalid username or password. Or as a pharmacist, your request is still pending.');
      console.error('Error during authentication:', error);
    }
  };


  return (

    <div className={"pharma-login-page " }>
      <div className="bot-bar">
        <div className="rectangle-1"></div>
        <img className="acllogo-1" src={acllogo} />
        <div className="el-7-a-2-ni-clinics-and-pharmacy-2023">
          © el7a2ni clinics and pharmacy 2023{" "}
        </div>
     

      <div className="nav-bar">
        <div className="rectangle-12"></div>
        <div className="logo">
          <img className="acllogo-12" src={acllogo} />
          <div className="pharmacy">pharmacy </div>
          <div className="logo-btn"></div>
        </div>

        <div className="login">
        <a href="/submitPharmacistRequest" className="pharma-btn">
          <div className="rectangle-4"></div>
          <div className="sign-up">Register as Pharmacist </div>
          </a>
        </div>
      </div>

      <a href="/resetPassword" className="pharma-btn">
        <div className="forgot-password">
          <div className="rectangle-42"></div>
          <div className="sign-up2">Reset Password </div>
          
        </div>
        </a>

        <div className="login3">
          <div className="rectangle-43">
            <button onClick={handleLogin}>Login</button>
          </div>
          
        </div>

        <div className="form-bounds">
          
          <svg
            className="line-1"
            width="515"
            height="30"
            viewBox="0 0 515 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.566243 15L15 29.4338L29.4338 15L15 0.566243L0.566243 15ZM15 17.5H515V12.5H15V17.5Z"
              fill="#4685FF"
            />
          </svg>

          <svg
            className="line-2"
            width="515"
            height="30"
            viewBox="0 0 515 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M514.458 15L500.024 0.566243L485.59 15L500.024 29.4338L514.458 15ZM0.0241699 17.5H500.024V12.5H0.0241699L0.0241699 17.5Z"
              fill="#4685FF"
            />
          </svg>

          <div className="log-in">Log In </div>
        </div>

        <div className="password">
          <div className="rectangle-5">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          
        
        <div className="username">
          <div className="rectangle-52">
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
      
     
  
          <a href="/addPatient" className="pharma-btn">
        <div className="rectangle-44"></div>
        <div className="sign-up4">Register as Patient </div>
        </a>

      </div>
    </div>
    </div>
    <div className="Username" style={{width: 261, height: 32, left: 533, top: 341, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Username</div>
  <div className="Password" style={{width: 186, height: 31, left: 543, top: 487, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Password</div>
  <div className="Username" style={{width: 294.24, height: 67, left: 676, top: 781, position: 'absolute'}}>
    <div className="Rectangle5" style={{width: 294.24, height: 67, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
    <select value={userType} onChange={(e) => setUserType(e.target.value)}
    style={{width: 294.24, height: 67, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid', zIndex: 1}}>
          <option value="admin">Admin</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="patient">Patient</option>
<<<<<<< HEAD
        </select>
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <Link to="/addPatient">Register as a patient</Link>
      </div>
      <div>
        <Link to="/submitPharmacistRequest">Register as a pharmacist</Link>
      </div>
      <div>
      <Link to="/resetPassword">resetPassword</Link>
      </div>
    </div>
=======
        </select>  </div>
  <div className="SignUpAs" style={{width: 145, height: 125, left: 521, top: 761, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Sign up As:</div>
</div>
    
  
  


>>>>>>> a5af7dedd4b8f31bdca67dcdd59eba158698e59e
  );
}

export default Login;