import { Validators } from '@angular/forms';
export interface IFormField {
  name: string;
  validations?: { validator: Validators; message: string; id: string }[];
  type: 'input' | 'date' | 'dropdown' | 'text_dropdown';
  label: string;
  placeholder: string;
  required?: boolean;
  value?: any;
  minDate?: Date;
  maxDate?: Date;
  listData?: string[];
}
