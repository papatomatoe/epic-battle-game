"use strict";

const gameDisplay = document.querySelector(".container");
const attackButton = gameDisplay.querySelector(".btn--attack");
const healButton = gameDisplay.querySelector(".btn--heal");
const monsterHealthDisplay = gameDisplay.querySelector(".card--monster p");
const heroHealthDisplay = gameDisplay.querySelector(".card--hero p");
const resultDisplay = document.querySelector(".card--result");
const resultDisplayText = resultDisplay.querySelector("p");

const RESULT = {
  win: "you win",
  lost: "you lost",
};

const RANDOM_ATTACK_MAX_VALUE = 20;
const RANDOM_HEAL_MAX_VALUE = 30;

const HIDE_CLASS = "hide";

const MONSTER_HEALTH = 100;
const HERO_HEALTH = 100;

let monsterHealthValue;
let heroHealthValue;

const startGame = () => {
  monsterHealthValue = MONSTER_HEALTH;
  heroHealthValue = HERO_HEALTH;

  monsterHealthDisplay.innerText = MONSTER_HEALTH;
  heroHealthDisplay.innerText = HERO_HEALTH;

  attackButton.addEventListener("click", heroAttack);

  healButton.addEventListener("click", heroHeal);
};

const getRandomPoint = (maxRandomValue) =>
  Math.floor(Math.random() * maxRandomValue);

const getGameResult = () => (heroHealthValue > 0 ? RESULT.win : RESULT.lost);

const checkGame = () => {
  if (monsterHealthValue <= 0 || heroHealthValue <= 0) {
    attackButton.removeEventListener("click", heroAttack);
    healButton.removeEventListener("click", heroHeal);

    resultDisplay.classList.remove(HIDE_CLASS);
    gameDisplay.classList.add(HIDE_CLASS);

    resultDisplayText.innerText = getGameResult();
  }
};

const monsterAttack = () => {
  heroHealthValue -= getRandomPoint(RANDOM_ATTACK_MAX_VALUE);
  checkGame();
  heroHealthDisplay.innerText = heroHealthValue;
};

const heroAttack = () => {
  monsterHealthValue -= getRandomPoint(RANDOM_ATTACK_MAX_VALUE);
  checkGame();
  monsterHealthDisplay.innerText = monsterHealthValue;
  monsterAttack();
};

const heroHeal = () => {
  heroHealthValue += getRandomPoint(RANDOM_HEAL_MAX_VALUE);
  if (heroHealthValue > HERO_HEALTH) heroHealthValue = HERO_HEALTH;
  heroHealthDisplay.innerText = heroHealthValue;
  monsterAttack();
};

startGame();
