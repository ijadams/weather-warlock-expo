import React, { Component } from "react";
import { StyleSheet, Animated } from "react-native";
import { GradientHelper } from "./GradientHelper";

const styles = StyleSheet.create({
  component: {
    flex: 1
  }
});

const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

export class AnimatedGradient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevColors: ['rgb(255,255,255)', 'rgb(255,255,255)'],
      colors: ['rgb(125,125,125)', 'rgb(125,125,125)'],
      tweener: new Animated.Value(0)
    };
    console.log('props', this.state);
  }


  componentDidMount() {
    console.log('this', this)    
  }

  componentDidUpdate() {
    console.log(this.state);

    const { tweener } = this.state;
    Animated.timing(tweener, {
      toValue: 1
    }).start();
  }

  render() {
    const { tweener, prevColors, colors } = this.state;
    console.log('prevColors', prevColors)
    const { style } = this.props;

    const color1Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[0], colors[0]]
    });

    const color2Interp = tweener.interpolate({
      inputRange: [0, 1],
      outputRange: [prevColors[1], colors[1]]
    });

    return (
      <AnimatedGradientHelper
        style={style || styles.component}
        color1={color1Interp}
        color2={color2Interp}
      />
    );
  }
}