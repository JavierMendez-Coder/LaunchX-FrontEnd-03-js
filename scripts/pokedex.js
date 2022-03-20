const fetchPokemon = async () => {
  const pokemonInput = document.getElementById("pokemonInput");
  var input = pokemonInput.value.toLowerCase();
  var pokemonId = undefined;

  if (input === "") {
    return;
  }

  const numberRegex = /^\d+$/;
  if (numberRegex.test(input)) {
    zerosRegex = /^0+/;
    input = input.replace(zerosRegex, "");
  } else {
    input = input.replaceAll(" ", "-");
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    loadImage();
    loadName();

    pokemonInput.classList.add("error");
    return;
  }
  const data = await response.json();

  pokemonId = data.id;

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);

  pokemonInput.value = "";
  setCurrentId(pokemonId);
};

const fetchDpad = async (isRight) => {
  var newPokemonId = getCurrentId();
  if (newPokemonId === undefined) {
    return;
  }

  newPokemonId += isRight ? 1 : -1;

  const url = `https://pokeapi.co/api/v2/pokemon/${newPokemonId}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    return;
  }
  const data = await response.json();

  setCurrentId(newPokemonId);

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);
};

const sectionDpad = async (isTop) => {
  changeSection();
  const pokemonId = getCurrentId();

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    return;
  }
  const data = await response.json();

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);

  setCurrentId(pokemonId);
};

const loadName = (id, name) => {
  const pokemonName = document.getElementById("pokemonName");
  var newName, newId;

  if (id === undefined) {
    pokemonName.innerHTML = "Who is that pokémon?";
  } else {
    newId = id < 10 ? `00${id}` : id < 100 ? `0${id}` : id;
    newName = name.replaceAll(/(^\w|-\w)/g, (match) => {
      return ` ${match.charAt(match.length - 1).toUpperCase()}`;
    });

    pokemonName.innerHTML = `#${newId} - ${newName}`;
  }
};

const loadImage = (imageUrl) => {
  const pokemonImg = document.getElementById("pokemonImg");
  const isVisible = pokemonImg.style.visibility === "visible";

  if (imageUrl !== undefined && !isVisible) {
    pokemonImg.style.visibility = "visible";
  } else if (imageUrl === undefined && isVisible) {
    pokemonImg.style.visibility = "hidden";
  }

  pokemonImg.src = imageUrl;
};

const setCurrentId = (currentId) => {
  if (currentId <= 10000) {
    PokeDex.sectionA.pokemonId = currentId;
    if (PokeDex.sectionB.current) {
      changeSection();
    }
  } else {
    PokeDex.sectionB.pokemonId = currentId;
    if (PokeDex.sectionA.current) {
      changeSection();
    }
  }
};

const getCurrentId = () => {
  if (PokeDex.sectionA.current) {
    return PokeDex.sectionA.pokemonId;
  } else {
    return PokeDex.sectionB.pokemonId;
  }
};

const changeSection = () => {
  if (PokeDex.sectionA.current) {
    PokeDex.sectionA.current = false;
    PokeDex.sectionB.current = true;
  } else {
    PokeDex.sectionA.current = true;
    PokeDex.sectionB.current = false;
  }
};

// Global variables

var PokeDex = {
  sectionA: {
    pokemonId: 1, // Randomize
    current: true,
  },
  sectionB: {
    pokemonId: 10001,
    current: false,
  },
};

// Initialize fetching a pokemon to test css

document.getElementById("pokemonInput").value = "6";
document.getElementById("searchButton").click();

// Code to add event listeners on elements

const pokemonInput = document.getElementById("pokemonInput");
pokemonInput.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});