import { useState } from 'react';
import { InputFieldProps } from "@/types/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg font-semibold mb-3 ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border ${
              isFocused ? 'border-black' : 'border-neutral-100'
            } ${containerStyle}`} // Change border color based on focus state
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-5 font-semibold flex-1 text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              onFocus={() => setIsFocused(true)} // Set focus on input
              onBlur={() => setIsFocused(false)} // Remove focus when input loses focus
              placeholder={props.placeholder} // Ensure the placeholder is passed
              placeholderTextColor="#A9A9A9" // Set a contrasting color for the placeholder
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;