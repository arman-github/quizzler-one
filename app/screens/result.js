import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Result = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.bannerContainer}>
                <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/online-testing-scene-4315045-3610779.png' }}
                    style={styles.banner}
                    resizeMode={'contain'}
                />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}><Text>Home</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default Result

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
