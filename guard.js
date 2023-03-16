main();

function main() {
  const transactions = [
    {
      id: "t1",
      type: "PAYMENT",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "23.99",
    },
    {
      id: "t2",
      type: "PAYMENT",
      status: "OPEN",
      method: "PAYPAL",
      amount: "100.43",
    },
    {
      id: "t3",
      type: "REFUND",
      status: "OPEN",
      method: "CREDIT_CARD",
      amount: "10.99",
    },
    {
      id: "t4",
      type: "PAYMENT",
      status: "CLOSED",
      method: "PLAN",
      amount: "15.99",
    },
  ];

  try {
    processTransactions(transactions);
  } catch (error) {
    showErrorMessage(error.message);
  }
}

function processTransactions(transactions) {
  validateTransactions(transactions);

  for (const transaction of transactions) {
    try {
      processTransaction(transaction);
    } catch (error) {
      showErrorMessage(error.message, error.data);
    }
  }
}

function validateTransactions(transactions) {
  // Guard 1
  if (isEmpty(transactions)) {
    throw new Error("No transactions provided!");
  }
}

function processTransaction(transaction) {
  validateTransaction(transaction);

  if (transaction.type === "PAYMENT") {
    processPayment(transaction);
  } else if (transaction.type === "REFUND") {
    processRefund(transaction);
  }
}

function validateTransaction(transaction) {
  // Guard 2
  if (transaction.status !== "OPEN") {
    throw new Error("Invalid transaction type!");
  }
  // Guard 3
  if (transaction.type !== "PAYMENT" && transaction.type !== "REFUND") {
    const error = new Error("Invalid transaction type!");
    error.item = transaction;
    throw error;
  }
}

function processRefund(refundTransaction) {
  if (refundTransaction.method === "CREDIT_CARD") {
    processCreditCardRefund(refundTransaction);
  } else if (refundTransaction.method === "PAYPAL") {
    processPayPalRefund(refundTransaction);
  } else if (refundTransaction.method === "PLAN") {
    processPlanRefund(refundTransaction);
  }
}

function processPayment(paymentTransaction) {
  if (paymentTransaction.method === "CREDIT_CARD") {
    processCreditCardPayment(paymentTransaction);
  } else if (paymentTransaction.method === "PAYPAL") {
    processPayPalPayment(paymentTransaction);
  } else if (paymentTransaction.method === "PLAN") {
    processPlanPayment(paymentTransaction);
  }
}

function isEmpty(transactions) {
  return !transactions || transactions.length === 0;
}

function showErrorMessage(message, item) {
  console.log(message);
  if (item) {
    console.log(item);
  }
}

function processCreditCardPayment(transaction) {
  console.log(
    "Processing credit card payment for amount: " + transaction.amount
  );
}

function processCreditCardRefund(transaction) {
  console.log(
    "Processing credit card refund for amount: " + transaction.amount
  );
}

function processPayPalPayment(transaction) {
  console.log("Processing PayPal payment for amount: " + transaction.amount);
}

function processPayPalRefund(transaction) {
  console.log("Processing PayPal refund for amount: " + transaction.amount);
}

function processPlanPayment(transaction) {
  console.log("Processing plan payment for amount: " + transaction.amount);
}

function processPlanRefund(transaction) {
  console.log("Processing plan refund for amount: " + transaction.amount);
}
