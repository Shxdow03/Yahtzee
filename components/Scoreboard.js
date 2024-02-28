import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "../styles/style";
import { MAX_NBR_OF_TBL_ROWS, STORAGE_KEY } from "../constants/Game";
import { moderateScale } from '../metrics/Metrics';
import { DataTable } from "react-native-paper";
import { ScoreboardContext } from "../contexts/Context";

export default function ScoreboardScreen({navigation}) {
    
    const {scoreboard, setScoreboard} = useContext(ScoreboardContext);
    
    useEffect(() => {
        const clear = navigation.addListener('focus', () => 
            getData(setScoreboard)
        );
        return clear;
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({tabBarBadge: scoreboard.length > MAX_NBR_OF_TBL_ROWS ? MAX_NBR_OF_TBL_ROWS : scoreboard.length})
    }, [scoreboard]);

    const clearBoard = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setScoreboard([]);   
            Alert.alert('Scoreboard was cleared.');                     
        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <View style={style.containerView}>
            <Header/>
            <View style={style.scoreview} >
                <MaterialCommunityIcons name='trophy' size={moderateScale(50)} color={'maroon'} style={style.scoreboardIcon}/>
                <Text style={style.scoreboardText}>Top {scoreboard.length <= MAX_NBR_OF_TBL_ROWS ? scoreboard.length : MAX_NBR_OF_TBL_ROWS}</Text>
                { scoreboard.length === 0 
                    ? <Text style={style.status}>Scoreboard is empty.</Text>
                    : <ScrollView contentContainerStyle={style.scrollview}>
                        <DataTable>
                            <DataTable.Header style={style.datatableHeader}>
                                <DataTable.Title style={style.datatableOutline}><Text style={style.datatableTitleText}>Position</Text></DataTable.Title>
                                <DataTable.Title style={[style.datatableTitle, style.datatableOutline]}><Text style={style.datatableTitleText}>Name</Text></DataTable.Title>
                                <DataTable.Title style={[style.datatableTitle, style.datatableOutline]}><Text style={style.datatableTitleText}>Date</Text></DataTable.Title>
                                <DataTable.Title style={style.datatableTitle}><Text style={style.datatableTitleText}>Score</Text></DataTable.Title>
                            </DataTable.Header>
                            {
                                scoreboard.map((sb, index) => (
                                    index < MAX_NBR_OF_TBL_ROWS &&
                                    <View key={sb.key} style={style.datatableRow}>
                                        <DataTable.Row>
                                            <DataTable.Cell style={style.datatableCellBorder}><Text style={style.datatableText}>{index + 1}. </Text></DataTable.Cell>
                                            <DataTable.Cell style={[style.datatableCell, style.datatableCellBorder]}><Text style={style.datatableText}>{sb.player}</Text></DataTable.Cell>
                                            <DataTable.Cell style={[style.datatableCell, style.datatableCellBorder]}><Text style={style.datatableText}>{sb.date}</Text></DataTable.Cell>
                                            <DataTable.Cell style={style.datatableCell}><Text style={[style.datatableText, style.score]}>{sb.total}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    </View>
                            
                            ))}
                        </DataTable>
                      </ScrollView>
                }
                {
                    scoreboard.length !== 0 
                    && 
                    <Pressable
                        style={style.button}
                        onPress={clearBoard}> 
                            <Text style={style.buttonText}>Clear Scoreboard</Text>
                    </Pressable>

                }
            </View>
            <Footer/>
        </View>
    );
}

const getData = async(scoreboardSetter) => {
    try {
        return AsyncStorage.getItem(STORAGE_KEY)
        .then (req => JSON.parse(req))
        .then (json => {
            if (json === null) {
                json = [];
            }
            scoreboardSetter(json);
        })
        .catch (error => console.log(error));
    } catch(e) {
        console.log(e);
    }
}

export { getData };
