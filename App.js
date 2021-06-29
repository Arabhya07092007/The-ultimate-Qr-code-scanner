import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScanScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "hello world",
      buttonState: "normal",
    };
  }

  getCameraPermissioms = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };

  handleBarCodeScanned = async (type, data) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: "normal",
    });
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            style={styles.img}
            source={{
              uri: "https://st4.depositphotos.com/4177785/22160/v/1600/depositphotos_221609600-stock-illustration-wireless-barcode-scanning-linear-icon.jpg",
            }}
          />

          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : "The ultimate Scanner"}
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={this.getCameraPermissioms}
          >
            <Text style={styles.txt}>Scan Qr code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderColor: "black",
    marginTop: 60,
    borderRadius: 80,
  },
  btn: {
    width: "60%",
    backgroundColor: "skyblue",
    borderRadius: 10,
    alignSelf: "center",
  },
  txt: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    padding: 10,
  },
  displayText: {
    fontSize: 20,
    textAlign: "center",
  },
});
