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
    //this.show = this.show.bind(this);

    this.state = {
      medUse: [],
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
        "http://localhost:8000/pharma/pharmacist/viewMedicine/filter" + usage
      )
      .then((res) => this.setState({ medicine: res.data }));
    this.setState({ filtered: true });
  }

  render() {
    return (
      <>
        <form className="form-control" onSubmit={this.filter}>
          <label> Filter </label>
          <select onChange={this.onChangeFilter}>
            {this.usageList().map((usages) => (
              <option key={usages.usage} value={usages.usage}>
                {usages.usage}
              </option>
            ))}
          </select>
        </form>
      </>
    );
  }
}
