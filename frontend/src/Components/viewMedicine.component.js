import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Medicine= props => (
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
      <Link to={"editMed/"+props.medicine._id}>edit</Link> 
    </td>
  </tr>
)

export default class AvailableMeds extends Component{
    constructor(props) {
        super(props);

        this.state ={medicine: []}
    }

    componentDidMount() {
        axios.get('http://localhost:8000/pharma/pharmacist/AvailableMedicine')
          .then(response => {
            this.setState({ medicine: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

      medicineList() {
        return this.state.medicine.map(currentmedicine => {
          return <Medicine medicine={currentmedicine} key={currentmedicine._id} />;
        })
      }
    




      render() {
        return (
          <div>
            <h3>Available Medicine</h3>
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
              <tbody>
                { this.medicineList() }
              </tbody>
            </table>
          </div>
        )
      }

}