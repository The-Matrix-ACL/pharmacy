import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Medicine = (props) => (
  <tr>
    <td>{props.medicine.name}</td>
    <td>{props.medicine.price}</td>
    <td>{props.medicine.ingredients}</td>
    <td>{props.medicine.usage}</td>
    <td>{props.medicine.description}</td>
    <td>{props.medicine.picture}</td>
    <td>{props.medicine.amount}</td>
    <td>{props.medicine.sales}</td>
    <td>
      <Link to={"editMed/" + props.medicine._id}>edit</Link>
    </td>
  </tr>
);

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.filter = this.filter.bind(this);
    //this.show = this.show.bind(this);

    this.state = {
      medUse: "",
      medicine: [],
      uses: [],
      filtered: false,
    };
  }
  medicineList() {
    return this.state.medicine.map((currentmedicine) => {
      return <Medicine medicine={currentmedicine} key={currentmedicine._id} />;
    });
  }
  usageList() {
    axios
      .get("http://localhost:8000/pharma/pharmacist/AvailableMedicine/")
      .then((response) => {
        this.setState({ uses: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    return this.state.uses;
  }

  onChangeFilter(e) {
    this.setState({ medUse: e.target.value });
  }
  filter(e) {
    e.preventDefault();
    let usage = this.state.medUse;

    axios
      .get(
        "http://localhost:8000/pharma/pharmacist/viewMedicine/filter/" + usage
      )
      .then((response) => this.setState({ medicine: response.data }));
    this.setState({ filtered: true });
  }

  render() {
    if (!this.state.filtered) {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifycontent: "space-between",
            }}
          >
            <form className="form-control" onSubmit={this.filter}>
              <label> Filter </label>
              <select onChange={this.onChangeFilter} style={{ width: "150px" }}>
                {this.usageList().map((usages) => (
                  <option key={usages.usage} value={usages.usage}>
                    {usages.usage}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value="Filter"
                className="btn btn-primary"
                style={{ float: "right" }}
              />
            </form>
          </div>
        </>
      );
    }
    if (this.state.filtered) {
      return (
        <>
          <form className="form-control" onSubmit={this.filter}>
            <label> Filter </label>
            <select onChange={this.onChangeFilter} style={{ width: "150px" }}>
              {this.usageList().map((usages) => (
                <option key={usages.usage} value={usages.usage}>
                  {usages.usage}
                </option>
              ))}
            </select>
            <input
              type="submit"
              value="Filter"
              className="btn btn-primary"
              style={{ float: "right" }}
            />
          </form>

          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Ingredients</th>
                <th>Usage</th>
                <th>description</th>
                <th>Picture</th>
                <th>Amount</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>{this.medicineList()}</tbody>
          </table>
        </>
      );
    }
  }
}

