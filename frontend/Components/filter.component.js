import React, { Component } from "react";
import axios from "axios";
import medicineModel from "../../backend/src/Models";
import all from "../../backend/src/Routes";

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.filter = this.filter.bind(this);

    this.state = {
      medUse: [],
      medicine: medicineModel.usage,
    };
  }

  filter(e) {
    e.preventDefault();
    const filter = this.medUse.state;
    const meds = this.medicine.state;

    axios
      .post(`http://localhost:8000/viewMedicine/:${filter}`)
      .then((res) => medicineModel.find(filter, meds));
  }
  render() {
    <form className="form-control">
      <label> Filter </label>
      <select>
        {this.medicine.state.map((med) => {
          return <option value={med.name}>{medicineModel.usage}</option>;
        })}
      </select>
    </form>;
  }
}
