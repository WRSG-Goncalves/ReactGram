import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/Colors";
import { normalize } from "../../../utils";

export default StyleSheet.create({
  text: {
    color: Colors.Red,
    fontSize: normalize(12),
    width: "100%",
    alignSelf: "center"
  }
});
