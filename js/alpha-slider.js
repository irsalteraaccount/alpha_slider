class AlphaSlide extends HTMLElement {
  constructor() {
    super();
  }
  static _gsi(parent) {
    const obj = {};
    const slides = Array.from(parent.querySelectorAll('alpha-slide'));
    obj.currIndex = slides.map(slide => slide.classList.contains('alp-slide--active')).indexOf(true);
    obj.nextIndex = (obj.currIndex + 1) % slides.length;
    obj.prevIndex = (obj.currIndex - 1 + slides.length) % slides.length;
    obj.length = slides.length;
    return obj;
  }
  static _sas(parent, index){
    const slides = Array.from(parent.querySelectorAll('alpha-slide'));
    slides.forEach(slide => {
      slide.classList.remove('alp-slide--active');
    });
    slides[index].classList.add('alp-slide--active');
    return slides[index];
  }
}
if(!customElements.get('alpha-slide')) customElements.define('alpha-slide', AlphaSlide);
class AlphaArrow extends HTMLElement {
  constructor() {
    super();
    this.event = this._ocl.bind(this);
    this.button = this.querySelector('button');
    this.button.addEventListener('click', this.event);
  }
  _ocl(event){
    event.preventDefault();
    this.slider = this.closest(this.dataset.slider);
    this.slidesData = AlphaSlide._gsi(this.slider);
    switch(this.dataset.arrow){
      case 'next':
        this._ns();
        break;
      default:
        this._ps();
        break;
    }
  }
  _ps(){
    const currSlide = AlphaSlide._sas(this.slider, this.slidesData.prevIndex);
    this._nxts(currSlide, this.dataset.arrow);
  }
  _ns(){
    const currSlide = AlphaSlide._sas(this.slider, this.slidesData.nextIndex);
    this._nxts(currSlide, this.dataset.arrow);
  }
  _nxts(slide, direction){
    if(direction === 'prev'){
      const left = slide.offsetLeft;
      const track = this.slider.querySelector('.alp-track');
      track.scrollLeft = left;
    }
    if(direction === 'next'){
      const bounds = slide.getBoundingClientRect();
      const left = bounds.left;
      const track = this.slider.querySelector('.alp-track');
      track.scrollLeft += left;
    }
  }
  static setStatuses(button, disabled){
    if(disabled){
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('disabled', '');
      button.classList.add('disabled');
      return;
    }
    button.removeAttribute('aria-disabled');
    button.removeAttribute('disabled');
    button.classList.remove('disabled');
  }
}
if(!customElements.get('alpha-slide')) customElements.define('alpha-slide', AlphaSlide);
if(!customElements.get('alpha-arrow')) customElements.define('alpha-arrow', AlphaArrow);