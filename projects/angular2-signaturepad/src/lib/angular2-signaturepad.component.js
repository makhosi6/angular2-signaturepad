import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import * as SignaturePadNative from 'signature_pad';
let SignaturePad = class SignaturePad {
    constructor(elementRef) {
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new EventEmitter();
        this.onEndEvent = new EventEmitter();
    }
    ngAfterContentInit() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options.canvasHeight) {
            canvas.height = this.options.canvasHeight;
        }
        if (this.options.canvasWidth) {
            canvas.width = this.options.canvasWidth;
        }
        this.signaturePad = new SignaturePadNative.default(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    }
    ngOnDestroy() {
        const canvas = this.elementRef.nativeElement.querySelector('canvas');
        canvas.width = 0;
        canvas.height = 0;
    }
    resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = this.signaturePad.canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
    // Returns signature image as an array of point groups
    toData() {
        if (this.signaturePad) {
            return this.signaturePad.toData();
        }
        else {
            return [];
        }
    }
    // Draws signature image from an array of point groups
    fromData(points) {
        this.signaturePad.fromData(points);
    }
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    toDataURL(imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    }
    // Draws signature image from data URL
    fromDataURL(dataURL, options = {}) {
        // set default height and width on read data from URL
        if (!options.hasOwnProperty('height') &&
            this.options.canvasHeight) {
            options.height = this.options.canvasHeight;
        }
        if (!options.hasOwnProperty('width') && this.options.canvasWidth) {
            options.width = this.options.canvasWidth;
        }
        this.signaturePad.fromDataURL(dataURL, options);
    }
    // Clears the canvas
    clear() {
        this.signaturePad.clear();
    }
    // Returns true if canvas is empty, otherwise returns false
    isEmpty() {
        return this.signaturePad.isEmpty();
    }
    // Unbinds all event handlers
    off() {
        this.signaturePad.off();
    }
    // Rebinds all event handlers
    on() {
        this.signaturePad.on();
    }
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    set(option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad.canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad.canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    }
    // notify subscribers on signature begin
    onBegin() {
        this.onBeginEvent.emit(true);
    }
    // notify subscribers on signature end
    onEnd() {
        this.onEndEvent.emit(true);
    }
    queryPad() {
        return this.signaturePad;
    }
};
__decorate([
    Input()
], SignaturePad.prototype, "options", void 0);
__decorate([
    Output()
], SignaturePad.prototype, "onBeginEvent", void 0);
__decorate([
    Output()
], SignaturePad.prototype, "onEndEvent", void 0);
SignaturePad = __decorate([
    Component({
        template: '<canvas></canvas>',
        selector: 'signature-pad',
    })
], SignaturePad);
export { SignaturePad };
//# sourceMappingURL=angular2-signaturepad.component.js.map