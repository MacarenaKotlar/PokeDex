function ColorTags(tagValue: string) {
  const colors = [
    { value: "normal", color: "#a8a878" },
    { value: "fighting", color: "#c02038" },
    { value: "flying", color: "#a890f0" },
    { value: "poison", color: "#a040a0" },
    { value: "ground", color: "#e0c068" },
    { value: "rock", color: "#b8a038" },
    { value: "bug", color: "#a8b820" },
    { value: "ghost", color: "#705898" },
    { value: "steel", color: "#b8b8d0" },
    { value: "fire", color: "#f08030" },
    { value: "water", color: "#6890f0" },
    { value: "grass", color: "#78c850" },
    { value: "electric", color: "#f8d030" },
    { value: "psychic", color: "#f85888" },
    { value: "ice", color: "#98d8d8" },
    { value: "dragon", color: "#7038f8" },
    { value: "dark", color: "#705848" },
    { value: "fairy", color: "#ee99ac" },
    { value: "stellar", color: "#060731" },
  ];

  let typeColor;

  colors.forEach((color) => {
    color.value === tagValue && (typeColor = color.color);
  });

  return typeColor;
}

export default ColorTags;
