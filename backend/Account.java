public class Account {
    private String accountNumber;
    private String holderName;
    private double balance;
    private String accountType;

    public Account(String accountNumber, String holderName,
                   double balance, String accountType) {
        this.accountNumber = accountNumber;
        this.holderName    = holderName;
        this.balance       = balance;
        this.accountType   = accountType;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }
        balance += amount;
        System.out.println("Deposited: Rs." + amount);
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }
        if (amount > balance) {
            System.out.println("Insufficient balance!");
            return;
        }
        balance -= amount;
        System.out.println("Withdrawn: Rs." + amount);
    }

    public String getAccountNumber() { return accountNumber; }
    public String getHolderName()    { return holderName; }
    public double getBalance()       { return balance; }
    public String getAccountType()   { return accountType; }

    @Override
    public String toString() {
        return "Account No: " + accountNumber +
               " | Name: "    + holderName +
               " | Balance: Rs." + balance +
               " | Type: "    + accountType;
    }
}