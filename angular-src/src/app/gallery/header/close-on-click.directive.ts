import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[mfCloseOnClick]'
})
export class CloseOnClickDirective {

  @Input() respond: boolean;
  @Output() closeEvent:EventEmitter<void> = new EventEmitter<void>();

  @HostListener("document:click", ['$event'])
  @HostListener("window:scroll", ['$event'])
  clickCallback(event) {
    event.stopPropagation();
    if (!this.respond) {
      return;
    }
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.closeEvent.next();
    }
  }

  constructor(private eRef: ElementRef) { }

}
