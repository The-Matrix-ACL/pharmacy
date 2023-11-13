import React, { Component } from "react";
import axios from "axios";
import medicineModel from "../../backend/src/Models";

export default class MedicineShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: "",
      medicine: medicineModel.name,
    };
  }
  onChangeSearch(e) {
    this.setState({
      name: e.target.value,
    });
  }

  searchFor(e) {
    e.preventDefault();
    const search = this.name.state;
    const meds = this.medicine.state;

    axios
      .get("http://localhost:8000/viewMedicine/")
      .then((res) => medicineModel.find(search, meds));
  }

  render() {
    return (
      <>
        <form onSubmit={this.searchFor}>
          <label for="search">Search</label>
          <input
            className="form-control"
            value={this.state.search}
            placeholder="Search..."
            onChange={this.onChangeSearch}
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </form>
      </>
    );
  }
}

