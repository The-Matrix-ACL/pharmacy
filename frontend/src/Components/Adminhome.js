import React from "react";
import { Link } from "react-router-dom";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function Adminhome() {
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    // Implement the logout logic here, e.g., clearing tokens
    localStorage.removeItem("token");
    localStorage.removeItem("userType");

    // Redirect to the login page or any other desired page
    window.location.href = "/login"; // Update with your login route
  };

  return (
    <div
      className="PharmaAdminDashboardPage"
      style={{
        width: 1440,
        height: 1016,
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
          top: 927,
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
        <div
          className="Signup"
          style={{
            width: 133,
            height: 59,
            left: 1484,
            top: 178,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 131,
              height: 59,
              left: 2,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <button
            className="SignUp"
            style={{
              width: 133,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <a
          href="/adminchangepassword"
          className="Signup"
          style={{
            width: 359,
            height: 59,
            left: 1260,
            top: 102,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 353.6,
              height: 59,
              left: 5.4,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 359,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Change Password
          </div>
        </a>
      </div>
      <div
        className="Navigation"
        style={{
          width: 1014,
          height: 370,
          left: 212,
          top: 414,
          position: "absolute",
        }}
      >
        <div
          className="Rectangle7"
          style={{
            width: 1014,
            height: 308,
            left: 0,
            top: 62,
            position: "absolute",
            background: "#4685FF",
            borderRadius: 73,
          }}
        />
        <div
          className="AdminNavigationDashboard"
          style={{
            width: 669,
            height: 47,
            left: 173,
            top: 0,
            position: "absolute",
            color: "black",
            fontSize: 48,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Admin Navigation Dashboard
        </div>
        <a
          href="/pharmacistViewSales"
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 56,
            top: 265,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            View Sales Reports
          </div>
        </a>
        <a
          href="/AvailableMedicine"
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 518,
            top: 265,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            View All Medicines
          </div>
        </a>
        <div
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 518,
            top: 184,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            View All Pharmacists
          </div>
        </div>
        <a
          href="/viewpatients"
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 56,
            top: 184,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            View All Patients
          </div>
        </a>
        <a
          href="/viewPharmacistRequests"
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 518,
            top: 103,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Pharmacist Join Requests
          </div>
        </a>

        <a
          href="/addAdmin"
          className="Btn"
          style={{
            width: 441,
            height: 59,
            left: 56,
            top: 103,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle4"
            style={{
              width: 434.37,
              height: 59,
              left: 6.63,
              top: 0,
              position: "absolute",
              background: "white",
              borderRadius: 18,
            }}
          />
          <div
            className="SignUp"
            style={{
              width: 441,
              left: 0,
              top: 12,
              position: "absolute",
              textAlign: "center",
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            Add An Adminstrator
          </div>
        </a>
      </div>

      <div
        className="WelcomeAdminName"
        style={{
          width: 890,
          height: 104,
          left: 47,
          top: 216,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 64,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Welcome!
      </div>
    </div>
  );
}

export default Adminhome;
