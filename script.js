const attackButton = document.querySelector(".btn--attack");
const healButton = document.querySelector(".btn--heal");
const monsterHealthDisplay = document.querySelector(".card--monster p");
const heroHealthDisplay = document.querySelector(".card--hero p");
const container = document.querySelector(".container");
const resultDisplay = document.querySelector(".card--result");
const gameResult = resultDisplay.querySelector("p");

const MAX_HEALTH = 100;
const MAX_ATTACK = 10;
const MAX_HEAL = 20;

const RESULT = {
  lose: "you lost",
  win: "you win",
};

let monsterHealth = MAX_HEALTH;
let heroHealth = MAX_HEALTH;

const displayHealth = () => {
  monsterHealthDisplay.innerText = monsterHealth;
  heroHealthDisplay.innerText = heroHealth;
};

const attackTo = (personageHealth) => {
  return (personageHealth -= Math.floor(Math.random() * MAX_ATTACK));
};

const heal = () => (heroHealth += Math.floor(Math.random() * MAX_HEAL));

const checkGame = (heroHealth, monsterHealth) => {
  let result;

  const isMonsterDead = monsterHealth <= 0;
  const isHeroDead = heroHealth <= 0;

  if (isMonsterDead || isHeroDead) {
    result = isHeroDead ? RESULT.lose : RESULT.win;

    container.classList.add("hide");
    resultDisplay.classList.remove("hide");
    gameResult.innerText = result;
  }
};

const attackHandler = () => {
  monsterHealth = attackTo(monsterHealth);
  heroHealth = attackTo(heroHealth);
  displayHealth();
  checkGame(heroHealth, monsterHealth);
};

const healHandler = () => {
  heroHealth = heal();
  if (heroHealth > MAX_HEALTH) heroHealth = MAX_HEALTH;
  heroHealth = attackTo(heroHealth);
  displayHealth();
  checkGame(heroHealth, monsterHealth);
};

attackButton.addEventListener("click", attackHandler);
healButton.addEventListener("click", healHandler);
