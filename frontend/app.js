console.log("Banking System Loaded");

let accounts = [];
let accCounter = 1000;

// CREATE ACCOUNT
function createAccount(){

  const name =
    document.getElementById("create-name").value.trim();

  const deposit =
    parseFloat(
      document.getElementById("create-deposit").value
    );

  const type =
    document.getElementById("create-type").value;

  const msg =
    document.getElementById("create-msg");

  if(name === ""){
    msg.style.color = "red";
    msg.innerHTML = "Enter customer name";
    return;
  }

  if(isNaN(deposit) || deposit <= 0){
    msg.style.color = "red";
    msg.innerHTML = "Enter valid deposit";
    return;
  }

  accCounter++;

  const accountNumber = "ACC" + accCounter;

  accounts.push({
    accountNumber,
    name,
    balance:deposit,
    type
  });

  msg.style.color = "green";

  msg.innerHTML =
    "Account created successfully! Account Number: "
    + accountNumber;

  document.getElementById("create-name").value = "";
  document.getElementById("create-deposit").value = "";
}

// DEPOSIT
function depositMoney(){

  const accNo =
    document.getElementById("dep-acc").value.trim();

  const amount =
    parseFloat(
      document.getElementById("dep-amt").value
    );

  const msg =
    document.getElementById("dep-msg");

  const acc =
    accounts.find(a => a.accountNumber === accNo);

  if(!acc){
    msg.style.color = "red";
    msg.innerHTML = "Account not found";
    return;
  }

  if(isNaN(amount) || amount <= 0){
    msg.style.color = "red";
    msg.innerHTML = "Enter valid amount";
    return;
  }

  acc.balance += amount;

  msg.style.color = "green";

  msg.innerHTML =
    "₹" + amount +
    " deposited successfully";
}

// WITHDRAW
function withdrawMoney(){

  const accNo =
    document.getElementById("with-acc").value.trim();

  const amount =
    parseFloat(
      document.getElementById("with-amt").value
    );

  const msg =
    document.getElementById("with-msg");

  const acc =
    accounts.find(a => a.accountNumber === accNo);

  if(!acc){
    msg.style.color = "red";
    msg.innerHTML = "Account not found";
    return;
  }

  if(amount > acc.balance){
    msg.style.color = "red";
    msg.innerHTML = "Insufficient balance";
    return;
  }

  acc.balance -= amount;

  msg.style.color = "green";

  msg.innerHTML =
    "₹" + amount +
    " withdrawn successfully";
}

// TRANSFER
function transferMoney(){

  const fromAcc =
    document.getElementById("from-acc").value.trim();

  const toAcc =
    document.getElementById("to-acc").value.trim();

  const amount =
    parseFloat(
      document.getElementById("transfer-amt").value
    );

  const msg =
    document.getElementById("transfer-msg");

  const sender =
    accounts.find(a => a.accountNumber === fromAcc);

  const receiver =
    accounts.find(a => a.accountNumber === toAcc);

  if(!sender){
    msg.style.color = "red";
    msg.innerHTML = "Sender account not found";
    return;
  }

  if(!receiver){
    msg.style.color = "red";
    msg.innerHTML = "Receiver account not found";
    return;
  }

  if(amount > sender.balance){
    msg.style.color = "red";
    msg.innerHTML = "Insufficient balance";
    return;
  }

  sender.balance -= amount;
  receiver.balance += amount;

  msg.style.color = "green";

  msg.innerHTML =
    "₹" + amount +
    " transferred successfully";
}

// CHECK BALANCE
function checkBalance(){

  const accNo =
    document.getElementById("bal-acc").value.trim();

  const msg =
    document.getElementById("bal-msg");

  const acc =
    accounts.find(a => a.accountNumber === accNo);

  if(!acc){
    msg.style.color = "red";
    msg.innerHTML = "Account not found";
    return;
  }

  msg.style.color = "green";

  msg.innerHTML =
    "Current Balance: ₹" + acc.balance;
}

// SHOW ACCOUNTS
function showAccounts(){

  const container =
    document.getElementById("accounts-list");

  if(accounts.length === 0){
    container.innerHTML =
      "<p>No accounts available</p>";
    return;
  }

  container.innerHTML = "";

  accounts.forEach(acc => {

    container.innerHTML += `

      <div class="account">

        <h3>${acc.name}</h3>

        <p>
          <b>Account:</b>
          ${acc.accountNumber}
        </p>

        <p>
          <b>Type:</b>
          ${acc.type}
        </p>

        <p>
          <b>Balance:</b>
          ₹${acc.balance}
        </p>

      </div>

    `;
  });
}