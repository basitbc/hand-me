import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";

function TransactionInvoice({ account }) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const completedPayments = account.orders.filter(
        (order) => order.orderId?.paymentStatus === "completed"
      );
      const pendingPayments = account?.orders?.filter(
        (order) => order.orderId?.paymentStatus === "pending"
      );

      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              h1 {
                font-weight: bold;
                text-align: center;
              }
              .header {
                margin-bottom: 20px;
              }
              .table-container {
                display: flex;
                flex-direction: row;
              }
              table {
                flex-basis: 50%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
              .total-row {
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <h1>K2Implex</h1>
            <h1>Ledger</h1>
            <table>
              <tr>
                <th><strong>Name:</strong></th>
                <td>${account?.customerId?.name}</td> 
              </tr>
              <tr>
                <th>Company:</th>
                <td>${account?.customerId?.companyName}</td>
              </tr>
              <tr>
                <th>Outstanding Amount</th>
                <td>₹ ${account?.outstandingAmount?.toLocaleString(
                  "en-IN"
                )}</td>
              </tr>
            </table>
            
            <div class="table-container">
              <table>
                <tr>
                  <th>Debit Section</th>
                </tr>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Amount</th>
                </tr>
                ${completedPayments
                  .map(
                    (order) => `
                  <tr>
                    <td>${order?.orderId?.orderId}</td>
                    <td>${new Date(
                      order?.orderId?.createdAt
                    )?.toLocaleString()}</td>
                    <td>${order?.orderId?.totalAmount?.toLocaleString(
                      "en-IN"
                    )}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="2">Total Debit:</td>
                  <td>${completedPayments
                    .reduce(
                      (sum, order) => sum + order?.orderId?.totalAmount,
                      0
                    )
                    ?.toLocaleString("en-IN")}</td>
                </tr>
              </table>

              <table>
                <tr>
                  <th>Credit Section</th>
                </tr>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Amount</th>
                </tr>
                ${pendingPayments
                  .map(
                    (order) => `
                  <tr>
                    <td>${order?.orderId?.orderId}</td>
                    <td>${new Date(
                      order?.orderId?.createdAt
                    )?.toLocaleString()}</td>
                    <td>${order?.orderId?.totalAmount?.toLocaleString(
                      "en-IN"
                    )}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="2">Total Credit:</td>
                  <td>${pendingPayments
                    .reduce(
                      (sum, order) => sum + order?.orderId?.totalAmount,
                      0
                    )
                    ?.toLocaleString("en-IN")}</td>
                </tr>
              </table>
            </div>

            <footer>
              <p>Thank you for your business!</p>
            </footer>
          </body>
        </html>
      `;

      const options = {
        html,
        fileName: `invoice_${account.customerId.companyName}`,
        directory: "Invoices",
      };
      const file = await RNHTMLtoPDF.convert(options);

      Alert.alert("Success", `PDF saved to ${file.filePath}`);
      setCount(count + 1);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Generating PDF...</Text>;
  }

  return (
    <TouchableOpacity onPress={generatePDF} style={styles.generateButton}>
      <Text style={styles.generateButtonText}>Generate Ledger</Text>
    </TouchableOpacity>
  );
}
export default TransactionInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aac",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
  button: {
    backgroundColor: "#6c8ee3",
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  generateButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
  },
});
