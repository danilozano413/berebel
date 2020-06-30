import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductRowComponent } from './product-row.component';

describe('ProductRowComponent', () => {
  let component: ProductRowComponent;
  let fixture: ComponentFixture<ProductRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRowComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
