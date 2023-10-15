import React, { Component } from "react";
import axios from "axios";
import { medicineModel } from "./././Models";
export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      medUse: "",
      medicine: medicineModel,
    };
  }

  onChangeFilter(e) {
    this.setState({ medUse: e.target.value });
  }
  filter(e) {
    e.preventDefault();
    const filtering = this.state.medUse;

    axios
      .get(`http://localhost:8000/viewMedicine/${filtering}`)
      .then((response) => {
        this.state({ medicine: response.data });
        this.show = medicineModel.find();
        console.log(response);
      });
  }

  render() {
    return (
      <form className="form-control" onSubmit={this.filter}>
        <label> Filter </label>
        <select onChange={this.onChangeFilter}>
          {this.state.medicine.usage.map((medicineModel) => {
            return (
              <option key={medicineModel.name} value={medicineModel.usage}>
                {medicineModel.usage}
              </option>
            );
          })}
        </select>
      </form>
    );
  }
}
