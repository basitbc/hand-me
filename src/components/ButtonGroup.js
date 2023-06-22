import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import priceListActions from "../redux/priceList/actions";
import { connect } from "react-redux";

const ButtonGroup = (props) => {
  const { setSelection, priceList } = props;

  return (
    <View style={styles.btnGroup}>
      <TouchableOpacity
        style={[
          styles.btn,
          priceList.selectedButton === 1
            ? { backgroundColor: "#CE9528" }
            : null,
        ]}
        onPress={() => setSelection(1)}
      >
        <Text
          style={[
            styles.btnText,
            priceList.selectedButton === 1 ? { color: "white" } : null,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          priceList.selectedButton === 2
            ? { backgroundColor: "#CE9528" }
            : null,
        ]}
        onPress={() => setSelection(2)}
      >
        <Text
          style={[
            styles.btnText,
            priceList.selectedButton === 2 ? { color: "white" } : null,
          ]}
        >
          Mumbai
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btn,
          priceList.selectedButton === 3
            ? { backgroundColor: "#CE9528" }
            : null,
        ]}
        onPress={() => setSelection(3)}
      >
        <Text
          style={[
            styles.btnText,
            priceList.selectedButton === 3 ? { color: "white" } : null,
          ]}
        >
          Delhi
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  priceList: state.priceList,
});

const mapDispatchToProps = (dispatch) => ({
  setSelection: (number) => dispatch(priceListActions.setSelection(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);

const styles = StyleSheet.create({
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
});
