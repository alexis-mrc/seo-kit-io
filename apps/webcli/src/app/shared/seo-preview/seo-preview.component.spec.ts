import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeoPreviewComponent } from './seo-preview.component';

describe('SeoPreviewComponent', () => {
  let component: SeoPreviewComponent;
  let fixture: ComponentFixture<SeoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeoPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
