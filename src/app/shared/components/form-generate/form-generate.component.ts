import { ModalService } from './../../services/modal/modal.service';
import { Helper } from './../../classes/Helper';
import { IFormField } from './../../Interfaces/IFormField';
import { IFormGenerateInput } from './../../Interfaces/IFormGenerate';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-generate',
  templateUrl: './form-generate.component.html',
  styleUrls: ['./form-generate.component.scss'],
})
export class FormGenerateComponent implements OnInit {
  @Input() formGenerateInput!: IFormGenerateInput;
  formGroup: FormGroup;
  @Output() formGroupRef: EventEmitter<any> = new EventEmitter<any>();

  constructor(public modalService: ModalService) {
    if (modalService.modalData && modalService.modalData.formInput) {
      this.formGenerateInput = modalService.modalData.formInput;
      this.formGroupRef =
        modalService.modalData.formInput.formGroupEvent ?? this.formGroupRef;
    }
  }

  ngOnInit(): void {
    if (
      (this.modalService.modalData && !this.modalService.modalData.formInput) ||
      !this.formGenerateInput
    ) {
      return;
    }

    // Setting up the form group
    this.setUpFormGroup();
  }

  setUpFormGroup() {
    const formGroupValue: any = {};

    this.formGenerateInput.fields.forEach((data: IFormField) => {
      formGroupValue[data.name] = new FormControl(
        data.value ?? '',
        data.validations && data.validations.length
          ? [...this.getValidation(data.validations)]
          : []
      );
    });
    this.formGroup = new FormGroup(formGroupValue);
  }

  getValidation(
    validationData: { validator: Validators; message: string }[]
  ): any[] {
    const validators: Validators[] = [];
    validationData.forEach((data) => {
      validators.push(data.validator);
    });
    return validators;
  }

  validateField(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(
      errorName.toLowerCase()
    );
  }

  onSubmit() {
    Helper.markAllFieldAsTouched(this.formGroup);
    if (this.formGroup.invalid) {
      return;
    }
    if (this.formGenerateInput.submitButtonCallback) {
      this.formGenerateInput.submitButtonCallback(this.formGroup);
    }
  }

  cancelButton() {
    if (this.formGenerateInput.cancelButtonCallback) {
      this.formGenerateInput.cancelButtonCallback();
    }
  }

  ngAfterViewInit(): void {
    this.formGroupRef.emit(this.formGroup);
    this.formGroup.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.formGroupRef.emit(this.formGroup);
    });
  }
}
