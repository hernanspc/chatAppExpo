import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Text,
    Dimensions,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert, KeyboardAvoidingView,
    Keyboard,
    Image,
    Platform,
    Button,
    TouchableOpacityBase
} from "react-native";
import tw from 'tailwind-react-native-classnames';
import { validateEmail, validatePassword } from "./../../validations/validation";
import { FormStyles } from "./../../StylesClass/FormStyles";

import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginV2(props) {
    const [token, setToken] = useState('');
    const dispatch = useDispatch();

    async function save(value) {
        try {
            await AsyncStorage.setItem('@token', value);
            dispatch(signIn(value));
            console.log('data saved');
        } catch (error) {
            console.log(error);
        }
    }

    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [error, setErrors] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "" : "height"} keyboardVerticalOffset={-150} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ height: windowHeight, width: windowWidth - 30 }}>
                    <ScrollView style={{ paddingTop: windowHeight / 6, marginHorizontal: 20 }}>
                        <View style={{ flexDirection: "row", alignSelf: "center", }}>
                            <Text style={tw.style("font-bold pb-12", { fontSize: 41 })}>My Underchat</Text>
                        </View>
                        <Text style={tw.style("font-bold text-gray-500 pb-2", { fontSize: 20 })}>Sign In</Text>
                        <View style={{ marginBottom: .5, height: 60, }}>
                            <TextInput
                                style={{ height: 45, borderBottomWidth: 1, borderBottomColor: "gray" }}
                                // onChangeText={(text) => setState({ ...state, email: text.toLocaleLowerCase().trim() })}
                                // value={state.email}
                                onChangeText={setToken}
                                value={token}
                                placeholder="username"
                                keyboardType="email-address"
                                placeholderTextColor="gray"
                            />
                            <Text style={FormStyles.error}>{error.email}</Text>
                        </View>
                        <View style={{ marginBottom: .5, height: 40, }}>
                            <TextInput
                                style={{ height: 45, borderBottomWidth: 1, borderBottomColor: "gray" }}
                                onChangeText={(text) => setState({ ...state, password: text })}
                                value={state.password}
                                placeholder="password"
                                keyboardType="default"
                                secureTextEntry={true}
                                placeholderTextColor="gray"
                            />
                            <Text style={FormStyles.error}>{error.password}</Text>
                        </View>
                        <TouchableOpacity
                            style={FormStyles.button}
                            onPress={() => save(token)}
                        >
                            {isLoading ? <ActivityIndicator color="#fafafa" /> : <Text style={tw.style("text-gray-100 text-lg py-2 text-center font-semibold")}>Sign In</Text>}

                        </TouchableOpacity>
                        <View style={FormStyles.links}>
                            <TouchableOpacity
                                onPress={() => console.log('Forgot Password')}
                                accessibilityLabel="forgot password">
                                <Text style={{ fontSize: 16, color: "#007AFF" }}>Forgot Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => console.log("Sign Up")}
                                accessibilityLabel="back to ">
                                <Text style={{ fontSize: 16, color: "#007AFF" }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});