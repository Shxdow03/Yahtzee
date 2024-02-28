import { View, Text } from "react-native";
import style from "../styles/style";

export default Footer = () => {
    return(
        <View style={style.footer}>
            <Text style={style.author}>Author: Jakob Schouren</Text>
        </View>
    );
}