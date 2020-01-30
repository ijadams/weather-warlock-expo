import {StyleSheet, Dimensions} from 'react-native';

export const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get("window");
export const BACKGROUND_COLOR = "transparent";
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
    superContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    bottomContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    downArrowContainer: {
      height: 40,
    },
    bottomPanelContainer: {
        flex: 1,
        width: '100%',
        margin: 0,
    },
    wrapper: {},
    playerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    logoContainer: {
        textAlign: "center",
        height: 200,
        width: 'auto',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    nameContainer: {
        marginLeft: -8,
        height: 'auto',
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    space: {
        height: FONT_SIZE
    },
    videoContainer: {},
    video: {},
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
        minHeight: FONT_SIZE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "center"
    },
    timestamp: {
        textAlign: "right"
    },
    button: {
        backgroundColor: BACKGROUND_COLOR,
    },
    logo: {
        backgroundColor: "transparent",
        marginTop: 36,
        marginBottom: 12,
        width: 140,
        height: 32
    },
    buttonsContainerBase: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    volumeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: DEVICE_WIDTH / 1.5,
        maxWidth: DEVICE_WIDTH / 1.5
    },
    volumeSlider: {
        width: DEVICE_WIDTH / 1.5 - ICON_MUTED_BUTTON.width
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
