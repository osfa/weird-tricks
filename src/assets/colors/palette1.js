import colors from "vuetify/lib/util/colors";

export const palette = Object.keys(colors).map((key) => {
    return colors[key].base;
});

export const randomFromPalette = () => palette[Math.floor(Math.random() * palette.length)];
