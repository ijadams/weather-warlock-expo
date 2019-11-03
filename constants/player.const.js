import {
    Asset
} from "expo-asset";

export class PlaylistItem {
    constructor(name, uri, isVideo) {
        this.name = name;
        this.uri = uri;
        this.isVideo = isVideo;
    }
}

export const PLAYLIST = [
    new PlaylistItem(
        "Live Stream",
        "http://edge.mixlr.com/channel/rovhv",
        false
    )
];

export const ICONS_STRINGS = {
    ICON_THROUGH_EARPIECE: "speaker-phone",
    ICON_THROUGH_SPEAKER: "speaker",
}

export class Icon {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
        Asset.fromModule(this.module).downloadAsync();
    }
}

export const ICON_PLAY_BUTTON = new Icon(
    require("../assets/images/play_germanic_b.png"),
    34,
    51
);

export const ICON_PLAY_BUTTON_WHITE = new Icon(
    require("../assets/images/play_germanic_w.png"),
    34,
    51
);

export const ICON_PAUSE_BUTTON = new Icon(
    require("../assets/images/pause_germanic_b.png"),
    34,
    51
);

export const ICON_PAUSE_BUTTON_WHITE = new Icon(
    require("../assets/images/pause_germanic_w.png"),
    34,
    51
);

export const ICON_STOP_BUTTON = new Icon(
    require("../assets/images/stop_button.png"),
    22,
    22
);


export const ICON_FORWARD_BUTTON = new Icon(
    require("../assets/images/forward_button.png"),
    33,
    25
);
export const ICON_BACK_BUTTON = new Icon(
    require("../assets/images/back_button.png"),
    33,
    25
);

export const LOGO_WHITE = new Icon(
    require("../assets/images/logo_white.png"),
    116,
    26
);

export const LOGO_BLACK = new Icon(
    require("../assets/images/logo_black.png"),
    35,
    8
);

export const ICON_LOOP_ALL_BUTTON = new Icon(
    require("../assets/images/loop_all_button.png"),
    77,
    35
);
export const ICON_LOOP_ONE_BUTTON = new Icon(
    require("../assets/images/loop_one_button.png"),
    77,
    35
);

export const ICON_MUTED_BUTTON = new Icon(
    require("../assets/images/muted_button.png"),
    67,
    58
);
export const ICON_UNMUTED_BUTTON = new Icon(
    require("../assets/images/unmuted_button.png"),
    67,
    58
);

export const ICON_TRACK_1 = new Icon(require("../assets/images/track_1.png"), 166, 5);
export const ICON_THUMB_1 = new Icon(require("../assets/images/thumb_1.png"), 18, 19);
export const ICON_THUMB_2 = new Icon(require("../assets/images/thumb_2.png"), 15, 19);

export const LOOPING_TYPE_ALL = 0;
export const LOOPING_TYPE_ONE = 1;
export const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };
