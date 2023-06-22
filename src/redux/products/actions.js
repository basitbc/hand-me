import products from "../../api/services/products";

const productActions = {
  GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
  UPDATE_LOADING: "UPDATE_LOADING",
  UPDATE_MODE: "UPDATE_MODE",
  UPDATE_PRODUCT_ID: "UPDATE_PRODUCT_ID",
  UPDATE_PRODUCT_DATA: "UPDATE_PRODUCT_DATA",
  RESET_STATE: "RESET_STATE",

  getAllProducts: (adminId) => {
    return (dispatch) => {
      dispatch({
        type: productActions.UPDATE_LOADING,
        payload: true,
      });

      products.getAllProducts(adminId, (response) => {
        if (response.status === "success") {
          dispatch({
            type: productActions.GET_ALL_PRODUCTS,
            payload: response.data,
          });
          dispatch({
            type: productActions.UPDATE_LOADING,
            payload: false,
          });
        } else {
          console.log("Error occurred in getting products");
        }
      });
    };
  },

  deleteProduct: (productId, adminId) => {
    return (dispatch) => {
      products.deleteProduct(productId, (response) => {
        if (response.status === "success") {
          dispatch(productActions.getAllProducts(adminId));
        } else {
          console.log("Error occurred in creating the product");
        }
      });
    };
  },

  addProduct: (newProductData) => {
    return (dispatch) => {
      products.addProduct(newProductData, (response) => {
        if (response.status === "success") {
          dispatch(productActions.getAllProducts(newProductData?.adminId));
        } else {
          console.log("Error occurred in creating the product");
        }
      });
    };
  },
  updateProduct: (productId, updatedProductData) => {
    return (dispatch) => {
      products.updateProduct(productId, updatedProductData, (response) => {
        if (response.status === "success") {
          dispatch(productActions.getAllProducts(updatedProductData?.adminId));
        } else {
          console.log("Error occurred in updating the product");
        }
      });
    };
  },
  updateLoading: () => ({ type: productActions.UPDATE_LOADING }),
  updateMode: (updatedMode) => ({
    type: productActions.UPDATE_MODE,
    payload: updatedMode,
  }),
  updateProductId: (updatedProductId) => ({
    type: productActions.UPDATE_PRODUCT_ID,
    payload: updatedProductId,
  }),
  updateProductData: (updatedProductData) => ({
    type: productActions.UPDATE_PRODUCT_DATA,
    payload: updatedProductData,
  }),
  resetState: () => ({
    type: productActions.RESET_STATE,
  }),
};

export default productActions;
