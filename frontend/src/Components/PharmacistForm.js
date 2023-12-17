import React, { useState } from "react";
import axios from "axios";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function PharmacistForm() {
  const [pharmacistData, setPharmacistData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationalBackground: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPharmacistData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the correct endpoint on your server for pharmacist registration request
      const response = await axios.post(
        "http://localhost:8000/submitPharmacistRequest",
        pharmacistData
      );

      if (response.status === 201) {
        alert("Pharmacist registration request submitted successfully");
        // Optionally, you can reset the form fields here
        setPharmacistData({
          username: "",
          name: "",
          email: "",
          password: "",
          dateOfBirth: "",
          hourlyRate: "",
          affiliation: "",
          educationalBackground: "",
        });
      } else {
        console.error("Failed to submit pharmacist registration request.");
      }
    } catch (error) {
      console.error("Error submitting pharmacist registration request:", error);
    }
  };

  return (
    <div
      className="PharmaPharmacistSignupPage"
      style={{
        width: 1440,
        height: 1793,
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
          top: 1704,
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
            width: 963,
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
            className="Pharmacy"
            style={{
              width: 317,
              height: 59,
              left: 646,
              top: 178,
              position: "absolute",
              textAlign: "center",
              color: "white",
              fontSize: 60,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            pharmacy
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
        <a
          href="/login"
          className="Signup"
          style={{
            width: 163,
            height: 59,
            left: 1451,
            top: 177,
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
            }}
          >
            Login
          </div>
        </a>
      </div>
      <div
        className="Login"
        style={{
          width: 502.98,
          height: 1429,
          left: 452.02,
          top: 229,
          position: "absolute",
        }}
      >
        <div
          className="Formbounds"
          style={{
            width: 502.98,
            height: 1429,
            left: 0,
            top: 0,
            position: "absolute",
          }}
        >
          <div
            className="Login"
            style={{
              width: 460.96,
              height: 59,
              left: 21.04,
              top: 1370,
              position: "absolute",
            }}
          >
            <div
              className="Rectangle4"
              style={{
                width: 460.96,
                height: 59,
                left: 0,
                top: 0,
                position: "absolute",
                background: "#4685FF",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 18,
              }}
            />
            <button
              className="SignUp"
              style={{
                width: 460.96,
                height: 59,
                left: 0,
                top: 0,
                position: "absolute",
                background: "#4685FF",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: 18,
                fontSize: 36,
                fontFamily: "Josefin Sans",
                fontWeight: "400",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
          <div
            className="Line2"
            style={{
              width: 500,
              height: 0,
              left: 0,
              top: 1319,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
          <div
            className="Line1"
            style={{
              width: 500,
              height: 0,
              left: 2.98,
              top: 47,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
          <div
            className="SignUp"
            style={{
              width: 133,
              height: 36,
              left: 366.98,
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
            Sign Up
          </div>
        </div>

        <div
          className="Education"
          style={{
            width: 473,
            height: 83,
            left: 14.98,
            top: 1214,
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
            name="educationalBackground"
            value={pharmacistData.educationalBackground}
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
            }}
          />
        </div>
        <div
          className="Affiliation"
          style={{
            width: 473,
            height: 83,
            left: 12.98,
            top: 1057,
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
            name="affiliation"
            value={pharmacistData.affiliation}
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
            }}
          />
        </div>
        <div
          className="Hourlyrate"
          style={{
            width: 473,
            height: 83,
            left: 12.98,
            top: 916,
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
            type="number"
            name="hourlyRate"
            value={pharmacistData.hourlyRate}
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
            }}
          />
        </div>

        <div
          className="Dob"
          style={{
            width: 159.63,
            height: 66.8,
            left: 32.98,
            top: 762,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle5"
            style={{
              width: 159.63,
              height: 66.8,
              left: 0,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 20,
              border: "7px #4685FF solid",
            }}
          />
          <input
            type="date"
            name="dateOfBirth"
            value={pharmacistData.dateOfBirth}
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
            }}
          />{" "}
        </div>
        <div
          className="Password"
          style={{
            width: 473,
            height: 83,
            left: 22.98,
            top: 621,
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
            value={pharmacistData.password}
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
            }}
          />{" "}
        </div>
        <div
          className="Email"
          style={{
            width: 473,
            height: 83,
            left: 22.98,
            top: 451,
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
            type="email"
            name="email"
            value={pharmacistData.email}
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
            }}
          />{" "}
        </div>

        <div
          className="Name"
          style={{
            width: 473,
            height: 83,
            left: 15.98,
            top: 305,
            position: "absolute",
          }}
        >
          <input
            type="text"
            name="name"
            value={pharmacistData.name}
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
            }}
          />
        </div>
        <div
          className="Username"
          style={{
            width: 473,
            height: 83,
            left: 12.98,
            top: 159,
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
            value={pharmacistData.username}
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
            }}
          />{" "}
        </div>
      </div>
      <div
        className="Username"
        style={{
          width: 256,
          height: 28,
          left: 477,
          top: 343,
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
        className="Name"
        style={{
          width: 171,
          height: 35,
          left: 485,
          top: 491,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 36,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Name
      </div>
      <div
        className="Email"
        style={{
          width: 129,
          height: 24,
          left: 482,
          top: 639,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 36,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Email
      </div>
      <div
        className="Password"
        style={{
          width: 173,
          height: 26,
          left: 488,
          top: 793,
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
      <div
        className="DateOfBirth"
        style={{
          width: 142,
          height: 28,
          left: 496,
          top: 949,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 20,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Date Of Birth
      </div>
      <div
        className="HourlyRate"
        style={{
          width: 215,
          height: 29,
          left: 488,
          top: 1107,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 36,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Hourly Rate
      </div>
      <div
        className="AffiliationHospital"
        style={{
          width: 353,
          height: 18,
          left: 490,
          top: 1249,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 36,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Affiliation (Hospital)
      </div>
      <div
        className="Education"
        style={{
          width: 253,
          height: 35,
          left: 492,
          top: 1395,
          position: "absolute",
          color: "rgba(69.91, 132.84, 255, 0.50)",
          fontSize: 36,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Education
      </div>
    </div>
  );
}

export default PharmacistForm;
