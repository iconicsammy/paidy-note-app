import globalStyle from "assets/globalStyle";
import React from "react";
import { SafeAreaView, Text } from "react-native";

function AboutScreen(){
    return <SafeAreaView style={globalStyle.container}>
            <Text>Note Taking App v1</Text>

        </SafeAreaView>
}

export default AboutScreen;