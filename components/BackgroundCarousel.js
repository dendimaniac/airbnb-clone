import * as React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get("window").width;

class BackgroundCarousel extends React.Component {
  scrollRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      handleSlide: null
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    this.state.handleSlide= setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: DEVICE_WIDTH * this.state.selectedIndex,
            y: 0
          });
        }
      );
    }, 3000);
  };

  componentWillUnmount(){
    clearInterval(this.state.handleSlide);
  }

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render() {
    const { images } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={{ height: "100%", width: "100%" }}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
        >
          {images.map(image => (
            <Image
              style={styles.backgroundImage}
              source={{ uri: image }}
              key={image}
            />
          ))}
        </ScrollView>
        <View style={styles.circleDiv}>
          {images.map((image, index) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: index === selectedIndex ? 0.5 : 1 }
              ]}
              key={index}
              active={index === selectedIndex}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: Dimensions.get("window").width
  },
  circleDiv: {
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10,
    position: "absolute"
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 5,
    backgroundColor: "#fff"
  }
});

BackgroundCarousel.propTypes = {
  images: PropTypes.array,
};

export { BackgroundCarousel };
