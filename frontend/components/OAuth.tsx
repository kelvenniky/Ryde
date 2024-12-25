import { Image, Text, View } from "react-native"
import CustomButton from "./CustomButton"
import { icons } from "@/constants"

const OAuth = ()=>{
    return(
        <View className="mt-1">
        <View className="flex flex-row justify-center items-center mt-5 gap-x-3">
        <View className="flex-1 h-[1px] bg-black "/>
        <Text className="text-lg font-medium ">Or</Text>
        <View className="flex-1 h-[1px] bg-black"/>

    </View>
    <CustomButton 
    title="  Log In With Google" className="mt-5 gap-x-3 w-full shadow-none " IconLeft={()=>(
        <Image source={icons.google} resizeMode="contain" className="w-5 h-5  mx-5"/>
    )} />
    </View>
    )
}
export default OAuth