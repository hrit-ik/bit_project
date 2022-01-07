// import React from 'react'
// import { View, Image, StyleSheet, Dimensions, Text, ScrollView, Button, SafeAreaView,Linking } from 'react-native';
// import img1 from '../assets/images/img1.jpg';
// import img2 from '../assets/images/img2.jpeg';


// export default function EventDetails({route,navigation}) {
//     // navigation.tabBar = () => null
//     const navigateBack = () => {
//         navigation.goBack();
//     }
//     const { data } = route.params;
//     console.log(data)
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.imageContainer}>
//                     <Image source={{uri: data.posterUri}}
//                         style={styles.image}
//                     />
//                 </View>
//                 <View style={styles.textContainer}>
//                         <Text style={styles.title}>
//                             {data.eventName}
//                         </Text>
//                         <Text style={styles.date}>
//                             Date &nbsp; {data.eventDate}
    
//                             Time {data.eventTime}
//                         </Text>
//                         <Text style={styles.body}>
//                             {data.eventDescription}
//                         </Text>
//                         <View style={{backgroundColor: 'black', width: 70, alignSelf: 'center', marginTop: 15, borderRadius: 10, marginBottom: 10}}>
//                             <Button title="Join" onPress={()=>{Linking.openURL(data.eventLink)}} />
//                         </View>
//                     </View>
//                     <View style={styles.backButton}>
//                          <Button title="Back" color={'#000'} onPress={navigateBack}/>
//                     </View> 
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         position: 'relative',
//     },
//     image: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').width,
//         borderBottomLeftRadius: 50,
//         // borderBottomRightRadius: 50,
//     },
//     imageContainer: {
//         shadowOffset: { width: 0, height: 10 },
//         // shadowColor: 'black',
//         // shadowOpacity: 0.7,
//         // shadowRadius: 10,
//         // elevation: 5,
//         // position: 'absolute',
//         borderBottomLeftRadius: 50,
//         // zIndex: 1,
//     },
//     textContainer: {
//         padding: 20,
//         paddingTop: 40,
//         marginBottom: 60,
//         // marginTop: 400,
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     date: {
//         fontSize: 20,
//         color: '#000',
//     },
//     body: {
//         fontSize: 15,
//         color: '#000',
//         marginTop: 20,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 40,
//         left: 20,
//         zIndex: 2,
//         backgroundColor: '#fff',
//         borderRadius: 20,
//         width: 80,
//         shadowColor: 'black',
//         shadowOpacity: 0.7,
//         shadowRadius: 10,
//         elevation: 5,
//     },
// })

import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import FullImage from '../components/FullImage'

const SCREE_WIDTH = Dimensions.get('window').width
const eventDetails = ({route}) => {
    const eventData = route.params.event
    return (
        <ScrollView>
        {/* <View style={styles.container}> */}
            <TouchableWithoutFeedback onPress={() => {}}>
                <Image style={styles.image} source={{uri: eventData.posterUri}} />
                {/* <FullImage styles={styles.postImage} uri={eventData.posterUri} /> */}
            </TouchableWithoutFeedback>
            <View style={styles.info}>
                <Text style={styles.title}>{eventData.eventName}</Text>
                <Text style={styles.date}>{eventData.eventDate}</Text>
                <Text style={styles.time}>{eventData.eventTime}</Text>
                <Text style={styles.description}>{eventData.eventDescription}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
        {/* </View> */}
        </ScrollView>
    )
}

export default eventDetails

const styles = StyleSheet.create({
    postImage: {
        // height: 200,
        // resizeMode: 'center',
        // aspectRatio: 1,
        flex: 1,
        width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        aspectRatio: 1,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SCREE_WIDTH,
        height: SCREE_WIDTH*0.85,
        // borderBottomLeftRadius: SCREE_WIDTH*0.1,
        // borderBottomRightRadius: 50,
    },
    info: {
        width: SCREE_WIDTH,
        padding: 20,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    time: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    button: {
        // width: SCREE_WIDTH - 40,
        // paddingHorizontal: 30,
        width: '40%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1c313a',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
})
