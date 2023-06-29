import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import Input from "../../components/Input";
import DropDownPicker from "react-native-dropdown-picker";
import { BtnGroup } from "../../components/ButtonGroup";
import ProductCard from "../../components/ProductCard";
import { Orders, serviceCategory } from "../../constants/Constants";
import OrderList from "../../components/OrderList";
import { connect } from "react-redux";
import accountActions from "../../redux/accounts/actions";
import Card from "../../components/OrderCard";
import OrderInvoice from "../../components/OrderInvoice";
import TransactionInvoice from "../../components/TransactionInvoice";
import YearMonthPicker from "../../components/YearMonthPicker";

const Transaction = (props) => {
  const { getCustomerAccount, auth, account } = props;
  const [selection, setSelection] = useState(1);
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth().toString();
  useEffect(() => {
    getCustomerAccount(auth?.customer?.user?._id, currentYear, currentMonth);
  }, []);
  const filteredOrders =
    selection === 1
      ? account?.account?.orders?.filter(
          (order) => order.orderId?.paymentStatus === "completed"
        )
      : account?.account?.orders?.filter(
          (order) => order.orderId?.paymentStatus === "pending"
        );

  const totalAmount = account?.account?.orders?.reduce(
    (sum, order) => sum + order?.orderId?.totalAmount,
    0
  );

  const onRenderItem = ({ item }) => {
    return (
      <OrderList
        item={item}
        orderNo={item?.orderId.orderId}
        totalAmount={item?.orderId?.totalAmount}
        status={item?.orderId?.paymentStatus}
        usedIn="Transaction"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.inputContainer}>
            <Text style={{ color: "black", fontSize: 22, fontWeight: 900 }}>
              Total Order
            </Text>
            <Text style={{ color: "green", fontSize: 32 }}>
              ₹ {totalAmount > 0 ? totalAmount?.toLocaleString("en-IN") : 0}
            </Text>
          </View>

          <View>
            <View style={styles.btnGroup}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  selection === 1 ? { backgroundColor: "#CE9528" } : null,
                ]}
                onPress={() => setSelection(1)}
              >
                <Text
                  style={[
                    styles.btnText,
                    selection === 1 ? { color: "white" } : null,
                  ]}
                >
                  Paid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  selection === 2 ? { backgroundColor: "#CE9528" } : null,
                ]}
                onPress={() => setSelection(2)}
              >
                <Text
                  style={[
                    styles.btnText,
                    selection === 2 ? { color: "white" } : null,
                  ]}
                >
                  Outstanding
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.subContainer}>
            <Card customStyle={styles.headingBorder}>
              <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                <View style={{ flex: 0.3 }}>
                  <Text style={styles.headingText}>{"ORDER NO."}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text style={styles.headingText}>{"Total Amount"}</Text>
                </View>
                <View style={{ flex: 0.3 }}>
                  <Text style={styles.headingText}>{"Status"}</Text>
                </View>
              </View>
            </Card>
            {filteredOrders?.length > 0 ? (
              <FlatList data={filteredOrders} renderItem={onRenderItem} />
            ) : (
              <Text style={styles.noTransactionsText}>
                No transactions found.
              </Text>
            )}
          </View>
          <View />
        </View>
      </ScrollView>
      <TransactionInvoice account={account?.account} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerAccount: (customerId, currentYear, currentMonth) =>
    dispatch(
      accountActions.getCustomerAccount(customerId, currentYear, currentMonth)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {},
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#6B7280',
  },
  btn: {
    flex: 1,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: "#6B7280",
    backgroundColor: "#595959",
    borderRadius: 12,
    margin: 5,
  },
  btnText: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 14,
    color: "#fff",
  },
  headingBorder: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
  noTransactionsText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
