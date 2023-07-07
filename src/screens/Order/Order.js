import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import OrderList from "../../components/OrderList";
import { Orders } from "../../constants/Constants";
import Card from "../../components/OrderCard";
import HeaderMenu from "../../components/HeaderMenu";
import { connect } from "react-redux";
import orderActions from "../../redux/orders/actions";

const Order = (props) => {
  const { getAllOrders, route, auth, order, navigation } = props;
  useEffect(() => {
    getAllOrders(auth?.customer?.user?._id);
  }, []);

  const orders = order?.orders;

  const onRenderItem = ({ item }) => {
    return (
      <OrderList
        item={item}
        orderNo={item?.orderId}
        totalAmount={item?.totalAmount}
        status={item?.status}
        usedIn="Order"
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
        navigation={navigation}
        isBack={true}
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
        {orders?.data?.length > 0 ? (
          <FlatList data={orders.data} renderItem={onRenderItem} />
        ) : (
          <Text style={styles.noOrdersText}>No orders found.</Text>
        )}
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
  noOrdersText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
