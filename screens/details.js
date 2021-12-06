import React, {useState, useEffect, useLayoutEffect} from 'react'
import { Button, View, Text, StyleSheet } from 'react-native';

export default function Details({route, navigation}) {
    const {itemId, otherParam} = route.params;
    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={()=>setCount(c=>c+1)}
                    title="Count++"
                />
            ),
            headerBackTitleVisible: false
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <Button
                title="Go back to Home"
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.text}>itemId: {itemId}</Text>
            <Text style={styles.text}>{count}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontSize: 30
    }
})

