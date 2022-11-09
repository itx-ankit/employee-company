import { IFormGenerateInput } from './IFormGenerate';
import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';

export interface IModalData {
  modalName: string;
  componentToLoad: ComponentType<any>;
  formInput?: IFormGenerateInput;
  modalId?: Symbol;
  modalHeightVh?: number;
  modalWidthVw?: number;
}
