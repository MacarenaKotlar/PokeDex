function ColorTags(tagValue:any){
    const colors = [
        {value: 'Normal', color: '#a8a878'},
        {value: 'Fighting', color: '#c02038'},
        {value: 'Flying', color: '#a890f0'},
        {value: 'Poison', color: '#a040a0'},
        {value: 'Ground', color: '#e0c068'},
        {value: 'Rock', color: '#b8a038'},
        {value: 'Bug', color: '#a8b820'},
        {value: 'Ghost', color: '#705898'},
        {value: 'Steel', color: '#b8b8d0'},
        {value: 'Fire', color: '#f08030'},
        {value: 'Water', color: '#6890f0'},
        {value: 'Grass', color: '#78c850'},
        {value: 'Electric', color: '#f8d030'},
        {value: 'Psychic', color: '#f85888'},
        {value: 'Ice', color: '#98d8d8'},
        {value: 'Dragon', color: '#7038f8'},
        {value: 'Dark', color: '#705848'},
        {value: 'Fairy', color: '#ee99ac'},
        {value: 'Stellar', color: 'fffff'}
    ]

    let typeColor;

    colors.forEach(color => {
        color.value === tagValue ? typeColor = color.color : ''
    });

    return typeColor;
}

export default ColorTags