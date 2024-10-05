class NewWaySlider extends HTMLElement {
  constructor() {
    super();
    this.track = this.querySelector('.nw_track');
    this.slides = this.querySelectorAll('.nw_slide');
    this.nwLeft = 0;
  }

  onNextSlide(){
    const currSlide = this.querySelector('.nw_slide--active');
    const currSlideBounds = currSlide.getBoundingClientRect().width;
    const nextSlide = currSlide.nextElementSibling;
    currSlide.classList.remove('nw_slide--active');
    this.nwLeft += currSlideBounds;
    this.track.style.setProperty('--nw-left', ('-' + this.nwLeft + 'px'));
    if(nextSlide) nextSlide.classList.add('nw_slide--active');
    if(!nextSlide){
      const firstSlide = this.slides[0];
      firstSlide.classList.add('nw_slide--active');
      this.nwLeft = 0;
      this.track.style.setProperty('--nw-left', (0 + 'px'));
    }
  }

  onPrevSlide(){
    const currSlide = this.querySelector('.nw_slide--active');
    const currSlideBounds = currSlide.getBoundingClientRect().width;
    const prevSlide = currSlide.previousElementSibling;
    if(!prevSlide){
      const lastSlide = this.slides[(this.slides.length - 1)];
      const lastBound = lastSlide.getBoundingClientRect().width;
      lastSlide.classList.add('nw_slide--active');
      const totalWidth = this.getLastCount();
      this.nwLeft = totalWidth - lastBound;
      this.track.style.setProperty('--nw-left', ('-' + this.nwLeft + 'px'));
      const firstSlide = this.slides[0];
      firstSlide.classList.remove('nw_slide--active');
      return;
    }
    currSlide.classList.remove('nw_slide--active');
    prevSlide.classList.add('nw_slide--active');
    this.nwLeft -= currSlideBounds;
    this.track.style.setProperty('--nw-left', ('-' + this.nwLeft + 'px'));
  }

  getLastCount(){
    let width = 0;
    this.slides.forEach(slide => {
      const bounds = slide.getBoundingClientRect().width;
      width += bounds;
    });
    return width;
  }
}

class NewWaySliderArrows extends HTMLElement {
  constructor() {
    super();
    this.button = this.querySelector('button');
    this.click = this.onClick.bind(this);
    this.button.addEventListener('click', this.click);
  }

  onClick(event){
    event.preventDefault();
    const slider = document.querySelector(this.dataset.ref);
    if(!slider) return;
    const behave = this.dataset.case;

    switch (behave) {
      case 'prev':
        slider.onNextSlide();
        break;
      case 'next':
        slider.onPrevSlide();
        break;
      default:
        break;
    }
  }
}
if(!customElements.get('nw-slider')) customElements.define('nw-slider', NewWaySlider);
if(!customElements.get('nw-arrow')) customElements.define('nw-arrow', NewWaySliderArrows);