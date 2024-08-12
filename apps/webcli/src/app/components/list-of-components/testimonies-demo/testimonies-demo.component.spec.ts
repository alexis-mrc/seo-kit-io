import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimoniesDemoComponent } from './testimonies-demo.component';

describe('CatchphraseComponent', () => {
  let component: TestimoniesDemoComponent;
  let fixture: ComponentFixture<TestimoniesDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimoniesDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimoniesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
