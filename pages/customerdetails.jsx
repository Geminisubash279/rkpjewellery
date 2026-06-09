import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import { View, Text, Image, StyleSheet, Button, Alert, BackHandler, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider,  Appbar,  Card, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

export default function CustomerPage({ navigation }) {

const [CustomerName,setCustomerName] = useState("");
const [StreetName,setStreetName] = useState("");
const [Area,setArea] = useState("");
const [City,setCity] = useState("");
const [State,setState] = useState("");
const [Mobile,setMobile] = useState("");
const [Password,setPassword] = useState("");
const [otp, setOtp] = useState("");
const [otpSent, setOtpSent] = useState(false);
const [Empid, setEmpid] = useState("");
const [Location, setLocation] = useState("");
const [customerExists, setCustomerExists] = useState(false);

useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
  return () => backHandler.remove();
}, []);

useFocusEffect(
  React.useCallback(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation])
);

const handleMobileChange = async (text) => {
  const numeric = text.replace(/[^0-9]/g, '');
  setMobile(numeric);
  setCustomerExists(false);
  if (numeric.length === 10) {
    try {
      const res = await fetch(`${BASE_URL}/checkcustomer?mobile=${numeric}`);
      const data = await res.json();
      if (data.exists) {
        const c = data.customer;
        setCustomerName(c.CustomerName || '');
        setStreetName(c.StreetName || '');
        setArea(c.Area || '');
        setCity(c.City || '');
        setState(c.State || '');
        setCustomerExists(true);
        Alert.alert('Customer Found', `Welcome back, ${c.CustomerName}!`);
      }
    } catch (e) { console.log(e); }
  }
};

const sendOtp = async () => {

  if (Mobile.length !== 10) {
    Alert.alert("Enter valid mobile number");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: Mobile
      })
    });

    const data = await res.json();

    if (data.success) {
      setOtpSent(true);
      Alert.alert("OTP sent to mobile");
    } else {
      Alert.alert("Failed to send OTP");
    }

  } catch (err) {
    console.log(err);
    Alert.alert("Server error");
  }
};

const verifyOtpAndSave = async () => {

  try {
    const res = await fetch(`${BASE_URL}/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: Mobile,
        otp: otp
      })
    });

    const data = await res.json();

    if (!data.success) {
      Alert.alert("Invalid OTP");
      return;
    }

    // ✅ OTP correct → Save customer
    const response = await fetch(`${BASE_URL}/addCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CustomerName,
        StreetName,
        Area,
        City,
        State,
        Mobile,
        Password,
        Empid,
        Location
      })
    });

    const result = await response.json();

    if (result.status === "success") {
      Alert.alert("Successfully Registered");
      navigation.navigate("Login");
    } else {
      Alert.alert("Error saving customer");
    }

  } catch (err) {
    console.log(err);
    Alert.alert("Server error");
  }
};

const saveCustomer = async () => {

  if (Mobile.length !== 10) {
    Alert.alert("Enter valid mobile number");
    return;
  }

  if (Password.length < 4) {
    Alert.alert("Validation", "Pin must be at 4 Numbers");
    return;
  }

  if (CustomerName.trim() === "") {
    Alert.alert("Validation", "Customer Name cannot be empty");
    return;
  }

  if (Location === "") {
  Alert.alert("Please select location");
  return;
}



  try {

    const response = await fetch(`${BASE_URL}/addCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CustomerName,
        StreetName,
        Area,
        City,
        State,
        Mobile,
        Password,
        Empid,
        Location
      })
    });

    const data = await response.json();   // ⭐ convert response to JSON

    if (data.status === "success") {
      Alert.alert("Successfully Registered");
      navigation.navigate("Login");
    }
    else {
      Alert.alert("Error saving customer");
    }

  } catch (err) {
    console.log(err);
    Alert.alert("Server error");
  }

};

  const _goBack = () => {
    navigation.navigate("Login");
  };


return (
  <ScrollView 
    style={{ flex: 1, backgroundColor: '#fff' }}
    contentContainerStyle={styles.container}
    keyboardShouldPersistTaps="handled"
  >
    
    <Text style={styles.Heading}>Customer Profile</Text>
    <TextInput mode="outlined" label="Mobile" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" keyboardType="numeric" maxLength={10} value={Mobile} onChangeText={handleMobileChange}/>
    <TextInput mode="outlined" label="Customer Name" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" value={CustomerName} onChangeText={setCustomerName}/>
    <TextInput mode="outlined" label="Street Name" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" value={StreetName} onChangeText={setStreetName}/>
    <TextInput mode="outlined" label="Area" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" value={Area} onChangeText={setArea}/>
    <TextInput mode="outlined" label="City" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" value={City} onChangeText={setCity}/>
    <TextInput mode="outlined" label="State" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" value={State} onChangeText={setState}/>
    <TextInput mode="outlined" label="Employee ID(Optional)" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" onChangeText={setEmpid}/>
    <Text style={{ marginTop: 10, marginBottom: 5, color: '#7B5C00', fontWeight: 'bold' }}>Location</Text>
    <View style={{ borderWidth: 1, borderColor: '#7B5C00', borderRadius: 5, marginBottom: 10, backgroundColor: '#fff' }}>
      <Picker
        selectedValue={Location}
        onValueChange={(itemValue) => setLocation(itemValue)}
        style={{ color: '#000', height: 50 }}
        dropdownIconColor="#7B5C00"
      >
        <Picker.Item label="Select Location" value="" />
        <Picker.Item label="In Showroom" value="In showroom" />
        <Picker.Item label="At Home / Canvass" value="At home/canvass" />
      </Picker>
    </View>
    {Location !== "" && (
      <Text style={{ color: '#7B5C00', marginBottom: 5 }}>Selected: {Location}</Text>
    )}
    <TextInput mode="outlined" label="Password (4 digit PIN)" textColor="#000" style={styles.input} outlineColor="#7B5C00" activeOutlineColor="#7B5C00" keyboardType="numeric" secureTextEntry onChangeText={setPassword}/>
    
    {/* OTP Section */}
    {!otpSent ? (
      <View style={styles.fullButton}>
        <Button title="Send OTP" onPress={sendOtp} />
      </View>
    ) : (
      <View style={styles.otpContainer}>
        <TextInput
          mode="outlined"
          label="Enter OTP"
          textColor="#000"
          style={styles.input}
          outlineColor="#7B5C00"
          activeOutlineColor="#7B5C00"
          keyboardType="numeric"
          onChangeText={setOtp}
        />
        <View style={styles.fullButton}>
          <Button title="Verify & Register" onPress={verifyOtpAndSave} />
        </View>
      </View>
    )}

    {/* Close Button */}
    <View style={styles.fullButton}>
      <Button title="Close" onPress={_goBack} />
    </View>

  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },

  input: {
    marginBottom: 10,
    backgroundColor: "#fff"
  },

  Heading: {
    color: '#7B5C00',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15
  },

  otpContainer: {
    marginTop: 10
  },

  fullButton: {
    marginTop: 10
  }
});
