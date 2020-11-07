mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

document.getElementById('myBtn').onclick = function () {
  scrollTo(document.documentElement, 0, 750);   
}
   
function scrollTo(element, to, duration) {
   let start = element.scrollTop,
       change = to - start,
       currentTime = 0,
       increment = 20;
       
   let animateScroll = function(){        
       currentTime += increment;
       let val = Math.easeInOutQuad(currentTime, start, change, duration);
       element.scrollTop = val;
       if(currentTime < duration) {
           setTimeout(animateScroll, increment);
       }
   };
   animateScroll();
}

Math.easeInOutQuad = function (t, b, c, d) {
 t /= d/2;
 if (t < 1) return c/2*t*t + b;
 t--;
 return -c/2 * (t*(t-2) - 1) + b;
};


const multiItemSlider = function (step) {

      const sliderWrapper = document.getElementById('slider_wrapper'); 
      const sliderItems = document.querySelectorAll('.slider_item'); 
      const sliderControls = document.querySelectorAll('.slider_control');
      const sliderControlLeft = document.getElementById('slider_control_left'); 
      const sliderControlRight = document.getElementById('slider_control_right');
      const wrapperWidth = sliderWrapper.offsetWidth;
      const itemWidth = sliderItems[0].offsetWidth;    
      let positionLeftItem = 0; 
      let transform = 0; 
      const items = [];

      sliderItems.forEach(function (item, index) {
        items.push({ item: item, position: index, transform: 0 });
      });

      const position = {
        getMin: 0,
        getMax: items.length - 1,
      }

      const transformItem = function (direction) {
        if (direction === 'right') {
          if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!sliderControlLeft.classList.contains('slider_control_show')) {
            sliderControlLeft.classList.add('slider_control_show');
          }
          if (sliderControlRight.classList.contains('slider_control_show') && (positionLeftItem + wrapperWidth / itemWidth) >= position.getMax) {
            sliderControlRight.classList.remove('slider_control_show');
          }
          positionLeftItem++;
          transform -= step;
        }
        if (direction === 'left') {
          if (positionLeftItem <= position.getMin) {
            return;
          }
          if (!sliderControlRight.classList.contains('slider_control_show')) {
            sliderControlRight.classList.add('slider_control_show');
          }
          if (sliderControlLeft.classList.contains('slider_control_show') && positionLeftItem - 1 <= position.getMin) {
            sliderControlLeft.classList.remove('slider_control_show');
          }
          positionLeftItem--;
          transform += step;
        }

        sliderWrapper.style.transform = 'translateX(' + transform + '%)';
      }

      const controlClick = function (e) {
        if (e.target.classList.contains('slider_control')) {
          e.preventDefault();
          let direction = e.target.classList.contains('slider_control_right') ? 'right' : 'left';
          transformItem(direction);
        }
      };

      const setUpListeners = function () {
        sliderControls.forEach(function (item) {
          item.addEventListener('click', controlClick);
        });
      }

      setUpListeners();

      return {
        right: function () {
          transformItem('right');
        },
        left: function () {
          transformItem('left');
        }
      }
};

if (slider_wrapper.offsetWidth == 1050) {
  multiItemSlider(32.5)
} else if (slider_wrapper.offsetWidth > 1050) {
  multiItemSlider(25)
} else if (slider_wrapper.offsetWidth < 1050) {
  multiItemSlider(52.5)
}

//const slider = multiItemSlider();






