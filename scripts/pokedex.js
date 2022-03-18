const fetchPokemon = async () => {
  const pokemonName = document.getElementById("pokemonName");
  const input = pokemonName.value.toLowerCase();

  const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    loadImage();
    return;
  }

  const data = await response.json();
  loadImage(data.sprites.front_default);
};

const loadImage = (imageUrl = "") => {
  const pokemonImg = document.getElementById("pokemonImg");
  pokemonImg.src = imageUrl;
};

const pokemonName = document.getElementById("pokemonName");

pokemonName.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});
