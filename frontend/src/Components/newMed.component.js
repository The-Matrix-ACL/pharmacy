import React, { Component } from "react";
import axios from "axios";
import acllogo from "/Users/shaymaa/Desktop/ACL/pharmacy/frontend/src/Components/acllogo.png";


export default class AddMed extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeUsage = this.onChangeUsage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeSales = this.onChangeSales.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      price: "",
      ingredients: "",
      usage: "",
      description: "",
      picture: "",
      amount: 0,
      sales: 0,
      //users: []
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value,
    });
  }

  onChangeUsage(e) {
    this.setState({
      usage: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePicture(e) {
    this.setState({
      picture: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangeSales(e) {
    this.setState({
      sales: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const medicine = {
      name: this.state.name,
      price: this.state.price,
      ingredients: this.state.ingredients,
      usage: this.state.usage,
      description: this.state.description,
      picture: this.state.picture,
      amount: this.state.amount,
      sales: this.state.sales,
    };

    console.log(medicine);

    axios
      .post("http://localhost:8000/addMed", medicine)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div className="PharmaPharmacistAddMedPage" style={{width: 1440, height: 1793, position: 'relative', background: 'white'}}>
      <div className="Botbar" style={{width: 1493, height: 131, left: -53, top: 1704, position: 'absolute'}}>
        <div className="Rectangle1" style={{width: 1440, height: 70, left: 53, top: 19, position: 'absolute', background: '#4685FF'}} />
        <img className="Acllogo1" style={{width: 271, height: 131, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
        <div className="El7a2niClinicsAndPharmacy2023" style={{left: 563, top: 47, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 25, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>© el7a2ni clinics and pharmacy 2023</div>
      </div>
      <div className="Navbar" style={{width: 1683, height: 446, left: -243, top: -89, position: 'absolute'}}>
        <div className="Rectangle1" style={{width: 1440, height: 175, left: 243, top: 89, position: 'absolute', background: '#4685FF'}} />
        <div className="Logo" style={{width: 1334, height: 446, left: 0, top: 0, position: 'absolute'}}>
          <img className="Acllogo1" style={{width: 923, height: 446, left: 0, top: 0, position: 'absolute'}} src={acllogo} />
          <div className="PharmacyPharmacist" style={{width: 676, height: 59, left: 658, top: 193, position: 'absolute', color: 'white', fontSize: 60, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Pharmacy - Pharmacist</div>
          <div className="Logobtn" style={{width: 719, height: 175, left: 243, top: 89, position: 'absolute'}} />
        </div>
        <a href="/pharmacist" className="Signup" style={{width: 163, height: 59, left: 1451, top: 177, position: 'absolute'}}>
        <div className="Rectangle4" style={{width: 160.55, height: 59, left: 2.45, top: 0, position: 'absolute', background: 'white', borderRadius: 18}} />
        <div className="SignUp" style={{width: 163, height: 59, left: 0, top: 0, position: 'absolute', textAlign: 'center', color: '#4685FF', fontSize: 32, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Home</div>
      </a>
      </div>
      <div className="Addmed" style={{width: 507, height: 1323, left: 455, top: 229, position: 'absolute'}}>
        <div className="Formbounds" style={{width: 507, height: 1323, left: 0, top: 0, position: 'absolute'}}>
          <div className="Login" style={{width: 460.96, height: 59, left: 20, top: 1264, position: 'absolute'}}>
            <button className="SignUp" style={{width: 449, height: 59, left: 5.96, top: 0, position: 'absolute', textAlign: 'center', background: '#4685FF', color: 'white', fontSize: 32, fontFamily: 'Josefin Sans', borderRadius: 18,  fontWeight: '400', wordWrap: 'break-word'}} onClick={this.onSubmit}>Add New Medicine</button>
          </div>
          <div className="Line2" style={{width: 500, height: 0, left: 7, top: 1228, position: 'absolute', border: '5px #4685FF solid'}}></div>
          <div className="Line1" style={{width: 500, height: 0, left: 0, top: 47, position: 'absolute', border: '5px #4685FF solid'}}></div>
          <div className="AddNewMedicine" style={{width: 341, height: 36, left: 156, top: 0, position: 'absolute', textAlign: 'right', color: '#4685FF', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Add New Medicine</div>
        </div>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 13, top: 1113, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <div className="Hourlyrate" style={{width: 146, height: 83, left: 27, top: 960, position: 'absolute'}}>
          <div className="Rectangle5" style={{width: 146, height: 83, left: 0, top: 0, position: 'absolute', background: '#4685FF', borderRadius: 20, border: '7px #4685FF solid'}} />
          <div className="Upload" style={{width: 139.21, height: 73, left: 3.70, top: 10, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Upload</div>
        </div>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 20, top: 621, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
               type="text"
               required
               className="form-control"
               value={this.state.usage}
               onChange={this.onChangeUsage}
              style={{width: 473, height: 83, left: 20, top: 621, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
            />
        <div className="Rectangle5" style={{width: 473, height: 83, left: 20, top: 451, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
              type="text"
              required
              className="form-control"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
              style={{width: 473, height: 83, left: 20, top: 451, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
            />
        <div className="Rectangle5" style={{width: 473, height: 83, left: 13, top: 305, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
              type="text"
              required
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
              style={{width: 473, height: 83, left: 13, top: 305, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
            />
        <div className="Rectangle5" style={{width: 473, height: 83, left: 10, top: 159, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              style={{width: 473, height: 83, left: 10, top: 159, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
              />
             
        <div className="Name" style={{width: 256, height: 28, left: 22, top: 114, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Name</div>
        <div className="Price" style={{width: 171, height: 35, left: 30, top: 262, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Price</div>
        <div className="Ingredients" style={{width: 315, height: 24, left: 27, top: 410, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Ingredients</div>
        <div className="Usage" style={{width: 173, height: 26, left: 33, top: 564, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Usage</div>
        <div className="Rectangle5" style={{width: 473, height: 83, left: 20, top: 796, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}} />
        <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              style={{width: 473, height: 83, left: 20, top: 796, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
            />
        <div className="Description" style={{width: 273, height: 26, left: 33, top: 739, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Description</div>
        <div className="Picture" style={{width: 215, height: 29, left: 33, top: 907, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Picture</div>
        <div className="Amount" style={{width: 353, height: 18, left: 38, top: 1076, position: 'absolute', color: 'rgba(69.91, 132.84, 255, 0.50)', fontSize: 36, fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Amount</div>
        <input
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
              style={{width: 473, height: 83, left: 13, top: 1113, position: 'absolute', background: 'white', borderRadius: 20, border: '7px #4685FF solid'}}
            />
      </div>
    </div>
    );
  }
}
