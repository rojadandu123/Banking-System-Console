import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.List;

public class BankServer {
    static Bank bank = new Bank();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/accounts", new AccountsHandler());
        server.createContext("/api/create",   new CreateHandler());
        server.createContext("/api/deposit",  new DepositHandler());
        server.createContext("/api/withdraw", new WithdrawHandler());
        server.createContext("/api/transfer", new TransferHandler());
        server.createContext("/api/balance",  new BalanceHandler());
        server.createContext("/api/delete",   new DeleteHandler());

        server.start();
        System.out.println("Bank server running at http://localhost:8080");
    }

    static void sendResponse(HttpExchange ex, String response) throws IOException {
        ex.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        ex.getResponseHeaders().add("Content-Type", "application/json");
        byte[] bytes = response.getBytes();
        ex.sendResponseHeaders(200, bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }

    static String readBody(HttpExchange ex) throws IOException {
        InputStreamReader isr = new InputStreamReader(ex.getRequestBody());
        BufferedReader br = new BufferedReader(isr);
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) sb.append(line);
        return sb.toString();
    }

    static String getParam(String body, String key) {
        for (String part : body.split("&")) {
            String[] kv = part.split("=");
            if (kv.length == 2 && kv[0].equals(key)) return kv[1];
        }
        return "";
    }

    static class AccountsHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            List<Account> accounts = bank.getAllAccounts();
            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < accounts.size(); i++) {
                Account a = accounts.get(i);
                json.append("{")
                    .append("\"accNumber\":\"").append(a.getAccountNumber()).append("\",")
                    .append("\"name\":\"").append(a.getHolderName()).append("\",")
                    .append("\"balance\":").append(a.getBalance()).append(",")
                    .append("\"type\":\"").append(a.getAccountType()).append("\"")
                    .append("}");
                if (i < accounts.size() - 1) json.append(",");
            }
            json.append("]");
            sendResponse(ex, json.toString());
        }
    }

    static class CreateHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String body    = readBody(ex);
            String name    = getParam(body, "name");
            double deposit = Double.parseDouble(getParam(body, "deposit"));
            String type    = getParam(body, "type");
            Account acc    = bank.createAccount(name, deposit, type);
            sendResponse(ex, "{\"accNumber\":\"" + acc.getAccountNumber() + "\",\"message\":\"Account created!\"}");
        }
    }

    static class DepositHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String body   = readBody(ex);
            String accNo  = getParam(body, "accNumber");
            double amount = Double.parseDouble(getParam(body, "amount"));
            bank.deposit(accNo, amount);
            sendResponse(ex, "{\"message\":\"Deposited Rs." + amount + "\"}");
        }
    }

    static class WithdrawHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String body   = readBody(ex);
            String accNo  = getParam(body, "accNumber");
            double amount = Double.parseDouble(getParam(body, "amount"));
            bank.withdraw(accNo, amount);
            sendResponse(ex, "{\"message\":\"Withdrawn Rs." + amount + "\"}");
        }
    }

    static class TransferHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String body   = readBody(ex);
            String from   = getParam(body, "from");
            String to     = getParam(body, "to");
            double amount = Double.parseDouble(getParam(body, "amount"));
            bank.transfer(from, to, amount);
            sendResponse(ex, "{\"message\":\"Transfer successful!\"}");
        }
    }

    static class BalanceHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String query   = ex.getRequestURI().getQuery();
            String accNo   = query.replace("accNumber=", "");
            double balance = bank.checkBalance(accNo);
            sendResponse(ex, "{\"balance\":" + balance + "}");
        }
    }

    static class DeleteHandler implements HttpHandler {
        public void handle(HttpExchange ex) throws IOException {
            String body  = readBody(ex);
            String accNo = getParam(body, "accNumber");
            bank.deleteAccount(accNo);
            sendResponse(ex, "{\"message\":\"Account deleted!\"}");
        }
    }
}