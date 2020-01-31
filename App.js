import React from "react";

import {StyleSheet, Text, View, ScrollView, Dimensions, DeviceEventEmitter} from 'react-native';

import {HomeView, AboutView, ContactView} from './views';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pageScroll: true,
            drawerOpen: false
        }
    }


    componentDidMount() {
        // Lock sideways scroll on a given event
        DeviceEventEmitter.addListener("event.weatherScroll", (e) => {
            this.setState({pageScroll: false});
            setTimeout(() => {
                this.setState({pageScroll: true});
            }, 350)
        });
        DeviceEventEmitter.addListener("event.drawer", (e) => {
            setTimeout(() => {
                this.setState({drawerOpen: !this.state.drawerOpen});
            }, 100)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} scrollEnabled={this.state.pageScroll && !this.state.drawerOpen} pagingEnabled={true} showsHorizontalScrollIndicator={false}
                            bounces={false}>

                    <View style={styles.homeView}>
                        <HomeView></HomeView>
                    </View>

                    <View style={styles.aboutView}>
                        <AboutView></AboutView>
                    </View>

                    <View style={styles.contactView}>
                        <ContactView></ContactView>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
    },
    homeView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    aboutView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    contactView: {
        width: DEVICE_WIDTH,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
