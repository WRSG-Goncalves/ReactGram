import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { normalize } from "../../utils";
import { GutterSizes } from "../../constants/GutterSizes";

export default StyleSheet.create({
  container: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Primary,
    paddingHorizontal: normalize(GutterSizes.sm + 4),
    paddingVertical: normalize(GutterSizes.sm),
    width: "100%",
    marginVertical: normalize(GutterSizes.xs),
    fontSize: normalize(14)
  },
  error: {
    borderColor: Colors.Red
  }
});
