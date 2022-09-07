import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { GutterSizes } from "../../constants/GutterSizes";
import { normalize } from "../../utils";

const styles = StyleSheet.create({
  header: {
    height: normalize(120),
    width: "100%",
    backgroundColor: Colors.Primary,
  },
  headerTitle: {
    color: Colors.LightGray,
    marginHorizontal: GutterSizes.xs,
    fontSize: normalize(32),
    fontWeight: "100",
  },
  button: {
    marginVertical: GutterSizes.sm,
    paddingVertical: GutterSizes.md,
    borderRadius: normalize(5),
    width: "100%",
    backgroundColor: Colors.Primary,
  },
  buttonText: {
    marginHorizontal: GutterSizes.xs,
    color: Colors.LightGray,
    fontSize: normalize(20),
  },
  keepDataContainer: {
    width: "100%",
    marginBottom: GutterSizes.md,
  },
  forgotPassword: {
    color: Colors.Secondary,
  },
  keepDataText: {
    color: Colors.Gray,
  },
  container: {
    paddingHorizontal: GutterSizes.sm,
  },
});
export default styles;
