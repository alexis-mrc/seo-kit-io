import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallToActionDemoComponent } from './call-to-action-demo.component';

describe('CatchphraseComponent', () => {
  let component: CallToActionDemoComponent;
  let fixture: ComponentFixture<CallToActionDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CallToActionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
