// ===============================
// BANKING SYSTEM - ADVANCED VERSION
// ===============================

let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let counter = parseInt(localStorage.getItem("counter")) || 1000;

// ===============================
// SAVE DATA
// ===============================
function saveData() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("counter", counter);
}

// ===============================
// SHOW MESSAGE
// ===============================
function showMessage(id, text, type) {
  const msg = document.getElementById(id);

  msg.textContent = text;
  msg.className = `msg ${type}`;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "msg";
  }, 4000);
}

// ===============================
// CREATE ACCOUNT
// ===============================
function createAccount() {

  const name = document.getElementById("create-name").value.trim();
  const deposit = parseFloat(document.getElementById("create-deposit").value);
  const type = document.getElementById("create-type").value;

  if (!name) {
    showMessage("create-msg", "⚠️ Enter your name!", "error");
    return;
  }

  if (isNaN(deposit) || deposit <= 0) {
    showMessage("create-msg", "⚠️ Enter valid deposit amount!", "error");
    return;
  }

  counter++;

  const accNumber = "ACC" + counter;

  const newAccount = {
    accNumber,
    name,
    balance: deposit,
    type,
    history: [`🟢 Account created with Rs.${deposit}`]
  };

  accounts.push(newAccount);

  saveData();

  showMessage(
    "create-msg",
    `🎉 Account Created Successfully! Account No: ${accNumber}`,
    "success"
  );

  document.getElementById("create-name").value = "";
  document.getElementById("create-deposit").value = "";

  loadAccounts();
}

// ===============================
// DEPOSIT
// ===============================
function deposit() {

  const accNo = document.getElementById("dep-acc").value.trim();
  const amount = parseFloat(document.getElementById("dep-amt").value);

  const acc = accounts.find(a => a.accNumber === accNo);

  if (!acc) {
    showMessage("dep-msg", "❌ Account not found!", "error");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    showMessage("dep-msg", "⚠️ Invalid amount!", "error");
    return;
  }

  acc.balance += amount;

  acc.history.push(`💰 Deposited Rs.${amount}`);

  saveData();

  showMessage(
    "dep-msg",
    `✅ Rs.${amount} Deposited Successfully`,
    "success"
  );

  loadAccounts();
}

// ===============================
// WITHDRAW
// ===============================
function withdraw() {

  const accNo = document.getElementById("wit-acc").value.trim();
  const amount = parseFloat(document.getElementById("wit-amt").value);

  const acc = accounts.find(a => a.accNumber === accNo);

  if (!acc) {
    showMessage("wit-msg", "❌ Account not found!", "error");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    showMessage("wit-msg", "⚠️ Invalid amount!", "error");
    return;
  }

  if (amount > acc.balance) {
    showMessage("wit-msg", "🚫 Insufficient Balance!", "error");
    return;
  }

  acc.balance -= amount;

  acc.history.push(`💸 Withdrawn Rs.${amount}`);

  saveData();

  showMessage(
    "wit-msg",
    `✅ Rs.${amount} Withdrawn`,
    "success"
  );

  loadAccounts();
}

// ===============================
// TRANSFER
// ===============================
function transfer() {

  const fromNo = document.getElementById("trans-from").value.trim();
  const toNo = document.getElementById("trans-to").value.trim();
  const amount = parseFloat(document.getElementById("trans-amt").value);

  const from = accounts.find(a => a.accNumber === fromNo);
  const to = accounts.find(a => a.accNumber === toNo);

  if (!from) {
    showMessage("trans-msg", "❌ Sender account not found!", "error");
    return;
  }

  if (!to) {
    showMessage("trans-msg", "❌ Receiver account not found!", "error");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    showMessage("trans-msg", "⚠️ Invalid amount!", "error");
    return;
  }

  if (amount > from.balance) {
    showMessage("trans-msg", "🚫 Insufficient balance!", "error");
    return;
  }

  from.balance -= amount;
  to.balance += amount;

  from.history.push(`📤 Sent Rs.${amount} to ${to.accNumber}`);
  to.history.push(`📥 Received Rs.${amount} from ${from.accNumber}`);

  saveData();

  showMessage(
    "trans-msg",
    `🎉 Transfer Successful`,
    "success"
  );

  loadAccounts();
}

// ===============================
// CHECK BALANCE
// ===============================
function checkBalance() {

  const accNo = document.getElementById("bal-acc").value.trim();

  const acc = accounts.find(a => a.accNumber === accNo);

  if (!acc) {
    showMessage("bal-msg", "❌ Account not found!", "error");
    return;
  }

  showMessage(
    "bal-msg",
    `💳 Balance: Rs.${acc.balance}`,
    "success"
  );
}

// ===============================
// DELETE ACCOUNT
// ===============================
function deleteAccount(accNumber) {

  const confirmDelete = confirm(
    `Delete account ${accNumber}?`
  );

  if (!confirmDelete) return;

  accounts = accounts.filter(a => a.accNumber !== accNumber);

  saveData();

  loadAccounts();
}

// ===============================
// LOAD ACCOUNTS
// ===============================
function loadAccounts() {

  const container = document.getElementById("accounts-list");

  if (accounts.length === 0) {

    container.innerHTML = `
      <div class="empty-box">
         No Accounts Available
      </div>
    `;

    return;
  }

  container.innerHTML = accounts.map(a => `

    <div class="account-card">

      <div class="top">

        <h3>👤 ${a.name}</h3>

        <span class="badge">
          ${a.type.toUpperCase()}
        </span>

      </div>

      <p>🏦 Account No: ${a.accNumber}</p>

      <p>💰 Balance: <b>Rs.${a.balance}</b></p>

      <div class="history">

        <h4>📜 Recent Activity</h4>

        ${
          a.history
            .slice(-3)
            .reverse()
            .map(h => `<p>${h}</p>`)
            .join("")
        }

      </div>

      <button class="delete-btn"
        onclick="deleteAccount('${a.accNumber}')">
        🗑 Delete Account
      </button>

    </div>

  `).join("");
}

// ===============================
// DARK MODE
// ===============================
function toggleTheme() {

  document.body.classList.toggle("dark-mode");

}

// ===============================
// AUTO LOAD
// ===============================
window.onload = () => {
  loadAccounts();
};