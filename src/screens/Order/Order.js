import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import OrderList from "../../components/OrderList";
import { Orders } from "../../constants/Constants";
import Card from "../../components/OrderCard";
import HeaderMenu from "../../components/HeaderMenu";
import { connect } from "react-redux";
import orderActions from "../../redux/orders/actions";

const Order = (props) => {
  const { getAllOrders, route, auth, order } = props;
  useEffect(() => {
    getAllOrders(auth?.customer?.user?._id);
    console.log(order?.orders?.data?.products, "orders");
  }, []);

  const orders = order?.orders;

  const onRenderItem = ({ item }) => {
    return (
      <OrderList
        item={item}
        orderNo={item?.orderId}
        totalAmount={item?.totalAmount}
        status={item?.status}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        title="My Orders"
        isFilter={true}
        isCart={true}
        isSetting={false}
      />
      <View style={styles.subContainer}>
        <Card customStyle={styles.headingBorder}>
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.headingText}>{"ORDER NO."}</Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.headingText}>{"Total Amount"}</Text>
            </View>
            <View style={{ flex: 0.25 }}>
              <Text style={styles.headingText}>{"Status"}</Text>
            </View>
            <View style={{ flex: 0.15 }}>
              <Text style={styles.headingText}>{"Action"}</Text>
            </View>
          </View>
        </Card>
        <FlatList data={order?.orders?.data} renderItem={onRenderItem} />

        <View />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  priceList: state.priceList,
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: (customerId) => dispatch(orderActions.getAllOrders(customerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {},
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  selector: {
    marginTop: 10,
    width: "78%",
    alignSelf: "center",
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
