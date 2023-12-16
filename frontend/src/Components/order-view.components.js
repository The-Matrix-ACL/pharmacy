import { Component } from "react";
import axios from "axios";

const Order = (props) => (
  <tr>
    <td>{props.order.items[1]}</td>
    <td>{props.order.items[2]}</td>
    <td>{props.order.items[3]}</td>
  </tr>
);
const userid = localStorage.getItem("userId");
console.log(localStorage);

export default class ViewOrder extends Component {
  constructor(props) {
    super(props);

    this.state = { order: [] };
  }

  componentDidMount() {
    axios
      .get("https://localhost:8000/pharma/order/viewOrder/" + userid)
      .then((response) => {
        this.setState({ order: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  orderList() {
    // this.setState({ Bill: this.state.order.bill });
    return this.state.order.map((currentOrder) => {
      return <Order order={currentOrder} key={currentOrder._id} />;
    });
  }
  cancel(e) {
    axios
      .delete("http://localost:8000/cancelOrder/" + userid)
      .then((response) => {
        this.setState({ order: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <div>
          <h3>Your Order</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.orderList()}</tbody>
          </table>
        </div>
        <div>
          <p>Total Bill: {this.state.order.bill}</p>
          <p>Status: {this.state.order.status}</p>
        </div>

        <button
          onClick={this.cancel}
          style={{ backgroundColor: "red", color: "white" }}
          disabled={
            this.state.order.status === "Delivering" ||
            this.state.order.status === "Delivered"
          }
        >
          Cancel your order?
        </button>
      </>
    );
  }
}
