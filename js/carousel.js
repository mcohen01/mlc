const container = document.querySelector("#thumbnail_container");
const image = document.querySelector("#main_image");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const price = document.querySelector("#price");

const thumbnails = Array.from(document.querySelectorAll("#thumbnail_image"));

const nextButton = document.querySelector("#next_button");
const prevButton = document.querySelector("#prev_button");

let currentImage = 0;
let selectedImg = thumbnails[0];

if (localStorage.getItem("hash")) {
  currentImage = localStorage.getItem("hash");
  selectedImg = thumbnails[currentImage];
  window.location.hash = currentImage;
}

image.src = selectedImg.dataset.original;
title.textContent = selectedImg.dataset.title;
description.textContent = selectedImg.dataset.description;
date.textContent = selectedImg.dataset.date;
price.textContent = selectedImg.dataset.price;
selectedImg.classList.remove("opacity");

container.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName != "IMG") {
    return;
  }

  selectedImg.classList.add("opacity");

  selectedImg = target;

  selectedImg.classList.remove("opacity");

  currentImage = thumbnails.findIndex(function (element) {
    return target === element;
  });

  image.src = selectedImg.dataset.original;

  title.textContent = selectedImg.dataset.title;
  description.textContent = selectedImg.dataset.description;
  date.textContent = selectedImg.dataset.date;
  price.textContent = selectedImg.dataset.price;

  localStorage.setItem("hash", currentImage);
});

function nextImage() {
  if (currentImage >= thumbnails.length - 1) {
    currentImage = 0;
  } else {
    currentImage++;
    nextButton.href = `#${currentImage}`;
    localStorage.setItem("hash", currentImage);
  }

  renderImage();
}

function prevImage() {
  if (currentImage <= 0) {
    currentImage = thumbnails.length - 1;
  } else {
    currentImage--;
    prevButton.href = `#${currentImage}`;
    localStorage.setItem("hash", currentImage);
  }

  renderImage();
}

function renderImage() {
  selectedImg.classList.add("opacity");
  image.src = thumbnails[currentImage].dataset.original;

  selectedImg = thumbnails[currentImage];

  selectedImg.classList.remove("opacity");

  title.textContent = thumbnails[currentImage].dataset.title;
  description.textContent = thumbnails[currentImage].dataset.description;
  date.textContent = thumbnails[currentImage].dataset.date;
  price.textContent = thumbnails[currentImage].dataset.price;
}

nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);
