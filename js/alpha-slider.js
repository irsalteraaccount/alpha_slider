class NewWaySlider extends HTMLElement {
  constructor() {
    super();
    this.track = this.querySelector('.nw_track');
    this.slides = this.querySelectorAll('.nw_slide');
    this.nwLeft = 0;
    this.next = this.onNextSlide.bind(this);
    this.addEventListener('click', this.next);
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
      const lastSlide = this.slides[(this.slides.length - 1)];
      firstSlide.classList.add('nw_slide--active');
      lastSlide.classList.remove('nw_slide--prev');
      this.nwLeft = 0;
      this.track.style.setProperty('--nw-left', (0 + 'px'));
    }
  }
}
if(!customElements.get('nw-slider')) customElements.define('nw-slider', NewWaySlider);