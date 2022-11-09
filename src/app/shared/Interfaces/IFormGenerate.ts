import { EventEmitter } from '@angular/core';
import { IFormField } from './IFormField';

export interface IFormGenerateInput {
  formName?: string;
  message?: string;
  extraClass?: string;
  fields: IFormField[];
  displaySubmitButton?: boolean;
  displayCancelButton?: boolean;
  submitButtonCallback?: Function;
  cancelButtonCallback?: Function;
  formGroupEvent?: EventEmitter<any>;
  submitButtonName?: string;
  cancelButtonName?: string;
}
