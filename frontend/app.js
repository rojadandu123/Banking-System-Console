// Since this is plain Java backend (no HTTP server),
// we simulate the banking system fully in JavaScript
// for the frontend demo.

let accounts = [];
let counter  = 1000;

// --- Create Account ---
function createAccount() {
  const name    = document.getElementById('create-name').value.trim();
  const deposit = parseFloat(document.getElementById('create-deposit').value);
  const type    = document.getElementById('create-type').value;
  const msg     = document.getElementById('create-msg');

  if (!name)          { msg.style.color='red'; msg.textContent='Enter your name!'; return; }
  if (isNaN(deposit) || deposit <= 0) { msg.style.color='red'; msg.textContent='Enter valid deposit!'; return; }

  counter++;
  const accNumber = 'ACC' + counter;
  accounts.push({ accNumber, name, balance: deposit, type });

  msg.style.color = 'green';
  msg.textContent = `Account created! Your account number: ${accNumber}`;

  document.getElementById('create-name').value    = '';
  document.getElementById('create-deposit').value = '';
}

// --- Deposit ---
function deposit() {
  const accNo  = document.getElementById('dep-acc').value.trim();
  const amount = parseFloat(document.getElementById('dep-amt').value);
  const msg    = document.getElementById('dep-msg');

  const acc = accounts.find(a => a.accNumber === accNo);
  if (!acc)            { msg.style.color='red'; msg.textContent='Account not found!'; return; }
  if (isNaN(amount) || amount <= 0) { msg.style.color='red'; msg.textContent='Enter valid amount!'; return; }

  acc.balance += amount;
  msg.style.color = 'green';
  msg.textContent = `Deposited Rs.${amount}. New balance: Rs.${acc.balance}`;
}

// --- Withdraw ---
function withdraw() {
  const accNo  = document.getElementById('wit-acc').value.trim();
  const amount = parseFloat(document.getElementById('wit-amt').value);
  const msg    = document.getElementById('wit-msg');

  const acc = accounts.find(a => a.accNumber === accNo);
  if (!acc)   { msg.style.color='red'; msg.textContent='Account not found!'; return; }
  if (isNaN(amount) || amount <= 0) { msg.style.color='red'; msg.textContent='Enter valid amount!'; return; }
  if (amount > acc.balance) { msg.style.color='red'; msg.textContent='Insufficient balance!'; return; }

  acc.balance -= amount;
  msg.style.color = 'green';
  msg.textContent = `Withdrawn Rs.${amount}. New balance: Rs.${acc.balance}`;
}

// --- Transfer ---
function transfer() {
  const fromNo = document.getElementById('trans-from').value.trim();
  const toNo   = document.getElementById('trans-to').value.trim();
  const amount = parseFloat(document.getElementById('trans-amt').value);
  const msg    = document.getElementById('trans-msg');

  const from = accounts.find(a => a.accNumber === fromNo);
  const to   = accounts.find(a => a.accNumber === toNo);

  if (!from) { msg.style.color='red'; msg.textContent='From account not found!'; return; }
  if (!to)   { msg.style.color='red'; msg.textContent='To account not found!'; return; }
  if (isNaN(amount) || amount <= 0) { msg.style.color='red'; msg.textContent='Enter valid amount!'; return; }
  if (amount > from.balance) { msg.style.color='red'; msg.textContent='Insufficient balance!'; return; }

  from.balance -= amount;
  to.balance   += amount;
  msg.style.color = 'green';
  msg.textContent = `Transferred Rs.${amount} from ${fromNo} to ${toNo} successfully!`;
}

// --- Check Balance ---
function checkBalance() {
  const accNo = document.getElementById('bal-acc').value.trim();
  const msg   = document.getElementById('bal-msg');

  const acc = accounts.find(a => a.accNumber === accNo);
  if (!acc) { msg.style.color='red'; msg.textContent='Account not found!'; return; }

  msg.style.color = 'green';
  msg.textContent = `Balance for ${acc.name}: Rs.${acc.balance}`;
}

// --- Load All Accounts ---
function loadAccounts() {
  const container = document.getElementById('accounts-list');
  if (accounts.length === 0) {
    container.innerHTML = '<p>No accounts yet. Create one first!</p>';
    return;
  }
  container.innerHTML = accounts.map(a => `
    <div class="account-card">
      <h3>${a.name} — ${a.accNumber}</h3>
      <p>Type: ${a.type}</p>
      <p>Balance: Rs.${a.balance}</p>
    </div>
  `).join('');
}