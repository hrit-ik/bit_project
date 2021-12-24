import React, {useState, useRef, useContext, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Button, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {db, storage} from '../Backend/firestore'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { auth } from "../Backend/firebase";
import { useUpload } from '../Hooks/useUpload';
import { SettingsContext } from '../components/settingsContext';

const Add = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageAspect, setImageAspect] = useState(null);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');  
    const {userData} = useContext(SettingsContext)

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
        setImageUri(result.uri);
        setImageAspect(result.width/result.height);
    }
  };
//   console.log(userData)
  const addEvent = async()=>{
    if(imageUri && eventName && eventDate && eventTime && (eventDescription.length > 20)) {
        try {
            const docRef = await addDoc(collection(db, "events"), {
                eventName: eventName,
                eventDate: eventDate,
                eventTime: eventTime,
                eventDescription: eventDescription,
                posterUri: await useUpload(imageUri, 'images'),
                createdAt: Timestamp.now(),
                createdBy: {userEmail: auth.currentUser.email, userId: auth.currentUser.uid}
            });
            console.log("Document written with ID: ", docRef.id);
            setImageUri(null); setEventDate(''); setEventDescription(''); setEventName(''); setEventTime(''); setImageAspect(null);
            alert("Event added successfully");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    else{
        alert("Please fill all the fields");
    }
        
  }
    return (
            <View style={styles.container}>
                {userData && userData.adminOf.map((club, i)=>{
                    return <Text key={i}>{club}</Text>
                })}
                <Button title="Pick an image" onPress={pickImage} />
                {imageUri && <Image source={{ uri: imageUri }} style={{height: 200, aspectRatio: imageAspect }} />}
                <TextInput
                    placeholder="Event Name"
                    style={styles.input}
                    onChangeText={(text) => setEventName(text)}
                    value={eventName}
                />
                <TextInput
                    placeholder="Event Date"
                    style={styles.input}
                    onChangeText={(text) => setEventDate(text)}
                    value={eventDate}
                />
                <TextInput
                    placeholder="Event Time"
                    style={styles.input}
                    onChangeText={(text) => setEventTime(text)}
                    value={eventTime}
                />
                <TextInput
                    multiline={true}
                    placeholder="Event Description"
                    style={[styles.input]}
                    onChangeText={(text) => setEventDescription(text)}
                    value={eventDescription}
                />
                <View style={styles.buttonContainer}>
                <Button
                    title="Add Event"
                    onPress={()=>{addEvent()}}
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