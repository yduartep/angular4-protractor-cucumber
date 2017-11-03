import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {FocusDirective} from './directives/focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FooterComponent,
    FocusDirective
  ],
  exports: [
    FooterComponent,
    FocusDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule {
}
