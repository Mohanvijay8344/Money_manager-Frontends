import { useState } from "react";
import { useEffect } from "react";
import { API } from "./global.js";
import ReactFlipCard from "reactjs-flip-card";
import "./TotalRates.css";
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

export function TotalRates() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${API}/Money`);
  //       const data = await response.json();
  //       console.log(data);

  //       const totalIncomes = data.reduce((total, transaction) => {
  //         return transaction.category === "income"
  //           ? total + parseFloat(transaction.amount)
  //           : total;
  //       }, 0);
  //       setTotalIncome(totalIncomes);

  //       const netIncomes = totalIncome - totalExpenditure;
  //       setNetIncome(netIncomes);

  //       const totalExpenditures = data.reduce((total, transaction) => {
  //         return transaction.category === "expenditure"
  //           ? total + parseFloat(transaction.amount)
  //           : total;
  //       }, 0);
  //       setTotalExpenditure(totalExpenditures);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  function checkAuth(res) {
    if (res.status === 401) {
      throw Error("unauthorized");
    } else {
      return res.json();
    }
  }

  const fetchData = async () => {
    await fetch(`${API}/Money`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => checkAuth(res))
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));

    const totalIncomes = users.reduce((total, transaction) => {
      return transaction.category === "income"
        ? total + parseFloat(transaction.amount)
        : total;
    }, 0);
    setTotalIncome(totalIncomes);

    const netIncomes = totalIncome - totalExpenditure;
    setNetIncome(netIncomes);

    const totalExpenditures = users.reduce((total, transaction) => {
      return transaction.category === "expenditure"
        ? total + parseFloat(transaction.amount)
        : total;
    }, 0);
    setTotalExpenditure(totalExpenditures);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="containers">
      <section class="content">
        <div class="cards">
          <div class="card">
            <div class="card__side card__side--front card__side--front-1">
              <div class="card__description">
                <h1>Total Income</h1>
              </div>
            </div>
            <div class="card__side card__side--back card__side--back-1">
              <div class="card__description">{totalIncome}</div>
            </div>
          </div>
          <div class="card">
            <div class="card__side card__side--front card__side--front-2">
              <div class="card__description">
                <h1>Total Expenditure</h1>
              </div>
            </div>
            <div class="card__side card__side--back card__side--back-2">
              <div class="card__description">{totalExpenditure}</div>
            </div>
          </div>
          <div class="card">
            <div class="card__side card__side--front card__side--front-3">
              <div class="card__description">
                <h1>Balance Cash</h1>
              </div>
            </div>
            <div class="card__side card__side--back card__side--back-3">
              <div class="card__description">{netIncome}</div>
            </div>
          </div>
        </div>
      </section>
      <Chart
        netIncome={netIncome}
        totalIncome={totalIncome}
        totalExpenditure={totalExpenditure}
      />
    </div>
  );
}

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class Chart extends Component {
  render() {
    const { netIncome, totalIncome, totalExpenditure } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light1", // "light1", "dark1", "dark2"
      title: {
        text: "Money Expenses",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}%",
          startAngle: -90,
          dataPoints: [
            { y: totalIncome, label: "Total Income" },
            { y: totalExpenditure, label: "Total Expenditure" },
            { y: netIncome, label: "Net Income" },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}
