import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from './constants'

const Title = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quizzler</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: COLORS.white
    },
    container: {
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
