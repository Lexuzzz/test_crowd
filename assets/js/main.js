const el_chess_1 = document.querySelector('.top__mat-1');
const el_chess_2 = document.querySelector('.top__mat-2');
const el_section_top = document.querySelector('.top');
const el_session_img_wrapper = document.querySelector('.session__img__wrapper');
const el_session_img = document.querySelector('.session__img');
const array_el_th = document.querySelectorAll('th');
const array_el_td = document.querySelectorAll('td');
const array_el_td_copy = document.querySelectorAll('.td');
const el_party_nav = document.querySelector('.party .slider__nav');
let pos;
let act_top;

window.addEventListener("load", function () {
  if (window.screen.width < 1000) document.body.classList.remove('hover');
  if (window.screen.width < 800) changeParty();
  setColspan();
  setWidthSession_img();
  if (window.screen.width < 1366) {
    changeStages();
    changeLecture();
  };
}, false);

function paralax() {
  pos = el_section_top.getBoundingClientRect();
  act_top = window.scrollY;
  if (act_top >= pos.top && act_top <= 800) {

    if (window.screen.width < 560 && window.screen.width > 360) {

      el_chess_1.style.transform = "scale(" + 0.4 + ") translateY(-" + (act_top / 5) + "px) rotate(-" + act_top / 60 + "deg)";
      el_chess_2.style.transform = "scale(" + 0.4 + ") rotate(" + 0 + ") translateY(-" + (act_top / 4) + "px)";

    }
    else if (window.screen.width > 1366) {
      el_chess_1.style.transform = "translateY(-" + (act_top / 5) + "px) rotate(" + act_top / 20 + "deg)";
      el_chess_2.style.transform = "translateY(-" + (act_top / 7) + "px)";
    }
    else if (window.screen.width > 560) {
      el_chess_1.style.transform = "scale(" + 1.1 + ") translateY(-" + 0 + "px) rotate(-" + (act_top / 60) + "deg)";
      el_chess_2.style.transform = "scale(" + 0.9 + ") rotate(" + (act_top / 110) + "deg) translateY(" + 0 + "px)";
    }

  }
}
window.addEventListener('scroll', paralax);
window.addEventListener('resize', setWidthSession_img);



function setWidthSession_img() {  
  let session_img_style = window.getComputedStyle(el_session_img);
  let session_img_height = parseInt(session_img_style.getPropertyValue('height'));
  el_session_img_wrapper.style.height = session_img_height + 'px';
}

let copy_td = false;
function setColspan() {
  if (window.screen.width < 610 && !copy_td) {
    for (let i = 0; i < array_el_th.length; i++) {
      array_el_th[i].appendChild(array_el_td_copy[i]);
      array_el_td[i].remove();
    }
    copy_td = true;
  }
}

function changeLecture(){
  let el_lecture_span_wrap = document.querySelector('.lecture__head-wrap');
  let el_lecture_wrapper = document.querySelector('.lecture__wrapper');
  let copy_lecture_span_wrap = el_lecture_span_wrap.cloneNode(true);
  let el_h3 = document.createElement('h3');
  el_h3.appendChild(copy_lecture_span_wrap);
  el_lecture_wrapper.appendChild(el_h3);
  el_lecture_span_wrap.remove();
}

function changeStages() {
  let array_el_grid_wrapper = document.querySelectorAll('.grid-item__wrapper');
  let array_el_stages = document.querySelectorAll('.grid-item');
  array_el_stages[0].appendChild(array_el_grid_wrapper[1]);
  array_el_stages[1].remove();
  array_el_stages[3].appendChild(array_el_grid_wrapper[4]);
  array_el_stages[4].remove();
}

function changeParty() {
  let copy_el_party_nav = el_party_nav.cloneNode(true);
  let el_party_wrapper = document.querySelector('.party .party__wrapper');
  el_party_wrapper.appendChild(copy_el_party_nav);
  el_party_nav.remove();
}