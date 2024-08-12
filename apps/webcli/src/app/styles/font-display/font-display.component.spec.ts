import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontDisplayComponent } from './font-display.component';

describe('ColorPaletteComponent', () => {
  let component: FontDisplayComponent;
  let fixture: ComponentFixture<FontDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FontDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
