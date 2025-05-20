// ------------------ Tip Buttons ------------------
const tipButtons = document.querySelectorAll(".tip-button");

console.log("butoanele", tipButtons);

const handleSelectTip = (e) => {
  // 1. gaseste butonul care este acum selectat
  const currentlySelectedTip = document.querySelector(".selected-tip");

  // 2. daca exista => scoate-i clasa selected-tip
  if (currentlySelectedTip !== null) {
    currentlySelectedTip.classList.remove("selected-tip");
  }

  // 3. adauga clasa selected-tip pe button-ul apasat acum
  e.target.classList.add("selected-tip");
};

// higher order function (functie de nivel superior)
// pentru ca primeste ca parametru o alta functie.
// mai mereu acea functie o cream inline si este anonima.
tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", handleSelectTip);
});

// ------------------ Calculator Form ------------------
const form = document.querySelector(".calculator-form");
const billInputError = document.querySelector(".bill-input-error");

//--------- TEMA(validate people input )--------------
// declaram constanta pentru people-input-error
const peopleInputError = document.querySelector(".people-input-error");

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  // 1. Obtine numarul introdus de user in campul Bill
  const bill = Number(data.get("bill"));

  // 2. Daca numarul este mai mic sau egal decat zero =>
  // afiseaza paragraful cu eroare
  if (bill <= 0) {
    billInputError.classList.remove("hide");
  } else {
    // 3. In caz contrar sa se ascunda paragraful cu eroare
    billInputError.classList.add("hide");
  }

  // 1. Obtine numarul introdus de user in campul Number Of People
  const people = Number(data.get("number-of-people"));

  // 2. Daca numarul este mai mic sau egal decat zero =>
  // afiseaza paragraful cu eroare

  if (people <= 0) {
    peopleInputError.classList.remove("hide");
  } else {
    // 3. In caz contrar sa se ascunda paragraful cu eroare
    peopleInputError.classList.add("hide");
  }
};

form.addEventListener("submit", handleSubmit);
