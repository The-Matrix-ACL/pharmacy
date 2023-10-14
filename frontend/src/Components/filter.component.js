import React, { Component } from "react";
import axios from "axios";

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.filter = this.filter.bind(this);

    this.state = {
      medUse: "",
      medicine: [],
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const filter = this.medUse.state;
    const meds = this.medicine.state;

    axios
      .get("http://localhost:8000/viewMedicine/" + filter)
      .then((res) => meds);
  }

  render() {
    return (
      <form className="form-control">
        <label> Filter </label>
        <select>
          {this.medicine.state.map((meds) => {
            return (
              <option value={meds.name}>
                {" "}
                {meds.map((medicines) => medicines.usage)}
              </option>
            );
          })}
        </select>
      </form>
    );
  }
}
