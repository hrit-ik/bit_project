import React, {useState, useRef} from 'react'
import { View, Text, TextInput, StyleSheet, Button, Image, ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {db, storage} from '../Backend/firestore'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { auth } from "../Backend/firebase";
import { useUpload } from '../Hooks/useUpload';
import {Picker} from '@react-native-picker/picker';
import { useStoreState } from 'easy-peasy';
import CnfrModal from '../components/cnfrModal';


const Add = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageAspect, setImageAspect] = useState(null);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [eventDescription, setEventDescription] = useState('');  
    const [uploading, setUploading] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const clubs = useStoreState((state) => state.clubs);
    const userData = useStoreState((state) => state.userData);
    const allowedClubs = clubs.filter(club => userData.adminOf.includes(club.name));
    const [modalVisible, setModalVisible] = useState(false);

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

  const addEvent = async()=>{
    if(imageUri && eventName && eventDate && eventTime && (eventDescription.length > 20)) {

        try {

            const imageURL = await useUpload(imageUri, `${eventName}-${Timestamp.now()}`)
            const docRef = await addDoc(collection(db, "events"), {
                eventName: eventName,
                eventDate: eventDate,
                eventTime: eventTime,
                eventDescription: eventDescription,
                eventLink: eventLink,
                posterUri: imageURL,
                createdAt: Timestamp.now(),
                createdBy: {userEmail: auth.currentUser.email, userId: auth.currentUser.uid},
                club: {id: selectedValue.id, name: selectedValue.name}
            });

            console.log("Document written with ID: ", docRef.id);
            setImageUri(null); setEventDate(''); setEventDescription(''); setEventName(''); setEventTime(''); setImageAspect(null);
            alert("Event added successfully");
            setUploading(false)
          } catch (e) {
            console.error("Error adding document: ", e);
            setUploading(false);
          }
    }
    else{
        alert("Please fill all the fields");
        setUploading(false)
    }
        
  }
  const confirmAddEvent = () => {
    setModalVisible(true)
  }


  function start(){

    setUploading(true)
    addEvent();

  }

    return (
            <View style={styles.container}>
            <ScrollView>
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
                 <TextInput
                    multiline={true}
                    placeholder="Event Link"
                    style={[styles.input]}
                    onChangeText={(text) => setEventLink(text)}
                    value={eventLink}
                />

                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                    }>
                    {allowedClubs.map((club, i) => (
                        <Picker.Item label={club.name} value={club.name} key={i} />
                    ))}
                    {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                </Picker>
                <Button
                    disabled = {uploading}
                    title="Add Event"
                    // onPress={()=>{start()}}
                    onPress={()=>{confirmAddEvent()}}
                />
 
                </ScrollView>
                <CnfrModal modalVisible={modalVisible} setModalVisible={setModalVisible} confirmAddEvent={confirmAddEvent}/>
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