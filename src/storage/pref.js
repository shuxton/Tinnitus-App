import { AsyncStorage, Alert } from "react-native"



export const getData = async(item) => {
    try {
        const value = await AsyncStorage.getItem(item);
        return JSON.parse(value);
    } catch (error) {
        return null;
    }
};

export const setData = async(item,value)=>{
    try {
        await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
        console.log("SetItem error ",error)
        return null;
    }
}
