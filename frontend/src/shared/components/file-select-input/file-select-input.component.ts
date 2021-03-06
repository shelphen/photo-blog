import {Component, Input, Inject, ElementRef} from '@angular/core';

@Component({
    selector: 'file-select-input',
    template: require('./file-select-input.component.html'),
})
export class FileSelectInputComponent {
    @Input() disabled:boolean;
    @Input() onChangeCallback:any;

    constructor(@Inject(ElementRef) protected element:ElementRef) {
    }

    onChange() {
        if (this.isFile()) {
            if (typeof(this.onChangeCallback) === 'function') {
                this.onChangeCallback(this.getFile());
            }
        }
    }

    getFile() {
        return this.element.nativeElement.firstElementChild.files[0];
    }

    isFile() {
        return this.element.nativeElement.firstElementChild.files.length > 0;
    }
}
