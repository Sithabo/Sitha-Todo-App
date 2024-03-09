import { StyleSheet, Text } from "react-native";

export const TitleText = ({ children }) => {
  return <Text style={styles.TitleText}>{children}</Text>;
};

export const GreySubText = ({ children }) => {
  return <Text style={styles.greySubText}>{children}</Text>;
};

const styles = StyleSheet.create({
  TitleText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1e1e1edf",
  },
  greySubText: {
    color: "gray",
  },
});
