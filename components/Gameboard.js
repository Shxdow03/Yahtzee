import { Pressable, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_ROUNDS, NBRS, NBR_OF_DICES, NBR_OF_THROWS, ROUND, STORAGE_KEY } from "../constants/Game";
import style from "../styles/style";
import { moderateScale } from '../metrics/Metrics';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScoreboardContext } from "../contexts/Context";
import { getData } from "./Scoreboard";

let numberCount = [];

export default function GameboardScreen({navigation, route}) {

    const [nbrOfThrowsLeft, setnbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfRounds, setnbrOfRounds] = useState(ROUND);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumbers, setSelectedNumbers] = 
        useState(new Array(NBRS).fill(false));
    const [rowNumberCount, setRowNumberCount] = 
        useState(new Array(NBRS).fill(0));
    const [total, setTotal] = useState(0);
    const [numberLock, setNumberLock] = useState(true);
    const [board, setBoard] = useState([]);
    const [bonusAdded, setBonusAdded] = useState(false);
    const {scoreboard, setScoreboard} = useContext(ScoreboardContext);
    const [gameEndStatus, setGameEndStatus] = useState(false);
    
    useEffect(() => {
        if (route.params?.username) {
            resetGame();
        }
    }, [route.params?.username]);
    
    useEffect(() => {
        const update = navigation.addListener('focus', () => 
            getData(setScoreboard)
        );
        return update;
    }, [navigation]);

    useEffect(() => {
        checkRoundEnd();
        if (total >= BONUS_POINTS_LIMIT && !bonusAdded) {
            setTotal(prev => prev + BONUS_POINTS);
            setBonusAdded(!bonusAdded);
        }
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setStatus("Throw dices.");    
        }
    }, [nbrOfThrowsLeft, total]);

    useEffect(() => {
        if (nbrOfThrowsLeft === 0 && nbrOfRounds === MAX_ROUNDS && numberLock) {
            checkGameEnd();
        }
    }, [numberLock]);

    useEffect(() => {
        if (gameEndStatus) {
            setNumberLock(true);
            saveScore();
        }
    }, [gameEndStatus]);

    const checkRoundEnd = () => {
        if (nbrOfThrowsLeft === 0) { 
            setNumberLock(false);
            setStatus('Select your points.');  
        }
        else {
            setStatus('Select and throw dices again.');
        }
    }

    const checkGameEnd = () => {
        setStatus('Game over, all points selected.');
        setSelectedNumbers(new Array(NBR_OF_DICES).fill(false)); 
        setBoard([]);
        setGameEndStatus(true);
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch(e) {
            console.log(e);
        }
    }

    const saveScore = () => {
        const newKey = scoreboard.length + 1;
        const scoreboardData = {
            key: newKey,
            player: route.params.username,
            date: new Date().toLocaleString(),
            total: total
        };
        const newScoreboard = [...scoreboard, scoreboardData];
        const newScoreboardSorted = newScoreboard.sort((a,b) => b.total - a.total);
        storeData(newScoreboardSorted);
        getData(setScoreboard);
    }

    const selectNumber = (i) => {
        
        if (!numberLock) {
            let numbers = [...selectedNumbers];
            if (selectedNumbers[i]) {
                setStatus(`You already selected points for ${i}.`);
            }
            else {
                numbers[i] = true;
                setSelectedNumbers(numbers);
                if (nbrOfThrowsLeft === 0) {
                    let count = [...rowNumberCount];
                    for (let j=0; j<numberCount.length; j++) {
                        if (numberCount[j] === i) {
                            count[i-1] += i;
                        }
                    }
                    setTotal(prev => prev + count[i-1]);
                    setRowNumberCount(count);
                    setNumberLock(true);  
    
                    if ((nbrOfThrowsLeft === 0) && (nbrOfRounds < MAX_ROUNDS)) {
                        setnbrOfThrowsLeft(NBR_OF_THROWS);
                        setnbrOfRounds(prev => prev + 1);  
                    }        
                }
            }
        }
        else {
            if ((nbrOfThrowsLeft === 0) && (nbrOfRounds === MAX_ROUNDS)) {
                setStatus('Start a new Game first.');
                return;
            }
            setStatus('Throw 3 times before setting points.')
        }
    }

    const throwDices = () => {
        if (numberLock) {
            if ((nbrOfThrowsLeft === 0) && (nbrOfRounds === MAX_ROUNDS)) {
                setStatus("Start a new Game first.");
                return;
            }
            let diceBoard = [...board];
            for (let i = 0; i<NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random()*6+1);
                    diceBoard[i] = 'dice-' + randomNumber;
                    numberCount[i] = randomNumber;
                    setBoard(diceBoard);
                }
            }
            setnbrOfThrowsLeft(nbrOfThrowsLeft-1);
        }
        else {
            setStatus('Select your points before next throw.');
        }
    }

    const resetGame = () => {
        setBonusAdded(false);
        setnbrOfThrowsLeft(NBR_OF_THROWS);
        setnbrOfRounds(ROUND);
        setStatus("Throw dices.");
        setTotal(0);
        setBoard([]);
        setSelectedNumbers(new Array(NBR_OF_DICES).fill(false)); 
        setNumberLock(true);
        setRowNumberCount(new Array(NBRS).fill(0));
        setGameEndStatus(false);
    }

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return 'darkblue';
        }
        else {
            return selectedDices[i] ? "black" : "maroon";
        }
    }

    function getNumberColor(i) {
            return selectedNumbers[i] ? "black" : "maroon";
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('You have to throw dices first.')
        }
        else {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
    }

    function Dice({k, index}) {
        return(
            <Pressable 
                key={"rowDices" + k}
                onPress={() => selectDice(index)}>
                    <MaterialCommunityIcons
                        name={board[index]}
                        key={'rowDices' + k}
                        size={moderateScale(50)}
                        color={getDiceColor(index)}
                    />
            </Pressable>
        );
    }

    function PlaceHolderDice() {
        return(
            <Ionicons
                name='dice'
                style={style.placeHolderIcon}
            />
        );
    }

    function Number({k, index, count}) {
        return(
            <View style={style.numberView}>
                <Text style={style.numberText}>{count}</Text>
                <Pressable 
                    key={"rowDices" + k}
                    onPress={() => selectNumber(index)}>
                        <MaterialCommunityIcons
                            name={'numeric-'+ index +'-circle'}
                            key={'rowNumber' + k}
                            size={moderateScale(50)}
                            color={getNumberColor(index)}
                        />
                </Pressable>
            </View>
        );
    }

    let rowDices = [];
    for (let i=0; i<NBR_OF_DICES; i++) {
        rowDices.push(<Dice key={i} index={i}/>);
    }

    let rowNumbers = [];
    for (let i=0; i<NBRS; i++) {
        rowNumbers.push(<Number key={i+1} index={i+1} count={rowNumberCount[i]}/>);
    }

    return(
        <View style={style.gameboardView}>
            <Header/>
            <View style={style.view}>
                <View>
                    {
                        board.length === 0 
                            ? <PlaceHolderDice/>
                            : <View style={[style.flex]}>{rowDices}</View>
                    }
                </View>

                <View style={style.textView}>
                    <Text style={style.status}>Throws left: {nbrOfThrowsLeft}</Text>
                    <Text style={style.status}>Round: {nbrOfRounds}</Text>
                </View>

                <View>
                    <Text style={style.status}>{status}</Text>
                </View>

                <View style={style.textView}>
                    <Pressable 
                        style={style.button}
                        onPress={() => throwDices()}>
                            <Text style={style.buttonText}>Throw dices</Text>
                    </Pressable>
                    <Pressable 
                        style={style.button}
                        onPress={() => resetGame()}>
                            <Text style={style.buttonText}>
                                {gameEndStatus 
                                ? 'Start new Game' 
                                : 'Reset Game'}
                            </Text>
                    </Pressable>
                </View>

                <View>
                    <Pressable 
                        style={style.button}
                        onPress={() => { 
                            nbrOfThrowsLeft === 3 
                                ? setStatus('Throw at least one time.') 
                                : setnbrOfThrowsLeft(0)}}
                    >
                            <Text style={style.buttonText}>Skip remaining throws</Text>
                    </Pressable>
                </View>

                <View>
                    <Text style={style.total}>Total: {total}</Text>
                </View>

                <View>
                    { 
                        (total < BONUS_POINTS_LIMIT) 
                        ? 
                            <Text style={style.gameboardText}>You are {BONUS_POINTS_LIMIT-total} points away from bonus</Text> 
                        : 
                            <Text style={style.gameboardText}>Congrats! Bonus points ({BONUS_POINTS}) added</Text>
                    }
                </View>

                <View style={style.flex}>{rowNumbers}</View>

                <View>
                    <Text style={style.playerText}>Player: {route.params.username}</Text>
                </View>
            </View>
            <Footer/>
        </View>
    );
}