import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed, async, inject} from '@angular/core/testing';
import {FocusDirective} from './focus.directive';
import {ElementRef} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('FocusDirective', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: ElementRef, useValue: new MockElementRef()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create an instance', inject([ElementRef], (element: ElementRef) => {
    const directive = new FocusDirective(element);
    expect(directive).toBeTruthy();
  }));
});
