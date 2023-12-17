import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";

function MedicationsPharmacist() {
  const [Meds, setMeds] = useState([]);

  useEffect(() => {
    // Fetch pharmacist requests when the component mounts
    async function fetchMeds() {
      try {
        const response = await axios.get(
          "http://localhost:8000/AvailableMedicinePharmacist"
        );
        if (response.status === 200) {
          setMeds(response.data);
        } else {
          console.error("Failed to fetch meds.");
        }
      } catch (error) {
        console.error("Error fetching meds:", error);
      }
    }

    fetchMeds();
  }, []);

  const handleEdit = async (medId) => {
    try {
      await axios.post(
        `http://localhost:8000/AvailableMedicinePharmacist/editMed/${medId}`
      );
      window.location.replace(
        `http://localhost:8000/AvailableMedicinePharmacist/editMed/${medId}`
      );
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleArchive = async (medId) => {
    try {
      await axios.post(
        `http://localhost:8000/AvailableMedicinePharmacist/archiveMed/${medId}`
      );
      window.location.replace(
        `http://localhost:8000/AvailableMedicinePharmacist/archiveMed/${medId}`
      );
      window.alert("Medicine has been archived");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const userId = localStorage.getItem("userId");
  console.log(localStorage);

  return (
    <div className="Medications">
      <div
        className="PharmaAdminViewMedicinePage"
        style={{
          width: 1440,
          height: 1026,
          position: "relative",
          background: "white",
        }}
      >
        <footer
          className="Botbar"
          style={{
            width: 1493,
            height: 131,
            left: -53,
            top: 937,
            position: "absolute",
            marginTop: "10%",
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
        </footer>
        <div
          className="Navbar"
          style={{
            width: "100%",
            height: 446,
            left: -243,
            top: -89,
            position: "absolute",
          }}
        >
          <div
            className="Rectangle1"
            style={{
              width: "100%",
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
              className="PharmacyMedicine"
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
              Pharmacy - Medicine
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
            href="/pharmacist"
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
          className="Group3"
          style={{
            width: 1335,
            height: 625,
            left: 36,
            top: 212,
            position: "absolute",
            marginBottom: "10%",
          }}
        >
          <div
            className="Line3"
            style={{
              width: 1335,
              height: 0,
              left: 0,
              top: 56,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
          <div
            className="Line4"
            style={{
              width: 1335,
              height: 0,
              left: 0,
              top: 625,
              position: "absolute",
              border: "5px #4685FF solid",
            }}
          ></div>
          <div
            className="ViewAllMedicine"
            style={{
              width: 602,
              height: 56,
              left: 23,
              top: 0,
              position: "absolute",
              color: "black",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            View All Medicine
          </div>
        </div>
        <div
          className="Rectangle15"
          style={{
            width: 497,
            height: 40,
            left: 360,
            top: 220,
            position: "absolute",
            background: "white",
            borderRadius: 10,
            border: "1px #4685FF solid",
          }}
        />
        <div
          className="Rectangle16"
          style={{
            width: 317,
            height: 40,
            left: 1054,
            top: 220,
            position: "absolute",
            background: "white",
            borderRadius: 10,
            border: "1px #4685FF solid",
          }}
        />
        <div
          className="Rectangle17"
          style={{
            width: 41,
            height: 40,
            left: 1330,
            top: 220,
            position: "absolute",
            background: "white",
            borderRadius: 10,
            border: "1px #4685FF solid",
          }}
        />
        <div
          className="SearchMedicines"
          style={{
            width: 320,
            height: 37,
            left: 376,
            top: 220,
            position: "absolute",
            color: "rgba(0, 0, 0, 0.20)",
            fontSize: 32,
            fontFamily: "Josefin Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Search Medicines
        </div>
        <div
          style={{
            width: 304,
            height: 40,
            left: 1330,
            top: 220,
            position: "absolute",
          }}
        >
          <span
            style={{
              color: "rgba(0, 0, 0, 0.28)",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {" "}
          </span>
          <span
            style={{
              color: "#4685FF",
              fontSize: 32,
              fontFamily: "Josefin Sans",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            ▼
          </span>
        </div>

        <h2>Meds</h2>
        <table
          style={{
            border: "3px solid",
            width: "100%",
            left: 36,
            top: 312,
            position: "absolute",
          }}
        >
          <thead
            className="thead-light"
            style={{ border: "3px solid", width: "100%" }}
          >
            <tr style={{ border: "3px solid", width: "100%" }}>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Name{" "}
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Ingredients
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Usage
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                description
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Picture
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Sales
              </th>
              <th
                style={{
                  border: "3px #4685FF solid",
                  height: "70px",
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {Meds.map((Meds) => (
              <tr
                key={Meds._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.51)",
                  borderBottom: "1px solid #000000",
                }}
              >
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.name}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.price}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.ingredients}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.usage}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.description}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.picture}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.amount}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  {Meds.sales}
                </td>
                <td
                  style={{
                    border: "3px #4685FF solid",
                    height: "70px",
                    padding: "15px",
                    textAlign: "left",
                  }}
                >
                  <button
                    style={{ background: "#4685FF", color: "white" }}
                    onClick={() => handleEdit(Meds._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicationsPharmacist;
