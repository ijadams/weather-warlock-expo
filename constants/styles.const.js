import {StyleSheet, Dimensions} from 'react-native';
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
export const BACKGROUND_COLOR = "#fff";
export const FONT_SIZE = 14;
export const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;
const ICON_THUMB_1 = {height: 19};
const ICON_PLAY_BUTTON = {height: 51};
const ICON_MUTED_BUTTON = {height: 58, width: 67};

export const styles = StyleSheet.create({
    emptyContainer: {
      alignSelf: "stretch",
      backgroundColor: BACKGROUND_COLOR
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      backgroundColor: BACKGROUND_COLOR
    },
    wrapper: {},
    nameContainer: {
      height: FONT_SIZE
    },
    weatherContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    space: {
      height: FONT_SIZE
    },
    videoContainer: {
      height: VIDEO_CONTAINER_HEIGHT
    },
    video: {
      maxWidth: DEVICE_WIDTH
    },
    playbackContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "stretch",
      minHeight: ICON_THUMB_1.height * 2.0,
      maxHeight: ICON_THUMB_1.height * 2.0
    },
    playbackSlider: {
      alignSelf: "stretch"
    },
    timestampRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "stretch",
      minHeight: FONT_SIZE
    },
    text: {
      fontSize: FONT_SIZE,
      minHeight: FONT_SIZE
    },
    buffering: {
      textAlign: "left",
      paddingLeft: 20
    },
    timestamp: {
      textAlign: "right",
      paddingRight: 20
    },
    button: {
      backgroundColor: BACKGROUND_COLOR
    },
    logo: {
      backgroundColor: "transparent",
      marginTop: 36,
      marginBottom: 12,
      width: 140,
      height: 32
    },
    buttonsContainerBase: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    buttonsContainerTopRow: {
      maxHeight: ICON_PLAY_BUTTON.height,
      minWidth: DEVICE_WIDTH / 2.0,
      maxWidth: DEVICE_WIDTH / 2.0
    },
    buttonsContainerMiddleRow: {
      maxHeight: ICON_MUTED_BUTTON.height,
      alignSelf: "stretch",
      paddingRight: 20
    },
    volumeContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: DEVICE_WIDTH / 2.0,
      maxWidth: DEVICE_WIDTH / 2.0
    },
    volumeSlider: {
      width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width
    },
    buttonsContainerBottomRow: {
      maxHeight: ICON_THUMB_1.height,
      alignSelf: "stretch",
      paddingRight: 20,
      paddingLeft: 20
    },
    rateSlider: {
      width: DEVICE_WIDTH / 2.0
    },
    buttonsContainerTextRow: {
      maxHeight: FONT_SIZE,
      alignItems: "center",
      paddingRight: 20,
      paddingLeft: 20,
      minWidth: DEVICE_WIDTH,
      maxWidth: DEVICE_WIDTH
    }
  });
  