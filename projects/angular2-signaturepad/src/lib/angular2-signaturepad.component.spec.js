import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { SignaturePad } from './angular2-signaturepad.component';
describe('Angular2SignaturepadComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [SignaturePad],
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SignaturePad);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=angular2-signaturepad.component.spec.js.map