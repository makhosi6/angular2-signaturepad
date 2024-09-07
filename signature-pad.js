'use strict';
const core_1 = require('@angular/core');

const SignaturePad = (function () {
  function SignaturePad(elementId) {
    // no op
    this.elementId = elementId;
    this.options = this.options || {};
    this.onBeginEvent = new core_1.EventEmitter();
    this.onEndEvent = new core_1.EventEmitter();
    console.log({elementId});

  }
  SignaturePad.prototype.ngAfterContentInit = function () {
    const sp = require('signature_pad')['default'];
    console.log({ ID: this.elementId })
    const canvas = document.querySelector(`[id*="${this.elementId}"] canvas`) || document.querySelector('canvas');
    console.log({canvas});

    if (this.options['canvasHeight']) {
      canvas.height = this.options['canvasHeight'];
    }
    if (this.options['canvasWidth']) {
      canvas.width = this.options['canvasWidth'];
    }
    this.signaturePad = new sp(canvas, this.options);
    this.signaturePad.onBegin = this.onBegin.bind(this);
    this.signaturePad.onEnd = this.onEnd.bind(this);
  };
  SignaturePad.prototype.resizeCanvas = function () {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const canvas = this.signaturePad._canvas;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
    this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
  };
  // Returns signature image as an array of point groups
  SignaturePad.prototype.toData = function () {
    return this.signaturePad.toData();
  };
  // Draws signature image from an array of point groups
  SignaturePad.prototype.fromData = function (points) {
    this.signaturePad.fromData(points);
  };
  // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
  SignaturePad.prototype.toDataURL = function (imageType, quality) {
    return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
  };
  // Draws signature image from data URL
  SignaturePad.prototype.fromDataURL = function (dataURL, options) {
    if (options === void 0) { options = {}; }
    // set default height and width on read data from URL
    if (!options.hasOwnProperty('height') && this.options['canvasHeight']) {
      options['height'] = this.options['canvasHeight'];
    }
    if (!options.hasOwnProperty('width') && this.options['canvasWidth']) {
      options['width'] = this.options['canvasWidth'];
    }
    this.signaturePad.fromDataURL(dataURL, options);
  };
  // Clears the canvas
  SignaturePad.prototype.clear = function () {
    this.signaturePad.clear();
  };
  // Returns true if canvas is empty, otherwise returns false
  SignaturePad.prototype.isEmpty = function () {
    return this.signaturePad.isEmpty();
  };
  // Unbinds all event handlers
  SignaturePad.prototype.off = function () {
    this.signaturePad.off();
  };
  // Rebinds all event handlers
  SignaturePad.prototype.on = function () {
    this.signaturePad.on();
  };
  // set an option on the signaturePad - e.g. set('minWidth', 50);
  SignaturePad.prototype.set = function (option, value) {
    switch (option) {
      case 'canvasHeight':
        this.signaturePad._canvas.height = value;
        break;
      case 'canvasWidth':
        this.signaturePad._canvas.width = value;
        break;
      default:
        this.signaturePad[option] = value;
    }
  };
  // notify subscribers on signature begin
  SignaturePad.prototype.onBegin = function () {
    this.onBeginEvent.emit(true);
  };
  // notify subscribers on signature end
  SignaturePad.prototype.onEnd = function () {
    this.onEndEvent.emit(true);
  };
  SignaturePad.prototype.queryPad = function () {
    return this.signaturePad;
  };
  SignaturePad.decorators = [
    {
      type: core_1.Component, args: [{
        template: '<canvas></canvas>',
        selector: 'signature-pad',
      },]
    },
  ];
  /** @nocollapse */
  SignaturePad.ctorParameters = [
    { type: String  },
  ];
  SignaturePad.propDecorators = {
    'options': [{ type: core_1.Input },],
    'onBeginEvent': [{ type: core_1.Output },],
    'onEndEvent': [{ type: core_1.Output },],
  };
  return SignaturePad;
}());
exports.SignaturePad = SignaturePad;
