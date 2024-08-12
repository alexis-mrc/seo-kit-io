import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagePresentationDemoComponent } from './image-presentation-demo.component';

describe('CatchphraseComponent', () => {
  let component: ImagePresentationDemoComponent;
  let fixture: ComponentFixture<ImagePresentationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePresentationDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePresentationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
