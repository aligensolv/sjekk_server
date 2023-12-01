let users_box = document.getElementById('users-box');
let cars_box = document.getElementById('cars-box');
let rules_box = document.getElementById('rules-box');
let places_box = document.getElementById('places-box');
let vl_box = document.getElementById('vl-box');

users_box.addEventListener('click', (event) => {
  location.href = '/users'
})
cars_box.addEventListener('click', (event) => {
  location.href = '/cars'
})
rules_box.addEventListener('click', (event) => {
  location.href = '/rules'
})
places_box.addEventListener('click', (event) => {
  location.href = '/places'
})
vl_box.addEventListener('click', (event) => {
  location.href = '/violations'
})