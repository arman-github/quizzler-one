import React from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import Title from '../title'

const Home = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary}/>
            <Title />
            <View style={styles.bannerContainer}>
                <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/online-testing-scene-4315045-3610779.png' }}
                    style={styles.banner}
                    resizeMode={'contain'}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Quiz')}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
        height: '100%'
    },
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderColor: COLORS.accent + '60',
        borderWidth: 2
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white'
    }
})
