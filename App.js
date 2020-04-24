import React from "react";

import {StyleSheet, Text, View, ScrollView, Dimensions, DeviceEventEmitter, TouchableOpacity} from 'react-native';

import {HomeView, AboutView, ContactView} from './views';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            pageScroll: true,
            drawerOpen: false,
            activeIndex: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
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

    _handlePaginatorClick(index) {
        if (index === 0) {
            this.scroll.scrollTo({x: 0})
        }
        if (index === 1) {
            this.scroll.scrollTo({x: DEVICE_WIDTH})
        }
        if (index === 2) {
            this.scroll.scrollTo({x: DEVICE_WIDTH * 2})
        }
        this.setState({activeIndex: index});
    }

    handleScroll(event) {
        const scrollWidth = event.nativeEvent.contentOffset.x;
        if (scrollWidth < DEVICE_WIDTH) {
            this.setState({activeIndex: 0})
        }
        if (scrollWidth >= DEVICE_WIDTH && scrollWidth < DEVICE_WIDTH * 2) {
            this.setState({activeIndex: 1})
        }
        if (scrollWidth >= DEVICE_WIDTH * 2) {
            this.setState({activeIndex: 2})
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView horizontal={true} scrollEnabled={this.state.pageScroll && !this.state.drawerOpen}
                            onScroll={this.handleScroll}
                            scrollEventThrottle={1}
                            pagingEnabled={true}
                            ref={(node) => this.scroll = node}
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

                <View style={[styles.pagerView, {display: this.state.drawerOpen ? 'none' : 'flex'}]}>
                    <View style={styles.pagerItem}>
                        <TouchableOpacity onPress={() => {
                            this._handlePaginatorClick(0)
                        }}>
                            <Text
                                style={[styles.pagerText]}>
                                Home
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pagerItem}>
                        <TouchableOpacity onPress={() => {
                            this._handlePaginatorClick(1)
                        }}>
                            <Text
                                style={[styles.pagerText]}>
                                About
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pagerItem}>
                        <TouchableOpacity onPress={() => {
                            this._handlePaginatorClick(2)
                        }}>
                            <Text
                                style={[styles.pagerText]}>
                                Contact
                            </Text>
                        </TouchableOpacity>
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
        color: 'white',
        textTransform: 'lowercase'
    }
});
