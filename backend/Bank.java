import java.util.ArrayList;
import java.util.List;

public class Bank {
    private List<Account> accounts = new ArrayList<>();
    private int accountCounter = 1000;

    public Account createAccount(String name, double initialDeposit, String type) {
        accountCounter++;
        String accNumber = "ACC" + accountCounter;
        Account acc = new Account(accNumber, name, initialDeposit, type);
        accounts.add(acc);
        System.out.println("Account created! Number: " + accNumber);
        return acc;
    }

    public Account findAccount(String accountNumber) {
        for (Account acc : accounts) {
            if (acc.getAccountNumber().equals(accountNumber)) {
                return acc;
            }
        }
        return null;
    }

    public void deposit(String accountNumber, double amount) {
        Account acc = findAccount(accountNumber);
        if (acc != null) acc.deposit(amount);
        else System.out.println("Account not found!");
    }

    public void withdraw(String accountNumber, double amount) {
        Account acc = findAccount(accountNumber);
        if (acc != null) acc.withdraw(amount);
        else System.out.println("Account not found!");
    }

    public void transfer(String fromAcc, String toAcc, double amount) {
        Account from = findAccount(fromAcc);
        Account to = findAccount(toAcc);
        if (from == null) {
            System.out.println("From account not found!");
            return;
        }
        if (to == null) {
            System.out.println("To account not found!");
            return;
        }
        if (from.getBalance() < amount) {
            System.out.println("Insufficient balance!");
            return;
        }
        from.withdraw(amount);
        to.deposit(amount);
        System.out.println("Transfer successful!");
    }

    public double checkBalance(String accountNumber) {
        Account acc = findAccount(accountNumber);
        if (acc != null) return acc.getBalance();
        return -1;
    }

    public List<Account> getAllAccounts() {
        return accounts;
    }

    public void deleteAccount(String accountNumber) {
        Account acc = findAccount(accountNumber);
        if (acc != null) {
            accounts.remove(acc);
            System.out.println("Account deleted: " + accountNumber);
        } else {
            System.out.println("Account not found!");
        }
    }
}