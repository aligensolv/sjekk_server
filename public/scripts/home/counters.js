let users_holder = document.getElementById('users-holder');
let cars_holder = document.getElementById('cars-holder');
let rules_holder = document.getElementById('rules-holder');
let places_holder = document.getElementById('places-holder');
let vl_holder = document.getElementById('vl-holder');

async function initializeUsersCount(){
  let response = await fetch('/api/users/count')
  users_holder.textContent = await response.text()
}

async function initializeCarsCount(){
  let response = await fetch('/api/cars/count')
  cars_holder.textContent = await response.text()
}

async function initializeRulesCount(){
  let response = await fetch('/api/rules/count')
  rules_holder.textContent = await response.text()
}

async function initializePlacesCount(){
  let response = await fetch('/api/places/count')
  places_holder.textContent = await response.text()
}

async function initializeViolationsCount(){
  let response = await fetch('/api/violations/count')
  vl_holder.textContent = await response.text()
}

document.addEventListener('DOMContentLoaded', async function(e){
  await initializeUsersCount();
  await initializeRulesCount();
  await initializePlacesCount();
  await initializeViolationsCount();
  await initializeCarsCount();
})