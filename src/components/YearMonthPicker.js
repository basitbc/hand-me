import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import accountActions from "../redux/accounts/actions";

const YearMonthPicker = (props) => {
  const { auth, getCustomerAccount } = props;
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = new Date().getMonth().toString();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleDateConfirm = () => {
    // Handle the selected year and month here
    const selectedDate = `${selectedYear}/${selectedMonth}`;
    console.log("Selected Date:", selectedDate);
    getCustomerAccount(auth?.customer?.user?._id, selectedYear, selectedMonth);
  };

  const renderYearPicker = () => {
    const years = Array.from({ length: 50 }, (_, index) =>
      (new Date().getFullYear() - index).toString()
    );

    return (
      <Picker selectedValue={selectedYear} onValueChange={handleYearChange}>
        {years.map((year) => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
    );
  };

  const renderMonthPicker = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <Picker selectedValue={selectedMonth} onValueChange={handleMonthChange}>
        {months.map((month, index) => (
          <Picker.Item key={index} label={month} value={index.toString()} />
        ))}
      </Picker>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 1 }}>{renderYearPicker()}</View>
      <View style={{ flex: 1 }}>{renderMonthPicker()}</View>
      <Ionicons
        name="filter"
        size={24}
        color="black"
        style={{ marginLeft: 8 }}
        onPress={handleDateConfirm}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  getCustomerAccount: (customerId, selectedYear, selectedMonth) =>
    dispatch(
      accountActions.getCustomerAccount(customerId, selectedYear, selectedMonth)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(YearMonthPicker);
