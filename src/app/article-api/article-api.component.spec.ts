import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleApiComponent } from './article-api.component';

describe('ArticleApiComponent', () => {
  let component: ArticleApiComponent;
  let fixture: ComponentFixture<ArticleApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
