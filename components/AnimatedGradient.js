import React, {Component} from 'react';
import {StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import rgb2hex from 'rgb2hex';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");

class LinearGradientComponent extends Component {
    render() {
        const {color0, color1, children, points} = this.props;
        const gStart = points.start;
        const gEnd = points.end;
        return (
            <LinearGradient
                colors={[color0, color1].map((c) => rgb2hex(c).hex)}
                start={gStart}
                end={gEnd}
                style={[styles.linearGradient]}>
                {children}
            </LinearGradient>
        )
    }
}

Animated.LinearGradientComponent = Animated.createAnimatedComponent(LinearGradientComponent)

export const presetColors = {
    day: [
        'rgb(255, 255, 255)',
        'rgb(225, 225, 225)',
        'rgb(200, 200, 200)',
        'rgb(175, 175, 175)',
        'rgb(150, 150, 150)',
    ],
    dusk: [
        'rgb(200, 200, 200)',
        'rgb(175, 175, 175)',
        'rgb(150, 150, 150)',
    ],
    dawn: [
        'rgb(100, 100, 100)',
        'rgb(125, 125, 125)',
        'rgb(150, 150, 150)',
    ],
    night: [
        'rgb(0, 0, 0)',
        'rgb(12.5, 12.5, 12.5)',
        'rgb(25, 25, 25)',
        'rgb(32.5, 32.5, 32.5)',
        'rgb(50, 50, 50)',
    ]
};

export class AnimatedGradient extends Component {

    static defaultProps = {
        points: {
            start: {x: 0, y: 0},
            end: {x: 1, y: 1}
        }
    }

    state = {
        speed: 4000,
        customColors: presetColors[this.props.time],
        color0: new Animated.Value(0),
        color1: new Animated.Value(0),
    }

    _getSpeed(speed) {
        return 3000;
        if (speed < 5) {
            return 3500;
        }
        if (speed < 8) {
            return 3000;
        }
        if (speed < 12) {
            return 2750;
        }
        if (speed < 15) {
            return 2500;
        }
        if (speed < 20) {
            return 2250;
        }
        if (speed < 25) {
            return 2000;
        }
        if (speed < 35) {
            return 1500;
        }
        return 1000;
    }

    componentDidMount() {
        this.state.customColors = presetColors[this.props.time];
        this.state.speed = this._getSpeed(this.props.speed);
        this.startAnimation();
    }

    startAnimation = () => {
        const {speed, color0, color1, customColors} = this.state;
        [color0, color1].forEach(color => color.setValue(0));

        Animated.parallel(
            [color0, color1].map(animatedColor => {
                return Animated.timing(animatedColor, {
                    toValue: customColors.length,
                    duration: customColors.length * speed,
                    easing: Easing.linear
                })
            })
        )
            .start(this.startAnimation);

    };

    render() {

        const {color0, color1, customColors} = this.state;
        const {children, points, style} = this.props;
        const preferColors = [];
        while (preferColors.length < 2) {
            preferColors.push(
                customColors
                    .slice(preferColors.length)
                    .concat(customColors.slice(0, preferColors.length + 1))
            )
        }
        const interpolatedColors = [color0, color1].map((animatedColor, index) => {
            return animatedColor.interpolate({
                inputRange: Array.from({length: customColors.length + 1}, (v, k) => k),
                outputRange: preferColors[index]
            })
        });

        return (
            <Animated.LinearGradientComponent
                style={[styles.linearGradient, style]}
                points={points}
                color0={interpolatedColors[0]}
                color1={interpolatedColors[1]}>
                {children}
            </Animated.LinearGradientComponent>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: "transparent"
    }
});
