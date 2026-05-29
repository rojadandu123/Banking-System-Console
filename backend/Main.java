import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Bank bank = new Bank();
        Scanner sc = new Scanner(System.in);

        System.out.println("==============================");
        System.out.println("   BANKING CONSOLE SYSTEM    ");
        System.out.println("==============================");

        while (true) {
            System.out.println("\n--- MENU ---");
            System.out.println("1. Create Account");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Transfer");
            System.out.println("5. Check Balance");
            System.out.println("6. View All Accounts");
            System.out.println("7. Delete Account");
            System.out.println("8. Exit");
            System.out.print("Choose option: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    System.out.print("Initial deposit: ");
                    double dep = sc.nextDouble();
                    sc.nextLine();
                    System.out.print("Type (savings/current): ");
                    String type = sc.nextLine();
                    bank.createAccount(name, dep, type);
                    break;

                case 2:
                    System.out.print("Account number: ");
                    String dAcc = sc.nextLine();
                    System.out.print("Amount: ");
                    double dAmt = sc.nextDouble();
                    bank.deposit(dAcc, dAmt);
                    break;

                case 3:
                    System.out.print("Account number: ");
                    String wAcc = sc.nextLine();
                    System.out.print("Amount: ");
                    double wAmt = sc.nextDouble();
                    bank.withdraw(wAcc, wAmt);
                    break;

                case 4:
                    System.out.print("From account: ");
                    String fAcc = sc.nextLine();
                    System.out.print("To account: ");
                    String tAcc = sc.nextLine();
                    System.out.print("Amount: ");
                    double tAmt = sc.nextDouble();
                    bank.transfer(fAcc, tAcc, tAmt);
                    break;

                case 5:
                    System.out.print("Account number: ");
                    String bAcc = sc.nextLine();
                    double bal = bank.checkBalance(bAcc);
                    if (bal >= 0)
                        System.out.println("Balance: Rs." + bal);
                    else
                        System.out.println("Account not found!");
                    break;

                case 6:
                    if (bank.getAllAccounts().isEmpty()) {
                        System.out.println("No accounts found.");
                    } else {
                        for (Account acc : bank.getAllAccounts()) {
                            System.out.println(acc);
                        }
                    }
                    break;

                case 7:
                    System.out.print("Account number to delete: ");
                    String delAcc = sc.nextLine();
                    bank.deleteAccount(delAcc);
                    break;

                case 8:
                    System.out.println("Goodbye!");
                    sc.close();
                    System.exit(0);
                    break;

                default:
                    System.out.println("Invalid option!");
            }
        }
    }
}