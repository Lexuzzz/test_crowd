let has_bullet = false;
let per_view = 3;
let active_page = new Array();
let pages = new Map();
let arr_page = new Array();
let count_slides = new Array();
let timer = new Map();
window.onload = function () {
  initSliders('party');
  initSliders('stages');
};

function initSliders(str) {
  if (window.screen.width > 1366) {
    per_view = 3;
  }else if (window.screen.width < 800) {
    per_view = 1;
  } else {
    per_view = 2;
  };


  if (window.screen.width < 1366 && str == 'stages') {
    let temp = document.querySelector('.' + str + ' .stages-grid');
    temp.classList.add('slider__wrapper');
    temp = document.querySelector('.' + str + ' .slider__nav');
    temp.classList.add('visible');
  } else if (str == 'stages') {
    return;
  }
  pages.set(str, new Array());
  active_page[str] = 1;
  componateSlider(str);
  go_slider(str);
}

function componateSlider(str) {

  let el_slider_wrapper = document.querySelector('.' + str + ' .slider__wrapper');
  let array_el_all_slide = el_slider_wrapper.querySelectorAll('.' + str + ' .slide');
  let el_slider = document.querySelector('.' + str + ' .slider');

  let slider_wrapper_style = window.getComputedStyle(el_slider_wrapper);
  let slider_width = el_slider.offsetWidth;

  let gap = parseInt(slider_wrapper_style.getPropertyValue('gap'));

  let slide_width = (slider_width - (per_view - 1) * (gap)) / per_view;
  array_el_all_slide.forEach(e => {
    e.style.width = slide_width + "px";
  })

  el_slider.style.height = el_slider_wrapper.scrollHeight + 'px';

}

function go_slider(str) {
  let el_slider_wrapper = document.querySelector('.' + str + ' .slider__wrapper');

  let array_el_all_slide = el_slider_wrapper.querySelectorAll('.' + str + ' .slide');
  count_slides[str] = array_el_all_slide.length;

  let temp_pages = pages.get(str);
  for (i = 1; i <= count_slides[str]; i++) {
    let k = Math.ceil(i / per_view);
    if (!Object.hasOwn(temp_pages, k)) {
      temp_pages[k] = i;
    }
  }

  drowPagination(str);
};


function nextSlide(str) {
  let el_slider = document.querySelector('.' + str + ' .slider');  
  if (timer.has(str))
    clearTimeout(timer.get(str));

  let temp_pages = pages.get(str);
  if (active_page[str] < Object.keys(temp_pages).length) {
    active_page[str] = active_page[str] + 1;
    drawSlide(str);
  }else if(el_slider.classList.contains('infinate')){
    
    active_page[str] = 1;
    drawSlide(str);
  }  
}

function prevSlide(str) {
  let el_slider = document.querySelector('.' + str + ' .slider');  
  if (active_page[str] > 1) {
    if (timer.has(str)) {
      clearTimeout(timer.get(str));
    }
    active_page[str] = active_page[str] - 1;
    drawSlide(str);
  }else if(el_slider.classList.contains('infinate')){
    if (timer.has(str)) {
      clearTimeout(timer.get(str));
    }    
    active_page[str] = pages.get(str).length-1;
    drawSlide(str);
  }  
}

function drawSlide(str) {
  let el_slider_wrapper = document.querySelector('.' + str + ' .slider__wrapper');
  let slider_wrapper_style = window.getComputedStyle(el_slider_wrapper);
  let width_slider_wrapper = parseInt(slider_wrapper_style.getPropertyValue('width'));
  let gap = parseInt(slider_wrapper_style.getPropertyValue('gap'));
  let el_slider = document.querySelector('.' + str + ' .slider');
  let part = (el_slider.offsetWidth + gap) * (active_page[str] - 1);
  let part_proc = part / width_slider_wrapper;
  el_slider_wrapper.style.transform = "translateX(-" + 100 * part_proc + "%)";

  drowPagination(str);
}
function autoPlay(str) {  
  let temp_timer = setTimeout(function () {
    nextSlide(str);
  }, 4000)
  timer.set(str, temp_timer);
}

function drowPagination(str) {
  let el_slider = document.querySelector('.' + str + ' .slider');
  let temp_pages = pages.get(str);
  let el_next = document.querySelector('.' + str + ' .next');
  let el_prev = document.querySelector('.' + str + ' .prev');
  if(el_slider.classList.contains('infinate')){
    el_prev.classList.remove('disabled');
    el_next.classList.remove('disabled');
  }else if (active_page[str] == Object.keys(temp_pages).length) {
    el_next.classList.add('disabled');
    el_prev.classList.remove('disabled');
  } else if (active_page[str] == 1) {
    el_prev.classList.add('disabled');
    el_next.classList.remove('disabled');
  }
  else {
    el_prev.classList.remove('disabled');
    el_next.classList.remove('disabled');
  }
  if (str == 'stages') {
    if (has_bullet) {
      let array_el_bullets = document.querySelectorAll('.' + str + ' .bullet');
      array_el_bullets.forEach(e => {
        e.classList.remove('bullet-active');
      })

      array_el_bullets[active_page[str] - 1].classList.add('bullet-active');
    } else {
      createBullet(str);
    }

  } else {
    let el_all_nubmer_slides = document.querySelector('.' + str + ' .all__slides');
    el_all_nubmer_slides.innerText = count_slides[str];
    let el_actual_slides = document.querySelector('.' + str + ' .actual__slides');

    if (active_page[str] < Object.keys(temp_pages).length) {
      el_actual_slides.innerText = per_view * active_page[str];
    }
    else {
      el_actual_slides.innerText = count_slides[str];
    }
  }  
  if (el_slider.classList.contains('auto-play')) {
    autoPlay(str);
  }
}

function createBullet(str) {
  let temp_pages = pages.get(str);
  let bullet_pag = document.querySelector('.' + str + ' .bullet-pagination')
  for (let i = 0; i < Object.keys(temp_pages).length; i++) {
    let bulet = document.createElement('div');
    bulet.classList.add('bullet');
    bullet_pag.appendChild(bulet);
  }
  has_bullet = true;
  let array_el_bullets = document.querySelectorAll('.' + str + ' .bullet');
  array_el_bullets[0].classList.add('bullet-active');
}
