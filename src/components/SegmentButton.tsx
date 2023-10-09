import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { PColors } from '../shared/Colors';

interface Option {
  name: string;
  value: string | number;
}

interface SegmentedButtonProps {
  options: Option[];
  value: string | number;
  onValueChange: (value: string | number) => void;
}

interface SegmentedButtonState {
  selectedIndex: number;
  sliderPosition: Animated.Value;
  buttonWidth: number;
}

class SegmentedButton extends Component<SegmentedButtonProps, SegmentedButtonState> {
  constructor(props: SegmentedButtonProps) {
    super(props);
    this.state = {
      selectedIndex: 0,
      sliderPosition: new Animated.Value(0),
      buttonWidth: 0,
    };
  }

  handleButtonPress = (index: number) => {
    const { sliderPosition, buttonWidth } = this.state;
    const selectedOption = this.props.options[index];

    this.setState({ selectedIndex: index });
    Animated.spring(sliderPosition, {
      toValue: index * buttonWidth,
      useNativeDriver: false,
    }).start();

    this.props.onValueChange(selectedOption.value);
  };

  onLayoutButton = (event: any) => {
    const { width } = event.nativeEvent.layout;
    this.setState({ buttonWidth: width });
  };

  render() {
    const { options } = this.props;
    const { selectedIndex, sliderPosition } = this.state;

    const buttonStyle = {
      width: `${100 / options.length}%`,
    };

    return (
      <View style={styles.container}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              index === selectedIndex && styles.activeButton,
              buttonStyle,
            ]}
            onPress={() => this.handleButtonPress(index)}
            onLayout={this.onLayoutButton}
          >
            <Text
              style={[
                styles.buttonText,
                index === selectedIndex ? { color: PColors.White } : null, 
              ]}
            >{option.name}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: sliderPosition }],
              width: buttonStyle.width,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 90,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 2,
  },
  activeButton: {
    backgroundColor: PColors.Blue,
  },
  buttonText: {
    color: PColors.Black,
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: PColors.Blue,
  },
});

export default SegmentedButton;
