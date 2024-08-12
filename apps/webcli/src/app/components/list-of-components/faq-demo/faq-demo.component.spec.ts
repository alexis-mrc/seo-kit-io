import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqDemoComponent } from './faq-demo.component';

describe('CatchphraseComponent', () => {
  let component: FaqDemoComponent;
  let fixture: ComponentFixture<FaqDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
