import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductList from "./productList";
import Card from "./ProductDetailsCard";

import OrderInvoice from "./OrderInvoice";

const OrdersInfoModal = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const generateInvoice = async (data) => {
    try {
      // Generate the PDF document
      const pdfDoc = await PDFDocument.create();

      // Create a new page in the PDF document
      const page = PDFPage.create();

      // Add the HTML content to the page
      page.drawHTML(orderInvoice, {
        x: 10,
        y: page.getHeight() - 10,
        width: page.getWidth() - 20,
      });

      // Add the page to the document
      pdfDoc.addPages(page);

      // Generate the PDF bytes
      const pdfBytes = await pdfDoc.save();

      // Get the directory to save the PDF file
      const directory =
        Platform.OS === "android"
          ? RNFetchBlob.fs.dirs.DownloadDir
          : RNFetchBlob.fs.dirs.DocumentDir;

      // Generate a unique filename for the invoice
      const fileName = "invoice.pdf";
      const filePath = `${directory}/${fileName}`;

      // Save the PDF file
      await RNFetchBlob.fs.writeFile(filePath, pdfBytes, "base64");

      // Check platform and request permissions if necessary
      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      }

      // Download the PDF file
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: "Invoice",
          description: "Downloading invoice...",
          mime: "application/pdf",
          path: filePath,
        },
      })
        .fetch("GET", filePath)
        .then((res) => {
          // File downloaded successfully
          console.log("Invoice downloaded:", res.path());
        })
        .catch((error) => {
          // Error downloading file
          console.error("Error downloading invoice:", error);
        });
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  const onRenderItem = ({ item }) => {
    return <ProductList item={item} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Ionicons name="information-circle-outline" size={23} color="#2196F3" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close-outline" size={24} color="#999" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Order Details</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Order ID:</Text>
              <Text style={styles.value}>{item?.orderId}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Payment Status:</Text>
              <Text style={styles.value}>{item?.paymentStatus}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{item?.status}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.value}>{item?.totalAmount}</Text>
            </View>
            <View>
              <Card customStyle={styles.headingBorder}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 0.3 }}>
                    <Text style={styles.headingText}>{"Product"}</Text>
                  </View>
                  <View style={{ flex: 0.2 }}>
                    <Text style={styles.headingText}>{"Quantity"}</Text>
                  </View>

                  <View style={{ flex: 0.2 }}>
                    <Text style={styles.headingText}>{"Cost"}</Text>
                  </View>
                  <View style={{ flex: 0.2 }}>
                    <Text style={styles.headingText}>{"Total"}</Text>
                  </View>
                </View>
              </Card>
            </View>
            <FlatList data={item.products} renderItem={onRenderItem} />

            <OrderInvoice order={item} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconContainer: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f5f5f5",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    flex: 2,
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
  headingText: {
    fontWeight: "900",
    fontSize: 11,
    lineHeight: 15,
    color: "#000000",
  },
  headingBorder: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
});

export default OrdersInfoModal;
