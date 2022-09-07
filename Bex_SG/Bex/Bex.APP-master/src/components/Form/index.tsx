import React, { FunctionComponent } from "react";
import { View } from "react-native";
import styles from "./styles";

const Form: FunctionComponent<{}> = ({ children }) => {
  return <View style={styles.form}>{children}</View>;
};

export default Form;
