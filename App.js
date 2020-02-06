import React from "react";

import {StyleSheet, Text, View, ScrollView, Dimensions, DeviceEventEmitter} from 'react-native';

import {HomeView, AboutView, ContactView} from './views';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pageScroll: true,
            drawerOpen: false,
            activeIndex: 0
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

    _handleScroll(event) {
        const scrollWidth = event.nativeEvent.contentOffset.x;
        console.log(scrollWidth);
        if (scrollWidth === 0) {
            this.state.activeIndex = 0;
        } else if (scrollWidth > DEVICE_WIDTH && scrollWidth < DEVICE_WIDTH * 2) {
            this.state.activeIndex = 1;
        } else {
            this.state.activeIndex = 2;
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView horizontal={true} scrollEnabled={this.state.pageScroll && !this.state.drawerOpen}
                            onScroll={this._handleScroll}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
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

                <View style={styles.pagerView}>
                    <View style={styles.pagerItem}>
                        <Text style={[styles.pagerText, {fontWeight: this.state.activeIndex === 0 ? 'bold' : 'normal'}]}>
                            Home
                        </Text>
                    </View>
                    <View style={styles.pagerItem}>
                        <Text style={[styles.pagerText, {fontWeight: this.state.activeIndex === 1 ? 'bold' : 'normal'}]}>
                            About
                        </Text>
                    </View>
                    <View style={styles.pagerItem}>
                        <Text style={[styles.pagerText, {fontWeight: this.state.activeIndex === 2 ? 'bold' : 'normal'}]}>
                            Contact
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black',
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
    },
    pagerView: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
    },
    pagerItem: {
        width: '32%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    pagerText: {
        color: 'white'
    }
});
