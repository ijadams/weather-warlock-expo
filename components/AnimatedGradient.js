import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, StatusBar, Dimensions, View, Animated, Easing} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import rgb2hex from 'rgb2hex';

class LinearGradientComponent extends Component {
  render () {
    const {color0, color1, children, points} = this.props;
    const gStart = points.start;
    const gEnd = points.end;
    return (
      <LinearGradient
        // colors={this.props.colors.map((c) => rgb2hex(c).hex)}
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
// Animated.LinearGradient = Animated.createAnimatedComponent(LinearGradient)

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
    'rgb(25, 25, 25)',
  ]
};

export class AnimatedGradient extends Component {

  static defaultProps = {
    points: {
      start: {x: 0, y: 0.4}, 
      end: {x: 1, y: 0.6}
    }
  }

  state = {
    speed: 4000,
    customColors: presetColors.day,
    color0: new Animated.Value(0),
    color1: new Animated.Value(0),
  }

  _getSpeed(speed) {
    if (speed < 5) {
      return 5000;
    } 
    if (speed < 10) {
      return 4000;
    }
    if (speed < 15) {
      return 3750;
    }
    if (speed < 20) {
      return 3500;
    }
    if (speed < 25) {
      return 3250;
    }
    if (speed < 35) {
      return 3000;
    }
    return 2000;
  }

  componentDidMount = () => {
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

  render () {

    const {color0, color1, customColors} = this.state;
    const {children, points, style} = this.props;
    const preferColors = [];
    // while (preferColors.length < customColors.length) {
    while (preferColors.length < 2) {
      preferColors.push(
        customColors
          .slice(preferColors.length)
          .concat(customColors.slice(0, preferColors.length+1))
      )
    }
    const interpolatedColors = [color0, color1].map((animatedColor, index) => {
      return animatedColor.interpolate({
        inputRange: Array.from({length: customColors.length+1}, (v, k) => k),
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "transparent"
  }
});
