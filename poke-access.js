fetchData();


function toTitleCase(text) {
    return text.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

async function fetchData(){
    try {

        const pokemonName = document.getElementById("pokeName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource.");
        }

        const pokemonData = await response.json();
        console.log(pokemonData);

        
        const pokeInfoElement = document.getElementById('pokeInfo');
        const titleName = toTitleCase(pokemonData.name);

        pokeInfoElement.innerHTML = `
            <h2>Pokemon Name: ${titleName}</h2>
            <img src="${pokemonData.sprites.front_default}" alt = "${pokemonData.name}">
            <h4>Abilities: </h4>
            <ul>
                ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
            </ul>
            <h4>Moves:</h4>
            <ul>
                ${pokemonData.moves.map(move => `<li>${move.move.name}</li>`).join('')}
            </ul>`;
    }
    catch(error) {
        console.error(error);
    }
}



