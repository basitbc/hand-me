import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Input from "../../components/Input";
import customerActions from "../../redux/customers/actions";

import { SafeAreaView } from "react-native-safe-area-context";
import HeaderMenu from "../../components/HeaderMenu";

const PersonalDetails = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { auth, updateCustomer, navigation } = props;

  useEffect(() => {
    setName(auth?.customer?.user?.name);
    setCompanyName(auth?.customer?.user?.companyName);
    setEmail(auth?.customer?.user?.email);
  }, []);

  const handleSubmit = () => {
    const formData = {
      companyName,
      name,
      email,
    };

    // Dispatch an action to save the form data
    updateCustomer(auth?.customer?.user?._id, formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu
        title="Personal Details"
        isFilter={true}
        isLogout={false}
        isCart={false}
        isBack={true}
        navigation={navigation}
      />
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={companyName}
            onChange={(text) => setCompanyName(text)}
            placeholder="Company Name"
          />
          <Input
            style={styles.input}
            value={name}
            onChange={(text) => setName(text)}
            placeholder="Name"
          />
          <Input
            style={styles.input}
            value={email}
            onChange={(text) => setEmail(text)}
            placeholder="Email"
          />
          <Button title="Update" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  customers: state.customers,
  auth: state?.auth,
});
// Map dispatch functions to props
const mapDispatchToProps = (dispatch) => ({
  updateCustomer: (id, data) =>
    dispatch(customerActions.updateCustomer(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
