const tabs = () => {
  document.querySelectorAll(".faq__button").forEach(function (el) {
    el.addEventListener("click", () => {
      if (el.classList.contains("faq__button_active")) {
        el.classList.remove("faq__button_active");
        el.querySelector(".fag__plus").classList.remove("remove");
        el.querySelector(".fag__minus").classList.add("remove");
        el.querySelector(".faq__text").classList.remove("faq__text_visible");
        return;
      }

      el.classList.add("faq__button_active");
      el.querySelector(".fag__plus").classList.add("remove");
      el.querySelector(".fag__minus").classList.remove("remove");
      el.querySelector(".faq__text").classList.add("faq__text_visible");
    });
  });
};

tabs();

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.930494, 30.36674],
    zoom: 14,
  });
}

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".top__btn_prev");
const next = document.querySelector(".top__btn_next");

let index = 0;

const activeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove("slide__active");
  }
  slides[n].classList.add("slide__active");
};

const activeDot = (n) => {
  for (dot of dots) {
    dot.classList.remove("dot__active");
  }
  dots[n].classList.add("dot__active");
};

const prepareCurrentSlide = (index) => {
  activeSlide(index);
  activeDot(index);
  setTimeout(() => {
    animOnScroll();
  }, 300);
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

dots.forEach((dot, indexDot) => {
  dot.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
  });
});

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// setInterval(nextSlide, 9000);

// -------------------------------------------------------------------------------------------------------------------------------------------------

const modalWindow = document.querySelector(".modal");

const activeImg = (n) => {
  const modalImgs = document.querySelectorAll(".modal__gallery");
  for (img of modalImgs) {
    img.classList.remove("visible");
  }
  modalImgs[n].classList.add("visible");
};

const showModal = () => {
  const imgs = document.querySelectorAll(".gallery__img");

  imgs.forEach((img, indexImg) => {
    img.addEventListener("click", () => {
      modalWindow.classList.add("visible");
      activeImg(indexImg);
    });
  });
};

showModal();

const closeModal = () => {
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    modalWindow.classList.remove("visible");
  });
  modalWindow.addEventListener("click", (e) => {
    if (!e.target.classList.contains("modal__gallery")) {
      modalWindow.classList.remove("visible");
    }
  });
};

closeModal();

// -------------------------------------------------------------------------------------------------------------------------------------------

const activeModal = () => {
  const modalConnection = document.querySelector(".modal__connection");
  const connection = document.getElementById("btn_connection");
  connection.addEventListener("click", () => {
    modalConnection.classList.add("visible");
  });
  const close = document.querySelector(".modal__connection_close");
  close.addEventListener("click", () => {
    modalConnection.classList.remove("visible");
  });
  modalConnection.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal__connection") &&
      e.target.classList.contains("fade")
    ) {
      modalConnection.classList.remove("visible");
    }
  });
};

activeModal();

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }

  const offset = (el) => {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

// ----------------------------------------------------------------------------------------------------------------------------------

const activeScroll = () => {
  const items = document.querySelectorAll(".header__menu_item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.innerText == "ГЛАВНАЯ") {
        document.querySelector(".top").scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (item.innerText == "УСЛУГИ") {
        document
          .querySelector(".services")
          .scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (item.innerText == "КЕЙСЫ") {
        document.querySelector(".faq").scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (item.innerText == "О КОМПАНИИ") {
        document
          .querySelector(".about-us")
          .scrollIntoView({ behavior: "smooth" });
        return;
      }
      if (item.innerText == "КОНТАКТЫ") {
        document
          .querySelector(".contacts")
          .scrollIntoView({ behavior: "smooth" });
        return;
      }
    });
  });
};

activeScroll();

// ------------------------------------------------------------------------------------------------------------------------------------------

const hiddenBtn = document.querySelector(".hidden__btn");

const visibleBtn = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // console.log("Текущая прокрутка: " + scrollTop);
  if (scrollTop > 0) {
    hiddenBtn.classList.add("visible_btn");
  } else {
    hiddenBtn.classList.remove("visible_btn");
  }
};

window.addEventListener("scroll", visibleBtn);

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

hiddenBtn.addEventListener("click", scrollTop);
