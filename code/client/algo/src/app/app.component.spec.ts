import {AppComponent} from './app.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', function () {
  let div: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      declarations: [AppComponent],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    div = fixture.debugElement.query(By.css('div'));
  });

  it('should create component', () => {
    expect(comp).toBeDefined();
  });

  it('should have expected <h1> text', () => {
    fixture.detectChanges();
    expect(div.attributes['class']).toBe('container-fluid');
  });
});
