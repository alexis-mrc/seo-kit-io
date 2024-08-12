import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BigTitleDemoComponent } from './big-title-demo.component';

describe('CatchphraseComponent', () => {
  let component: BigTitleDemoComponent;
  let fixture: ComponentFixture<BigTitleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigTitleDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BigTitleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
