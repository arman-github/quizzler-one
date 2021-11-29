import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants';
import data from '../data/QuizData'

const Quiz = ({ navigation }) => {
    // const [data, setData] = useState([])
    const [progress, setProgress] = useState(new Animated.Value(0))
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOPtionDisabled, setIsOPtionDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false)
    const allQuestions = data;

    const progressAnimation = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%']
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = (params) => {
        // Make a request for a user with a given ID
        axios.get('https://opentdb.com/api.php?amount=20&category=17')
            .then(function (response) {
                // handle success
                console.log(response);
                // setData(response)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    console.log(allQuestions);

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOPtionDisabled(true);
        setShowNextButton(true);
        if (selectedOption == correct_option) {
            //set score
            setScore(score + 1)
        }
    }
    // show next button
    const handleNext = () => {
        if (currentQuestionIndex == allQuestions.length - 1) {
            //last question
            setShowScoreModal(true)
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOPtionDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex + 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false)
        setCurrentQuestionIndex(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOPtionDisabled(false);
        setShowNextButton(false);
        setScore(0);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();

    }

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                }, { width: progressAnimation }]}></Animated.View>
            </View>
            <View style={styles.counter}>
                <Text style={styles.counterText}>{currentQuestionIndex + 1}</Text>
                <Text style={styles.counterText}>/{allQuestions.length}</Text>
            </View>
            <View style={styles.question}>
                <Text style={styles.questionText}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
            <View style={styles.optionContainer}>
                {
                    allQuestions[currentQuestionIndex].options.map(option => (
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            disabled={isOPtionDisabled}
                            key={option}
                            style={
                                {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 12,
                                    paddingHorizontal: 12,
                                    marginVertical: 8,
                                    backgroundColor: option == correctOption
                                        ? COLORS.success + '20'
                                        : option == currentOptionSelected
                                            ? COLORS.error + '20'
                                            : COLORS.secondary + '20',

                                    borderRadius: 12,
                                    borderWidth: 3,
                                    borderColor: option == correctOption
                                        ? COLORS.success
                                        : option == currentOptionSelected
                                            ? COLORS.error
                                            : COLORS.secondary + '40',

                                }}>
                            <Text style={styles.optionText}>{option}</Text>
                            {/* show check or cross icon based on correct answer */}
                            {
                                option == correctOption ? (
                                    <View style={styles.checkIcon}>
                                        <MaterialCommunityIcons style={styles.IconText} name="check" />
                                    </View>
                                ) : (
                                    option == currentOptionSelected ? (
                                        <View style={styles.closeIcon}>
                                            <MaterialCommunityIcons style={styles.IconText} name="close" />
                                        </View>
                                    ) : null
                                )
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showScoreModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <Text style={styles.modalText}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>
                        <View style={styles.scoreContainer}>
                            <Text style={{
                                fontSize: 30,
                                color: score > (allQuestions.length / 2) ? COLORS.success : COLORS.error
                            }}>{score}</Text>
                            <Text style={styles.scoreText}>/{allQuestions.length}</Text>
                        </View>
                        {/* retry quiz button */}
                        <TouchableOpacity onPress={restartQuiz} style={styles.scoreButton}>
                            <Text style={styles.scoreButtonText}>Retry Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.bottom}>
                {/* <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>SKIP</Text></TouchableOpacity> */}
                {showNextButton &&
                    <TouchableOpacity style={styles.button} onPress={() => handleNext()}><Text style={styles.buttonText}>NEXT</Text></TouchableOpacity>
                }
                {/* <TouchableOpacity style={styles.button}><Text style={styles.buttonText} onPress={()=> navigation.navigate('Result')}>END</Text></TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Quiz

const styles = StyleSheet.create(
    {
        container: {
            padding: 12,
            height: '100%',
            backgroundColor: COLORS.background
        },
        progressContainer: {
            width: '100%',
            height: 20,
            borderRadius: 20,
            backgroundColor: '#000020'
        },
        question: {
            marginVertical: 2,
        },
        questionText: {
            fontSize: 20,
            fontWeight: '500',
            color: '#999999',
            color: COLORS.white
        },
        optionContainer: {
            marginVertical: 16,
            flex: 1,
        },
        optionText: {
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
        },
        options: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 12,
            marginVertical: 8,
            backgroundColor: COLORS.secondary + '20',
            borderRadius: 12,
            borderWidth: 3,
        },
        counter: {
            marginVertical: 16,
            display: 'flex',
            flexDirection: 'row'
        },
        counterText: {
            color: COLORS.white,
            fontSize: 18,
            opacity: 0.6,
        },
        bottom: {
            marginBottom: 12,
            paddingVertical: 16,
            justifyContent: 'space-between',
            flexDirection: 'row'
        },
        button: {
            width: '100%',
            backgroundColor: '#0055a4',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            borderRadius: 12,
            borderColor: '#0055a4' + '40',
            borderWidth: 2
        },
        buttonText: {
            fontSize: 18,
            fontWeight: '600',
            color: 'white'
        },
        checkIcon: {
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            backgroundColor: COLORS.success,
            justifyContent: 'center',
            alignItems: 'center'
        },
        closeIcon: {
            height: 30,
            width: 30,
            borderRadius: 30 / 2,
            backgroundColor: COLORS.error,
            justifyContent: 'center',
            alignItems: 'center'
        },
        IconText: {
            color: COLORS.white,
            fontSize: 20,
        },
        modalContainer: {
            flex: 1,
            backgroundColor: COLORS.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center'
        },
        modalText: {
            fontSize: 20,
            fontWeight: '500'
        },
        scoreContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20
        },
        scoreText: {
            fontSize: 20,
            color: COLORS.black
        },
        scoreButton: {
            backgroundColor: COLORS.accent,
            padding: 18,
            width: '100%',
            borderRadius: 20,
            borderColor: COLORS.accent + '30',
            borderWidth: 2
        },
        scoreButtonText: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
            color: COLORS.white
        }

    })
