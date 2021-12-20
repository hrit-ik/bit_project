import React from 'react'
import { View, Text, TextInput, StyleSheet, Button} from 'react-native'

const Add = () => {
    return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Event Name"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Event Date"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Event Time"
                    style={styles.input}
                />
                <TextInput
                    // multiline={true}
                    placeholder="Event Description"
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                <Button
                    title="Add Event"
                    onPress={() => {}}
                    color={'white'}
                />
                </View>
            </View>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        padding: 15,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonContainer: {
        backgroundColor: '#0782f9',
        padding: 5,
        margin: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
    },
})