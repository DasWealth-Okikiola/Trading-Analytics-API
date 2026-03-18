module.exports = ({ direction, entryPrice, exitPrice, lotSize }) => {

    let profitLoss;
  
    if (direction === "buy") {
      profitLoss = (exitPrice - entryPrice) * lotSize;
    } else {
      profitLoss = (entryPrice - exitPrice) * lotSize;
    }
  
    const outcome = profitLoss > 0 ? "win" : "loss";
  
    return { profitLoss, outcome };
  };