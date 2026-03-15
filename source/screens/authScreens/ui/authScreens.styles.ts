import { StyleSheet } from "react-native";
import { Color } from "expo-router";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.ios.systemBackground,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Color.ios.label,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Color.ios.secondaryLabel,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: Color.ios.secondarySystemBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: Color.ios.label,
    overflow: "hidden",
  },
  primaryButton: {
    backgroundColor: Color.ios.systemBlue,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: Color.ios.systemGray,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: Color.ios.systemRed,
    fontSize: 14,
    marginBottom: 16,
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Color.ios.label,
  },
  dividerText: {
    color: Color.ios.secondaryLabel,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: Color.ios.secondaryLabel,
    fontSize: 15,
  },
  loginBtn: {
    marginLeft: 4,
  },
  footerLink: {
    color: Color.ios.systemBlue,
    fontSize: 15,
    fontWeight: "600",
  },
});
