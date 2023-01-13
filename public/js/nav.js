var inst = document.querySelector("#inst1");
var people = document.querySelector("#people1");
var recruit = document.querySelector("#recruit1");
var burger = document.querySelector(".burger");
var cross = document.querySelector(".cross");
var menu = document.querySelector(".menu");

var nav = document.querySelectorAll(".nav-dropdown");

burger.addEventListener("click", () => {
    menu.style.display = "flex";
    burger.style.display = "none";
  });
  
  cross.addEventListener("click", () => {
    menu.style.display = "none";
    burger.style.display = "block";
  });