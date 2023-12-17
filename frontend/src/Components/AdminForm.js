import React, { useState } from "react";
import axios from "axios";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function AdminForm() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the correct endpoint on your server for adding administrators
      const response = await axios.post(
        "http://localhost:8000/addAdmin",
        adminData
      );

      if (response.status === 201) {
        alert("Administrator added successfully");
        // Optionally, you can reset the form fields here
        setAdminData({
          username: "",
          password: "",
        });
      } else if (response.status === 400) {
        alert("Username already exists");
      } else {
        console.error("Failed to add the administrator.");
      }
    } catch (error) {
      console.error("Error adding the administrator:", error);
    }
  };

  return (
    <div
      className="PharmaAdminAddAdminPage"
      style={{
        width: 1440,
        height: 1026,
        position: "relative",
        background: "white",
      }}
    >
      <div
        className="Botbar"
        style={{
          width: 1493,
          height: 131,
          left: -53,
          top: 937,
          position: "absolute",
        }}
      >
        <div
          className="Rectangle1"
          style={{
            width: 1440,
            height: 70,
            left: 53,
            top: 19,
            position: "absolute",
            background: "#4685FF",
          }}
        />
        <img
          className="Acllogo1"
          style={{
            width: 271,
            height: 131,
            left: 0,
            top: 0,
            position: "absolute",
          }}
          src={acllogo}
        />
        <div
          className="El7a2niClinicsAndPharmacy2023"
          style={{
            left: 563,
            top: 47,
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: 25,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          © el7a2ni clinics and pharmacy 2023
        </div>
      </div>
      <div
        className="Login"
        style={{
          width: 500.02,
          height: 468,
          left: 451.98,
          top: 271,
          position: "absolute",
        }}
      >
        <div
          className="Login"
          style={{
            width: 463,
            height: 59,
            left: 13.02,
            top: 409,
            position: "absolute",
          }}
        >
          <button
            className="SignUp"
            style={{
              width: 468,
              left: 0,
              top: 0,
              position: "absolute",
            }}
            src={acllogo}
          />
          <div
            className="El7a2niClinicsAndPharmacy2023"
            style={{
              left: 563,
              top: 47,
              position: "absolute",
              textAlign: "center",
              color: "white",
              fontSize: 25,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            © el7a2ni clinics and pharmacy 2023
          </div>
        </div>

        <a
          href="/admin"
          className="Signup"
          style={{
            width: 163,
            height: 59,
            left: 1151,
            top: 97,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 160.55,
              height: 59,
              left: 2.45,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
              zIndex: 1,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 163,
              height: 59,
              left: 0,
              top: 0,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
              zIndex: 1,
            }}
          >
            Home
          </div>
        </a>

        <div
          className="Login"
          style={{
            width: 500.02,
            height: 468,
            left: 451.98,
            top: 271,
            position: "absolute",
          }}
        >
          <div
            className="Login"
            style={{
              width: 463,
              height: 59,
              left: 13.02,
              top: 409,
              position: "absolute",
            }}
          >
            <button
              className="SignUp"
              style={{
                width: 468,
                left: 0,
                top: 12,
                borderRadius: 18,
                position: "absolute",
                textAlign: "center",
                background: "#4685FF",
                color: "white",
                fontSize: 32,
                fontFamily: "Josefin Sans",
                fontWeight: "400",
                wordWrap: "break-word",
                cursor: "pointer" /* Change cursor to pointer on hover */,
                padding: 10 /* Add padding for better visual separation */,
              }}
              onClick={handleSubmit}
            >
              Add Admin
            </button>{" "}
          </div>
          <div
            className="Formbounds"
            style={{
              width: 500.02,
              height: 397,
              left: 0,
              top: 0,
              position: "absolute",
            }}
          >
            <div
              className="Line1"
              style={{
                width: 500,
                height: 0,
                left: 0,
                top: 53,
                position: "absolute",
                border: "5px #4685FF solid",
              }}
            ></div>
            <div
              className="Line2"
              style={{
                width: 500,
                height: 0,
                left: 0.02,
                top: 397,
                position: "absolute",
                border: "5px #4685FF solid",
              }}
            ></div>
            <div
              className="AddANewAdmin"
              style={{
                width: 312,
                height: 36,
                left: 188.02,
                top: 0,
                position: "absolute",
                textAlign: "right",
                color: "#4685FF",
                fontSize: 36,
                fontFamily: "Josefin Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Add A New Admin
            </div>
          </div>
          <div
            className="Password"
            style={{
              width: 473,
              height: 83,
              left: 13.02,
              top: 242,
              position: "absolute",
            }}
          >
            <div
              className="Rectangle5"
              style={{
                width: 473,
                height: 83,
                left: 0,
                top: 0,
                position: "absolute",
                background: "white",
                borderRadius: 20,
                border: "7px #4685FF solid",
              }}
            />
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleInputChange}
              style={{
                width: 473,
                height: 83,
                border: "7px #4685FF solid",
                borderRadius: 20,
                background: "white",
                color: "rgba(69.91, 132.84, 255, 0.50)",
                fontSize: 20,
                fontFamily: "Josefin Sans",
                fontWeight: 400,
                padding: 10,
                position: "absolute",
                top: 0,
                left: 0,
                cursor: "text",
              }}
            />{" "}
          </div>
          <div
            className="Username"
            style={{
              width: 473,
              height: 83,
              left: 13.02,
              top: 112,
              position: "absolute",
            }}
          >
            <div
              className="Rectangle5"
              style={{
                width: 473,
                height: 83,
                left: 0,
                top: 0,
                position: "absolute",
                background: "white",
                borderRadius: 20,
                border: "7px #4685FF solid",
              }}
            />
            <input
              type="text"
              name="username"
              value={adminData.username}
              onChange={handleInputChange}
              style={{
                width: 473,
                height: 83,
                border: "7px #4685FF solid",
                borderRadius: 20,
                background: "white",
                color: "rgba(69.91, 132.84, 255, 0.50)",
                fontSize: 20,
                fontFamily: "Josefin Sans",
                fontWeight: 400,
                padding: 10,
                position: "absolute",
                top: 0,
                left: 0,
                cursor: "text",
              }}
            />{" "}
          </div>
        </div>
        <div
          className="Navbar"
          style={{
            width: 1683,
            height: 446,
            left: -243,
            top: -89,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle1"
            style={{
              width: 1440,
              height: 175,
              left: 243,
              top: 89,
              position: "absolute",
              background: "#4685FF",
            }}
          />
          <div
            className="Logo"
            style={{
              width: 1290,
              height: 446,
              left: 0,
              top: 0,
              position: "absolute",
            }}
          >
            <img
              className="Acllogo1"
              style={{
                width: 923,
                height: 446,
                left: 0,
                top: 0,
                position: "absolute",
              }}
              src={acllogo}
            />
            <div
              className="PharmacyAdmin"
              style={{
                width: 618,
                height: 86,
                left: 672,
                top: 177,
                position: "absolute",
                color: "white",
                fontSize: 60,
                fontFamily: "Josefin Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Pharmacy - Admin
            </div>
            <div
              className="Logobtn"
              style={{
                width: 719,
                height: 175,
                left: 243,
                top: 89,
                position: "absolute",
              }}
            />
          </div>
        </div>
        <div
          className="Username"
          style={{
            width: 234,
            height: 29,
            left: 485,
            top: 344,
            position: "absolute",
            color: "rgba(69.91, 132.84, 255, 0.50)",
            fontSize: 36,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Username
        </div>
        <div
          className="Password"
          style={{
            width: 176,
            height: 25,
            left: 485,
            top: 474,
            position: "absolute",
            color: "rgba(69.91, 132.84, 255, 0.50)",
            fontSize: 36,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Password
        </div>
      </div>
    </div>
  );
}

export default AdminForm;
