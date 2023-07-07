import productActions from "../products/actions";
import csv from "../../api/services/csv";

const csvActions = {
  UPLOAD_CSV_PRODUCTS_FILE: "UPLOAD_CSV_PRODUCTS_FILE",
  UPLOAD_CSV_CUSTOMERS_FILE: "UPLOAD_CSV_CUSTOMERS_FILE",
  HANDLE_CSV_MODAL: "HANDLE_CSV_MODAL",
  uploadCsvProductsFile: (formData, adminId) => {
    return (dispatch) => {
      // Dispatch an action to update the CSV file name and size
      dispatch({
        type: csvActions.UPLOAD_CSV_PRODUCTS_FILE,
        payload: {
          name: formData.get("csvFile").name,
          size: formData.get("csvFile").size,
        },
      });

      // Access the file from formData using formData.get("csvFile")

      csv.uploadCsvProductsFile(formData, adminId, (response) => {
        if (response.status === "success") {
          console.log("file uploaded");
          dispatch(productActions.getAllProducts(adminId));
        } else {
          console.log("Error occurred in getting customers");
        }
      });
    };
  },
  uploadCsvCustomersFile: (formData, adminId) => {
    return (dispatch) => {
      // Dispatch an action to update the CSV file name and size
      dispatch({
        type: csvActions.UPLOAD_CSV_CUSTOMERS_FILE,
        payload: {
          name: formData.get("csvFile").name,
          size: formData.get("csvFile").size,
        },
      });

      // Access the file from formData using formData.get("csvFile")

      csv.uploadCsvCustomersFile(formData, adminId, (response) => {
        if (response.status === "success") {
          console.log("file uploaded");
          dispatch(productActions.getAllProducts(adminId));
        } else {
          console.log("Error occurred in getting customers");
        }
      });
    };
  },
  handleCsvModel: (open) => {
    return (dispatch) => {
      dispatch({
        type: csvActions.HANDLE_CSV_MODAL,
        payload: open,
      });
    };
  },
};

export default csvActions;
