import React, { FC } from "react";
import { View, Text, StyleSheet, TextInputProps } from "react-native";
import { Input } from "@rneui/themed";

type FormItemProps = {
  placeholder?: string;
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  inputStyle?: TextInputProps["style"];
  labelStyle?: TextInputProps["style"];
};

const FormItem: FC<FormItemProps> = ({
  placeholder,
  label,
  inputStyle,
  labelStyle,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.formItem}>
      <View style={[styles.inputContainer, inputStyle]}>
        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2.5,
  },
  labelContainer: {
    flex: 1,
  },
  label: { fontWeight: "500" },
});

export default FormItem;
