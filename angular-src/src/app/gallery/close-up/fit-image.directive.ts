import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[mfFitImage]'
})
export class FitImageDirective {

  constructor(private el:ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, "max-height", (window.innerHeight)+ "px");
    window.addEventListener('resize', () => {
      renderer.setStyle(el.nativeElement, "max-height", (window.innerHeight)+ "px");
    });
  }
}
