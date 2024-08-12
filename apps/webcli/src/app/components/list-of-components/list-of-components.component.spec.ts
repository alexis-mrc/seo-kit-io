import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfComponentsComponent } from './list-of-components.component';

describe('ListOfComponentsComponent', () => {
  let component: ListOfComponentsComponent;
  let fixture: ComponentFixture<ListOfComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
