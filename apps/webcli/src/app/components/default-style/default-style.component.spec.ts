import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultStyleComponent } from './default-style.component';

describe('DefaultStyleComponent', () => {
  let component: DefaultStyleComponent;
  let fixture: ComponentFixture<DefaultStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultStyleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
