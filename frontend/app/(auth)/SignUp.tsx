import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import Modal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));

      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI('/api/user', {
          method: "POST", 
          body: JSON.stringify({
              name: form.name, 
              email: form.email, 
              clerkId: completeSignUp.createdUserId
          })
      });        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.error[0].longMessage,
        state: "failed",
      });
    }
  };

  const handleLogin = () => {
    router.replace("/(auth)/SignIn");
  };

  const handleGoogleSignIn = async () => {};

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className=" z-0 w-full h-[250px]" />
          <Text className=" text-2xl text-black font-semibold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        {/* <View className='p-5 '>
        <InputField
        label="Name"
        placeholder='Enter Your Name'
        icon={icons.person}
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
        />
         <InputField
        label="Email"
        placeholder='Enter Your Email'
        icon={icons.email}
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        />
         <InputField
        label="Password"
        placeholder='Enter Your Password'
        icon={icons.lock}
        value={form.password}
        secureTextEntry={true}
        onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton title='Sign Up' onPress={onSignUpPress} className='mt-2 p-5 text-white'/>


        <OAuth />
        
        <TouchableOpacity onPress={()=>{
            router.replace('/(auth)/SignIn')
        }}  >
          <View className='text-lg items-center justify-center mt-10 flex flex-row'> 
          <Text className='text-lg  text-gray-400 font-bold' >Already have an account? </Text>
          <Text className=' text-blue-600 font-bold'>Log In</Text>
          </View>
         
           
        </TouchableOpacity>
     

        
       
        
      
       
        
      </View> */}
        <View className="p-5">
          <Text className=" mb-2 font-semibold text-lg">Name</Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#A9A9A9"
            className="border-none focus:border   w-full rounded-full p-5 mb-6 bg-slate-100"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <Text className=" mb-2 font-semibold text-lg">Email</Text>
          <TextInput
            placeholder="Enter your Email"
            placeholderTextColor="#A9A9A9"
            className="border-none focus:border  w-full rounded-full p-5 mb-6  bg-slate-100"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <Text className=" mb-2 font-semibold text-lg">Password</Text>
          <TextInput
            placeholder="Enter your Password"
            placeholderTextColor="#A9A9A9"
            className="border-none focus:border  w-full rounded-full p-5 mb-6  bg-slate-100"
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <TouchableOpacity
            onPress={onSignUpPress}
            className="mt-6 flex justify-center items-center shadow-lg shadow-slate-400 bg-[#0286ff]   p-5 rounded-full"
          >
            <Text className="text-lg font-bold text-white">Sign Up</Text>
          </TouchableOpacity>

          <View className=" mt-2 flex-row flex items-center justify-center">
            <View className="flex-1 h-[1px]  bg-gray-400  " />
            <Text className="text-lg font-medium ">Or</Text>
            <View className="flex-1 h-[1px]  bg-gray-400" />
          </View>

          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="border border-gray-300  shadow-md  mt-2 flex flex-row justify-center items-center  shadow-slate-400 bg-[white] p-5 rounded-full"
          >
            <Image className="w-5 h-5 mr-2" source={icons.google} />
            <Text className="text-lg font-bold text-black">
              Login With Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.replace("/(auth)/SignIn");
            }}
          >
            <View className="text-lg items-center justify-center mt-5 flex flex-row">
              <Text className="text-lg  text-gray-400 font-bold">
                Already have an account?{" "}
              </Text>
              <Text className=" text-blue-600 font-bold">Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* verification modal */}
        <Modal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
          if(verification.state === 'success') setShowSuccessModal(true)
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-extrabold mb-2 text-2xl ">Verification</Text>
            <Text className="mb-5 ">
              We've sent a verification code to {form.email}
            </Text>
            <Text className=" mb-2 font-semibold text-xl">Code</Text>
            <TextInput
              placeholder="12345"
              placeholderTextColor="#A9A9A9"
              className="border-none focus:border  w-full rounded-full p-5 mb-6  bg-slate-100"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <TouchableOpacity
              onPress={onPressVerify}
              className="border border-gray-300  shadow-md  mt-2 flex flex-row justify-center items-center  shadow-slate-400  bg-green-500 p-5 rounded-full"
            >
              <Text className="text-lg font-bold text-white">Verify Email</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={showSuccessModal}>
          <View className=" bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-xl font-bold text-center">Verified</Text>
            <Text className="text-base text-gray-400 text-center mt-2">
              You have successfully verified your account.
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(root)/(tabs)/Home")}
              className="border border-gray-300  shadow-md  mt-2 flex flex-row justify-center items-center  shadow-slate-400  bg-[#0286ff] p-5 rounded-full"
            >
              <Text className="text-lg font-bold text-white">Browse Home</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
