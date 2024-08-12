import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassicTextImageDemoComponent } from './classic-text-image-demo.component';

describe('CatchphraseComponent', () => {
  let component: ClassicTextImageDemoComponent;
  let fixture: ComponentFixture<ClassicTextImageDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassicTextImageDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassicTextImageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
