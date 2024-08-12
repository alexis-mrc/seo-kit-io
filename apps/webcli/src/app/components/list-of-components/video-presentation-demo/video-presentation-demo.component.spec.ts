import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoPresentationDemoComponent } from './video-presentation-demo.component';

describe('CatchphraseComponent', () => {
  let component: VideoPresentationDemoComponent;
  let fixture: ComponentFixture<VideoPresentationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPresentationDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPresentationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
