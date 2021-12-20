import React, {useState, useRef} from 'react'
import { View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {db, storage} from '../Backend/firestore'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { auth } from "../Backend/firebase";
import { useUpload } from '../Hooks/useUpload';

const Add = () => {
    const [image, setImage] = useState(null);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
        useUpload('images', result.uri);
    }
  };

  const docAdd = async()=>{
    try {
        const docRef = await addDoc(collection(db, "Events"), {
            eventName: eventName,
            eventDate: eventDate,
            eventTime: eventTime,
            eventDescription: eventDescription,
            createdAt: Timestamp.now(),
            // postedBy: auth.currentUser?.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }      
  }

    return (
            <View style={styles.container}>
                <Button title="Pick an image" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <TextInput
                    placeholder="Event Name"
                    style={styles.input}
                    onChangeText={(text) => setEventName(text)}
                />
                <TextInput
                    placeholder="Event Date"
                    style={styles.input}
                    onChangeText={(text) => setEventDate(text)}
                />
                <TextInput
                    placeholder="Event Time"
                    style={styles.input}
                    onChangeText={(text) => setEventTime(text)}
                />
                <TextInput
                    multiline={true}
                    placeholder="Event Description"
                    style={[styles.input]}
                    onChangeText={(text) => setEventDescription(text)}
                />
                <View style={styles.buttonContainer}>
                <Button
                    title="Add Event"
                    onPress={()=>{docAdd(eventName, eventDate, eventTime, eventDescription)}}
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