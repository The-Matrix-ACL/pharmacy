import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function ChangePassword() {
  const username = localStorage.getItem("username");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // You can use the 'username' value here if needed
    console.log(username);
  }, [username]);

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/adminchangepassword/${username}`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div
      className="PharmaPatientAddressPage"
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
            className="Pharmacy"
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
            Pharmacy
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
          href="/admin"
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
            Home
          </div>
        </a>
      </div>
      <div
        className="Btn"
        style={{
          width: 304,
          height: 59,
          left: 528,
          top: 741,
          position: "absolute",
        }}
      >
        <div
          className="Rectangle4"
          style={{
            width: 303.91,
            height: 59,
            left: 0.09,
            top: 0,
            position: "absolute",
            background: "#4685FF",
            borderRadius: 18,
          }}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && (
          <div style={{ color: "green" }}>Password changed successfully</div>
        )}
        <button
          style={{
            width: 304,
            height: 59,
            left: 0,
            top: 0,
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: 32,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
            background: "#4685FF",
          }}
          onClick={handleChangePassword}
        >
          Change Password
        </button>{" "}
      </div>
      <div
        className="ChangePassword"
        style={{
          width: 663,
          height: 47,
          left: 56,
          top: 222,
          position: "absolute",
          color: "black",
          fontSize: 48,
          fontFamily: "Josefin Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Change Password
      </div>
      <div
        className="Login"
        style={{
          width: 504,
          height: 355,
          left: 424,
          top: 320,
          position: "absolute",
        }}
      >
        <div
          className="Formbounds"
          style={{
            width: 504,
            height: 355,
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
              left: 4,
              top: 0,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
          <div
            className="Line2"
            style={{
              width: 500,
              height: 0,
              left: 0,
              top: 355,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
        </div>
        <div
          className="Rectangle5"
          style={{
            width: 473,
            height: 83,
            left: 16.98,
            top: 219,
            position: "absolute",
            background: "white",
            borderRadius: 20,
            border: "7px #4685FF solid",
          }}
        />
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: 473,
            height: 83,
            left: 16.98,
            top: 219,
            position: "absolute",
            background: "white",
            borderRadius: 20,
            border: "7px #4685FF solid",
          }}
        />
        <div
          className="NewPassword"
          style={{
            width: 451,
            height: 73,
            left: 24,
            top: 156,
            position: "absolute",
            color: "rgba(69.91, 132.84, 255, 0.50)",
            fontSize: 36,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          New Password
        </div>
        <div
          className="Rectangle5"
          style={{
            width: 473,
            height: 83,
            left: 13.98,
            top: 73,
            position: "absolute",
            background: "white",
            borderRadius: 20,
            border: "7px #4685FF solid",
          }}
        />
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={{
            width: 473,
            height: 83,
            left: 13.98,
            top: 73,
            position: "absolute",
            background: "white",
            borderRadius: 20,
            border: "7px #4685FF solid",
          }}
        />
        <div
          className="CurrentPassword"
          style={{
            width: 451,
            height: 73,
            left: 24,
            top: 0,
            position: "absolute",
            color: "rgba(69.91, 132.84, 255, 0.50)",
            fontSize: 36,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Current Password
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
