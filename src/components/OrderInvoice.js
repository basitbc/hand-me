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

function OrderInvoice({ order }) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const html = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 12px;
              }
              header, footer {
                height: 50px;
                background-color: #fff;
                color: #000;
                display: flex;
                justify-content: center;
                padding: 0 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>Invoice for Order #${count}</h1>
            </header>
            <h1>Order Details</h1>
            <table>
              <tr>
                <th>Order ID</th>
                <td>${order.orderId}</td> 
              </tr>
              <tr>
                <th>Order Date</th>
                <td>${new Date(order.createdAt)?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Order Status</th>
                <td>${order.status}</td>
              </tr>
              <tr>
                <th>Total Order Amount</th>
                <td>$${order?.totalAmount}</td>
              </tr>
            </table>
            <h1>Products</h1>
            <table>
              <tr>
                <th>S. no</th>
                <th>Product Name</th>
                <th>Product Qty</th>
                <th>Cost</th>
                <th>Total Price</th>
              </tr>
              ${order.products
                .map(
                  (line, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${line.productId.name}</td>
                  <td>${line.quantity}</td>
                  <td>$${line.productId.defaultprice}</td>
                  <td>$${line.productId.defaultprice * line.quantity}</td>
                </tr>
              `
                )
                .join("")}
            </table>
            <footer>
              <p>Thank you for your business!</p>
            </footer>
          </body>
        </html>
      `;
      const options = {
        html,
        fileName: `invoice_${order.orderId}`,
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
      <Text style={styles.generateButtonText}>Generate Invoice</Text>
    </TouchableOpacity>
  );
}

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
    marginTop: 20,
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OrderInvoice;
