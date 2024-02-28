import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import Footer from "./Footer";
import { MaterialIcons } from '@expo/vector-icons';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_SPOT, MIN_SPOT, NBR_OF_DICES, NBR_OF_THROWS } from "../constants/Game";
import style from "../styles/style";
import { moderateScale } from '../metrics/Metrics';
import { View, Pressable, Text, TextInput, Keyboard } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Home() {

    return(
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='RulesScreen' component={RulesScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

function HomeScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const textInputRef = useRef(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [isFocused]);

    const checkPlayerName = () => {
        if (username.trim().length > 0) {
            if (username.trim().length <= 20) {
                navigation.navigate('RulesScreen', {username: username.trim()});
                setUsername(''); 
                setStatus('');
                Keyboard.dismiss();
            }
            else {
                setStatus('Your name can have max. 20 letters.');
                setUsername('');
            }
        }
        else {
            setStatus('You have to enter a player name.')
        }
    }

    return(
        <View style={style.homeScreenView}>
            <Header/>
            <View style={style.homeView}>
                <MaterialIcons name='info' size={moderateScale(60)} color={'maroon'} style={style.homeIcon}/> 
                <TextInput ref={textInputRef} style={style.textinput} autoFocus={true} keyboardAppearance='dark' textAlign='center' value={username} onChangeText={setUsername}/>
                <Pressable 
                    style={style.button}
                    onPress={() => checkPlayerName()}
                >
                        <Text style={style.buttonText}>OK</Text>
                </Pressable>
                <Text style={style.homeStatus}>{status}</Text>
            </View>
            <Footer/>
        </View>
    );
}

function RulesScreen({navigation, route}) {
    
    return(
        <View style={style.homeScreenView}>
            <Header/>
            <View style={style.homeView}>
                <View>
                    <MaterialIcons name='info' size={moderateScale(60)} color={'maroon'} style={style.homeIcon}/>
                </View>
                <View style={style.rulesView}>
                    <Text style={style.rules}>Rules of the game</Text>
                    <Text style={style.rulesText}>
                        THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and
                        for  every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points have been selected.
                        The order for selecting those is free. 
                    </Text>
                    <Text style={style.rulesText}> 
                        POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having the same spot count are calculated. Inside the
                        game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
                    </Text>
                    <Text style={style.rulesText}>
                        GOAL: To get points as much as possible. {BONUS_POINTS} points is the limit of
                        getting bonus which gives you {BONUS_POINTS_LIMIT} points more.
                    </Text>
                </View>
                <View style={style.playButton}>
                    <Text style={style.playerText}>Player: {route.params.username}</Text>
                    <Pressable 
                        style={style.button}
                        onPress={() => {
                                        navigation.goBack();
                                        navigation.navigate('Gameboard', {username: route.params.username});
                                    }}
                    >
                            <Text style={style.buttonText}>PLAY</Text>
                    </Pressable>
                </View>
            </View>
            <Footer/>
        </View>
    );
}