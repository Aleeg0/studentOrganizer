import { StyleSheet } from "react-native";

export default StyleSheet.create({
  content: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    minHeight: 50,
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: "#F5F5F7",
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    columnGap: 8,
  },
  divider: {
    height: "100%",
    width: 8,
    borderRadius: 10,
  },
  times: {
    alignItems: "flex-end",
  },
  startTime: {
    fontSize: 16,
  },
  endTime: {
    fontSize: 13,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  description: {
    fontSize: 16,
    color: "#878787",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: 54,
    width: 54,
    borderRadius: "100%",
  },
});
