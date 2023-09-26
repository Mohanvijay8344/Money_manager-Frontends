import ReactFlipCard from 'reactjs-flip-card'


export function TotalRates({ users }) {
  const totalIncome = users.reduce((total, user) => {
    if (user.category === "income") {
      return total + parseFloat(user.amount); // Use parseFloat to convert the amount to a number
    }
    return total;
  }, 0);
  console.log("Total Income:", totalIncome);

  const totalExpenditure = users.reduce((total, user) => {
    if (user.category === "expenditure") {
      return total + parseFloat(user.amount); // Use parseFloat to convert the amount to a number
    }
    return total;
  }, 0);
  console.log("Total Expenditure:", totalExpenditure);

  const netIncome = totalIncome - totalExpenditure;

  const totalColor = {
    color: totalIncome === 0 ? "red" : "green",
  };

  const expenditureColor = {
    color: totalExpenditure === 0 ? "green" : "red",
  };

  const netColor = {
    color: netIncome < 0 ? "red" : "orange",
  };

  return (
    <div className="containers">
      <ReactFlipCard 
            frontComponent={<div><h1 style={totalColor}>Total Income</h1></div>}
            backComponent={<div><h1 style={totalColor} >{totalIncome}</h1></div>}
        />
      <ReactFlipCard 
            frontComponent={<div><h1 style={expenditureColor}>Total Expenditure</h1></div>}
            backComponent={<div><h1 style={expenditureColor} >{totalExpenditure}</h1></div>}
        />
      <ReactFlipCard 
            frontComponent={<div><h1 style={netColor}>Balance Cash</h1></div>}
            backComponent={<div><h1 style={netColor} >{netIncome}</h1></div>}
        />
    </div>
  );
}







