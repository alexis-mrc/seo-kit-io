import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatchphraseDemoComponent } from './catchphrase-demo.component';

describe('CatchphraseComponent', () => {
  let component: CatchphraseDemoComponent;
  let fixture: ComponentFixture<CatchphraseDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchphraseDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatchphraseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
