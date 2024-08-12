import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YankeesStyleComponent } from './yankees-style.component';

describe('DefaultStyleComponent', () => {
  let component: YankeesStyleComponent;
  let fixture: ComponentFixture<YankeesStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YankeesStyleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YankeesStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
