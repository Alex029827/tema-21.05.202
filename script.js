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

  // 4. stergem continutul din Custom tip input
  customTipInput.value = "";
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
const customTipInputError = document.querySelector(".custom-tip-input-error");
const tipPerPersonParagraph = document.querySelector(".tip-amount-person");

const totalPerPersonParagraph = document.querySelector(".total-amount-person");

//--------- TEMA(validate people input )--------------
// declaram constanta pentru people-input-error
const peopleInputError = document.querySelector(".people-input-error");

const handleSubmit = (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  // decalrama o variabila care numara numarul de erori care apare al cele 3 inputuri
  let numberOfErrors = 0;

  // 1. Obtine numarul introdus de user in campul Bill
  const bill = Number(data.get("bill"));
  const onErrorBorderBillInput = document.querySelector("#bill");

  // 2. Daca numarul este mai mic sau egal decat zero =>
  // afiseaza paragraful cu eroare
  if (bill <= 0) {
    billInputError.classList.remove("hide");
    onErrorBorderBillInput.classList.add("on-error-border-input");
    numberOfErrors++;
  } else {
    // 3. In caz contrar sa se ascunda paragraful cu eroare
    billInputError.classList.add("hide");
  }

  //----- --------------- Custom Tip ----------------------------------
  const customTip = Number(data.get("custom-tip"));

  if (customTip < 0) {
    customTipInputError.classList.remove("hide");
    numberOfErrors++;
  } else {
    customTipInputError.classList.add("hide");
  }

  //------------- Number of People Input-----------------

  // 1. Obtine numarul introdus de user in campul Number Of People
  const people = Number(data.get("number-of-people"));
  const onErrorBorderPeopleInput = document.querySelector("#number-of-people");

  // 2. Daca numarul este mai mic sau egal decat zero =>
  // afiseaza paragraful cu eroare

  if (people <= 0) {
    peopleInputError.classList.remove("hide");
    onErrorBorderPeopleInput.classList.add("on-error-border-input");
    numberOfErrors++;
  } else {
    // 3. In caz contrar sa se ascunda paragraful cu eroare
    peopleInputError.classList.add("hide");
  }

  if (numberOfErrors > 0) {
    // daca nr de erori e mai mare ca 0 atunci nu mai executam calculul de mai jos .
    return;
  }

  //-------- Calculate Tip per person ----------

  const selectedTip = document.querySelector(".selected-tip");
  if (selectedTip !== null) {
    const percentage = Number(selectedTip.innerText.replace("%", ""));
    const totalTip = bill * (percentage / 100);
    const tipPerPerson = totalTip / people;
    tipPerPersonParagraph.innerText = "$" + tipPerPerson.toFixed(2); // "$" + 7.5 = "$7.5"
    // .toFixed(2) = nr din tipPerPerson cu doua zecimale -> $7.50

    //--------- Total per person(inclusiv cu tip)--------
    const totalPerPerson = (bill + totalTip) / people;
    totalPerPersonParagraph.innerText = "$" + totalPerPerson.toFixed(2);
  } else {
    // for custom tip
    const totalTip = bill * (customTip / 100);
    const tipPerPerson = totalTip / people;
    tipPerPersonParagraph.innerText = "$" + tipPerPerson.toFixed(2);

    // adaugam din nou total per person din if si in else deoarece vrem
    // sa ne calculeze totalul si atunci cand user-ul introduce un tip custom.
    const totalPerPerson = (bill + totalTip) / people;
    totalPerPersonParagraph.innerText = "$" + totalPerPerson.toFixed(2);
  }
};

form.addEventListener("submit", handleSubmit);

//----------------------- Custom tip ----------------

const customTipInput = document.querySelector("#custom-tip");

const handleCustomTipInput = () => {
  const selectedTipButton = document.querySelector(".selected-tip");
  if (selectedTipButton !== null) {
    selectedTipButton.classList.remove("selected-tip");
  }
};

customTipInput.addEventListener("input", handleCustomTipInput);

// ------------ Reset button---------------
const billInput = document.querySelector("#bill");
const numberOfPeopleInput = document.querySelector("#number-of-people");
const resetButton = document.querySelector(".reset-button");

const handleReset = () => {
  billInput.value = "";
  customTipInput.value = "";
  numberOfPeopleInput.value = "";

  // --------- Deselectam butonul de tip selectat------
  const selectedTipButton = document.querySelector(".selected-tip"); // declaram din nou deoarece
  // este declarata doar in functia de mai sus
  if (selectedTipButton !== null) {
    selectedTipButton.classList.remove("selected-tip");
  }

  // declaram din nou constanta pentru border pe eroare iar mai jos ii dam remove la clasa CSS dupa reset.
  const onErrorBorderBillInput = document.querySelector("#bill");
  const onErrorBorderPeopleInput = document.querySelector("#number-of-people");

  // Ascundem erorile, daca sunt afisate(le adaugam clasa hide)
  billInputError.classList.add("hide");
  customTipInputError.classList.add("hide");
  peopleInputError.classList.add("hide");
  onErrorBorderBillInput.classList.remove("on-error-border-input");
  onErrorBorderPeopleInput.classList.remove("on-error-border-input");

  /// resetare rezultate
  tipPerPersonParagraph.innerText = "$0.00";
  totalPerPersonParagraph.innerText = "$0.00";
};

resetButton.addEventListener("click", handleReset); // golim imputuri, deselectare button , resetare cifre din zona de rezultate.
