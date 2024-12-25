import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "@react-navigation/native";
import { router, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [form, setForm] = useState({
   

    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])

  const handleLogin = () => {
    router.replace("/(auth)/SignIn");
  };

  const handleGoogleSignIn = async()=>{

  }

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className=" z-0 w-full h-[250px]" />
          <Text className=" text-2xl text-black font-semibold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
       
        <View className="p-5">
         
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
          <TouchableOpacity onPress={onSignInPress} className="mt-6 flex justify-center items-center shadow-lg shadow-slate-400 bg-[#0286ff]   p-5 rounded-full">
            <Text className="text-lg font-bold text-white">Sign In</Text>
          </TouchableOpacity>

          <View className=" mt-2 flex-row flex items-center justify-center">
          <View className="flex-1 h-[1px]  bg-gray-400  "/>
          <Text className="text-lg font-medium ">Or</Text>
          <View className="flex-1 h-[1px]  bg-gray-400"/>
          </View>

          <TouchableOpacity onPress={handleGoogleSignIn} className="border border-gray-300  shadow-md  mt-2 flex flex-row justify-center items-center  shadow-slate-400 bg-[white] p-5 rounded-full">
          <Image className="w-5 h-5 mr-2" source={icons.google}/>
            <Text className="text-lg font-bold text-black">Login With Google</Text>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            router.replace('/(auth)/SignUp')
        }}  >
          <View className='text-lg items-center justify-center mt-5 flex flex-row'> 
          <Text className='text-lg  text-gray-400 font-bold' >Don't have an account? </Text>
          <Text className=' text-blue-600 font-bold'>Sign Up</Text>
          </View>
         
           
        </TouchableOpacity>

         
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
