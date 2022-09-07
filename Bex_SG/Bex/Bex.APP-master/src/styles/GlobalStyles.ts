import { StyleSheet } from "react-native";
import { GutterSizes } from "../constants/GutterSizes";

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  justifyCenter: {
    justifyContent: "center"
  },
  justifySpaceBetween: {
    justifyContent: "space-between"
  },
  alignCenter: {
    alignItems: "center"
  },
  alignEnd: {
    alignItems: "flex-end"
  },
  alignSelfEnd: {
    alignSelf: "flex-end",
  },
  textAlignRight: {
    textAlign: "right"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  marginTopXs: {
    marginTop: GutterSizes.xs
  },
  marginRightXs: {
    marginRight: GutterSizes.xs
  },
  marginRightSm:{
    marginRight: GutterSizes.sm
  },
  marginRightMd:{
    marginRight: GutterSizes.md
  },
  manginLeftSm:{
    marginLeft: GutterSizes.sm
  },
  marginLeftXsm:{
    marginLeft: GutterSizes.xs
  },
  marginLeftMd:{
    marginLeft: GutterSizes.md
  },
  marginTopSm:{
    marginTop: GutterSizes.sm
  },
  marginBotSm:{
    marginBottom: GutterSizes.sm
  },
  fullWidth:{
    width:'100%'
  },
  ninetyWidth:{
    width:'90%'
  },
  seventyWidth: {
    width: '70%'
  },
  paddingBot: {
    paddingBottom: 15
  },
  fontWeightBold: {
    fontWeight: 'bold'
  },
  borderRadius: {
    borderRadius: 8
  }
});
