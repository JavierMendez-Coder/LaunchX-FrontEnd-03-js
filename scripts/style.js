pokemonInput.addEventListener("keydown", function (event) {
  pokemonInput.classList.remove("error");
});

const makeButton = (idList) => {
  idList.map((id) => {
    const element = document.getElementById(id);
    element.addEventListener("mousedown", function handleClick(event) {
      element.classList.add("pressed");
    });
    element.addEventListener("mouseup", function handleClick(event) {
      element.classList.remove("pressed");
    });
    element.addEventListener("mouseleave", function handleClick(event) {
      element.classList.remove("pressed");
    });
  });
};

const makeChildAButton = (list) => {
  list.map((idList) => {
    const elementList = idList.map((id) => document.getElementById(id));
    elementList[0].addEventListener("mousedown", function handleClick(event) {
      elementList[1].classList.add("pressed");
    });
    elementList[0].addEventListener("mouseup", function handleClick(event) {
      elementList[1].classList.remove("pressed");
    });
    elementList[0].addEventListener("mouseleave", function handleClick(event) {
      elementList[1].classList.remove("pressed");
    });
  });
};

const idList = [
  "dpadTop",
  "dpadRight",
  "dpadBottom",
  "dpadLeft",
  "boardButton0",
  "boardButton1",
  "boardButton2",
  "boardButton3",
  "boardButton4",
  "boardButton5",
  "boardButton6",
  "boardButton7",
  "boardButton8",
  "boardButton9",
  "smallButton0",
  "smallButton1",
  "button0",
  "button1",
];

makeButton(idList);

const list = [
  ["searchButton", "searchButtonSurface"],
  ["resetButton", "resetButtonSurface"],
  ["randomButton", "randomButtonSurface"],
];

makeChildAButton(list);
