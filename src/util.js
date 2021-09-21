export function randomMaterialColor() {
  const availableColors = [
    "red",
    "blue",
    "yellow darken-2",
    "pink",
    "purple",
    "cyan",
    "orange",
    "teal",
  ];
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}
