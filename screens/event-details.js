import React from 'react'
import { View, Image, StyleSheet, Dimensions, Text, ScrollView, Button } from 'react-native';
import img1 from '../assets/images/img1.jpg';


export default function EventDetails({navigation}) {
    // navigation.tabBar = () => null
    const navigateBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={img1}
                    style={styles.image}
                />
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Event Title
                        </Text>
                        <Text style={styles.date}>
                            Date
                        </Text>
                        <Text style={styles.body}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec eget nunc euismod, consectetur nisl eu,
                            consectetur nisl.
                        </Text>
                        <View style={{backgroundColor: 'black', width: 70, alignSelf: 'center', marginTop: 15, borderRadius: 10, marginBottom: 10}}>
                            <Button title="Join" color={'#fff'} />
                        </View>
                    </View>
            </ScrollView>
            <View style={styles.backButton}>
                <Button title="Back" color={'#000'} onPress={navigateBack}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
        borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,
    },
    imageContainer: {
        shadowOffset: { width: 0, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        borderBottomLeftRadius: 50,
        zIndex: 1,
    },
    textContainer: {
        padding: 20,
        paddingTop: 40,
        marginBottom: 60,
        marginTop: 400,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    date: {
        fontSize: 20,
        color: '#000',
    },
    body: {
        fontSize: 15,
        color: '#000',
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 2,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 80,
    },
})