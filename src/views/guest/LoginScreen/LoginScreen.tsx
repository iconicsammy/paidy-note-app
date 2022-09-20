
import React from 'react';

import LocalAuth, { AuthDeviceFeatures, AuthResult } from 'application/auth/LocalAuth';
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground
} from "react-native";

import { Title, Button } from 'react-native-paper';
import Toaster from 'utils/Toaster'
import GlobalConstants from 'config/GlobalConstants';


function LoginScreen( {navigation }) {

    const [loggingIn, setLoggingIn] = useState(false);


    const [deviceAuthFeatures, setDeviceAuthFeatures] = useState<AuthDeviceFeatures>();

    useEffect(() => {

        const getDeviceAuthFeatures = async () => {
            const features: AuthDeviceFeatures = await LocalAuth.getSupportedAuthenticationFeatures();
            setDeviceAuthFeatures(features)
        }

        getDeviceAuthFeatures();

    }, [deviceAuthFeatures])


    const login = async () => {
        try {
            const result : AuthResult = await LocalAuth.authenicate();
            if (result.success){
                //redirect
                navigation.navigate("App")
            }else{
                //we can probe the exact error that went wrong but let's just do it here now
                // as a generic failed.
                Toaster.show(GlobalConstants.AUTH_FAILED)
            }
        } catch (error) {
            Toaster.show(GlobalConstants.AUTH_FAILED)
        }

    }


    return (

        <ImageBackground source={require("../../../../assets/stickyNote.png")}
            resizeMode="cover"
            style={styles.backgrondImage}
        >

            <Title>Note Taker</Title>

            {deviceAuthFeatures?.fingerPrint || deviceAuthFeatures?.facialRecogniation || deviceAuthFeatures?.iris ? <Button testID='btnAuth' icon="login" mode="contained" onPress={login}>
                Authenticate
            </Button> : <Text testID='txtWarning'>Your device doesn't support facial, eye or finger print auth</Text>}



        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    backgrondImage: {
        flex: 1,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LoginScreen;