const fetchPokemon = async () => {
  const pokemonInput = document.getElementById("pokemonInput");
  var input = pokemonInput.value.toLowerCase();
  var pokemonId = undefined;

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
  //  PokeDex.sectionA = { pokemonId: undefined };
    return;
  }
  const data = await response.json();

  // PokeDex.sectionA = { pokemonId: data.id };
  pokemonId = data.id;

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);

  pokemonInput.value = "";
  // save value with function
};

const fetchDpad = async (isRight) => {
  if (PokeDex.sectionA.pokemonId === undefined) {
    return;
  }

  const newPokemonId =
    isRight === true
      ? PokeDex.sectionA.pokemonId + 1
      : PokeDex.sectionA.pokemonId - 1;

  const url = `https://pokeapi.co/api/v2/pokemon/${newPokemonId}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    return;
  }
  const data = await response.json();

  PokeDex.sectionA = { pokemonId: newPokemonId };

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);
};

const sectionDpad = async (isTop) => {
  //  if (isTop) {
  //    if (PokeDex.sectionB.pokemonId === undefined) {
  //      PokeDex.sectionB = { pokemonId: 10001 };
  //    }
  //  } else {
  //    if (PokeDex.sectionA.pokemonId === undefined) {
  //      PokeDex.sectionA = { pokemonId: 1 };
  //    }
  //  }

  const url = `https://pokeapi.co/api/v2/pokemon/${PokeDex.sectionpokemonId}`;
  const response = await fetch(url).then((response) => response);

  if (!response.ok) {
    return;
  }
  const data = await response.json();

  loadName(data.id, data.name);
  loadImage(data.sprites.front_default);
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

// Global variables

var PokeDex = {
  sectionA: {
    pokemonId: 1,
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

// Code to add/remove/update classes on elements

pokemonInput.addEventListener("keydown", function (event) {
  pokemonInput.classList.remove("error");
});

const dpadTop = document.getElementById("dpadTop");
dpadTop.addEventListener("mousedown", function handleClick(event) {
  dpadTop.classList.add("pressed");
});

dpadTop.addEventListener("mouseup", function handleMouseup(event) {
  dpadTop.classList.remove("pressed");
});

dpadTop.addEventListener("mouseleave", function handleMouseup(event) {
  dpadTop.classList.remove("pressed");
});

const dpadRight = document.getElementById("dpadRight");
dpadRight.addEventListener("mousedown", function handleClick(event) {
  dpadRight.classList.add("pressed");
});

dpadRight.addEventListener("mouseup", function handleMouseup(event) {
  dpadRight.classList.remove("pressed");
});

dpadRight.addEventListener("mouseleave", function handleMouseup(event) {
  dpadRight.classList.remove("pressed");
});

const dpadBottom = document.getElementById("dpadBottom");
dpadBottom.addEventListener("mousedown", function handleClick(event) {
  dpadBottom.classList.add("pressed");
});

dpadBottom.addEventListener("mouseup", function handleMouseup(event) {
  dpadBottom.classList.remove("pressed");
});

dpadBottom.addEventListener("mouseleave", function handleMouseup(event) {
  dpadBottom.classList.remove("pressed");
});

const dpadLeft = document.getElementById("dpadLeft");
dpadLeft.addEventListener("mousedown", function handleClick(event) {
  dpadLeft.classList.add("pressed");
});

dpadLeft.addEventListener("mouseup", function handleMouseup(event) {
  dpadLeft.classList.remove("pressed");
});

dpadLeft.addEventListener("mouseleave", function handleMouseup(event) {
  dpadLeft.classList.remove("pressed");
});
