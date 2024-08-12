import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PricesDemoComponent } from './prices-demo.component';

describe('CatchphraseComponent', () => {
  let component: PricesDemoComponent;
  let fixture: ComponentFixture<PricesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricesDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PricesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
