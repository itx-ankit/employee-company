import { IIcon } from './../../Interfaces/IIcon';
import { Helper } from './../../classes/Helper';
import { Validators, FormGroup } from '@angular/forms';
import { IFormGenerateInput } from './../../Interfaces/IFormGenerate';
import { Component, OnInit } from '@angular/core';
import { allSkillSet } from 'src/dummyData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss'],
})
export class NewCompanyComponent implements OnInit {
  companyFormData: IFormGenerateInput;
  companyFormGroupRef: FormGroup;
  employeeFormData: IFormGenerateInput;
  employeeFormGroupRef: FormGroup;
  educationFormData: IFormGenerateInput[];
  educationFormGroupRef: FormGroup[] = [];
  cacheKey: string;

  minimumRatingValue: number = 1;
  maximumRatingValue: number = 5;
  defaultRatingValue: number = 1;
  skillSets: { skillName: string; skillRating: number }[] = [...allSkillSet];

  addIcon: IIcon = {
    type: 'FONTAWESOME',
    class: 'fas fa-plus',
  };
  trashIcon: IIcon = {
    type: 'FONTAWESOME',
    class: 'fa fa-trash',
  };

  selectedSkills: string[];
  constructor(private _snackBar: MatSnackBar, private cache: CacheService) {}

  ngOnInit(): void {
    this.setUpFormInputData();
  }

  setUpFormInputData() {
    // Setting up company level form data
    this.companyFormData = {
      formName: 'New Company',
      displaySubmitButton: false,
      fields: [
        {
          name: 'companyName',
          label: 'Company Name',
          type: 'input',
          placeholder: 'Company Name',
          validations: [
            {
              validator: Validators.required,
              message: 'Company Name is required',
              id: 'required',
            },
            {
              validator: Validators.maxLength(50),
              message: 'Maximum characters can be 50',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'address',
          label: 'Company Address',
          type: 'input',
          placeholder: 'Company Address',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'input',
          placeholder: 'Email',
          validations: [
            {
              validator: Validators.required,
              message: 'Email is required',
              id: 'required',
            },
            {
              validator: Validators.pattern(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              ),
              message: 'Email is invalid',
              id: 'pattern',
            },
            {
              validator: Validators.maxLength(100),
              message: 'Maximum characters can be 100',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'input',
          placeholder: 'Phone Number',
          validations: [
            {
              validator: Validators.required,
              message: 'Phone Number is required',
              id: 'required',
            },
            {
              validator: Validators.pattern(/^\d+$/),
              message: 'Phone Number is invalid',
              id: 'pattern',
            },
            {
              validator: Validators.maxLength(15),
              message: 'Maximum phone number digits can be 15',
              id: 'maxLength',
            },
          ],
        },
      ],
    };

    // Setting up employee level form data
    this.employeeFormData = {
      formName: 'Employee Name',
      displaySubmitButton: false,
      fields: [
        {
          name: 'empName',
          label: 'Employee Name',
          type: 'input',
          placeholder: 'Employee Name',
          validations: [
            {
              validator: Validators.required,
              message: 'Employee Name is required',
              id: 'required',
            },
            {
              validator: Validators.maxLength(25),
              message: 'Maximum characters can be 50',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'designation',
          label: 'Designation',
          type: 'dropdown',
          placeholder: 'Designation',
          listData: ['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM'],
        },
        {
          name: 'joinDate',
          label: 'Join Date',
          type: 'date',
          placeholder: 'Join Date',
          maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
          validations: [
            {
              validator: Validators.required,
              message: 'Join Date is required',
              id: 'required',
            },
          ],
        },
        {
          name: 'email',
          label: 'Email',
          type: 'input',
          placeholder: 'Email',
          validations: [
            {
              validator: Validators.required,
              message: 'Email is required',
              id: 'required',
            },
            {
              validator: Validators.pattern(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              ),
              message: 'Email is invalid',
              id: 'pattern',
            },
            {
              validator: Validators.maxLength(100),
              message: 'Maximum characters can be 100',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'input',
          placeholder: 'Phone Number',
          validations: [
            {
              validator: Validators.required,
              message: 'Phone Number is required',
              id: 'required',
            },
            {
              validator: Validators.pattern(/^\d+$/),
              message: 'Phone Number is invalid',
              id: 'pattern',
            },
            {
              validator: Validators.maxLength(15),
              message: 'Maximum phone numbers digits can be 15',
              id: 'maxLength',
            },
          ],
        },
      ],
    };

    this.educationFormData = [Helper.cloneDeep(this.getEducationFormData)];
  }

  get getEducationFormData(): IFormGenerateInput {
    return {
      displaySubmitButton: false,
      fields: [
        {
          name: 'instituteName',
          label: 'School Name or College Name',
          type: 'input',
          placeholder: 'Enter School Name or College Name',
          validations: [
            {
              validator: Validators.required,
              message: 'School or College Name is required',
              id: 'required',
            },
            {
              validator: Validators.maxLength(50),
              message: 'Maximum characters can be 50',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'courseName',
          label: 'Course Name',
          type: 'input',
          placeholder: 'Enter Course Name',
          validations: [
            {
              validator: Validators.required,
              message: 'Course Name is required',
              id: 'required',
            },
            {
              validator: Validators.maxLength(25),
              message: 'Maximum characters can be 25',
              id: 'maxLength',
            },
          ],
        },
        {
          name: 'completedYear',
          label: 'Completed Year',
          type: 'date',
          placeholder: 'Completed Year',
          validations: [
            {
              validator: Validators.required,
              message: 'Completion Date is required',
              id: 'required',
            },
          ],
        },
      ],
    };
  }

  ratingChanged(ratedValue: string, index: number) {
    if (
      this.skillSets[index].skillRating > 5 ||
      this.skillSets[index].skillRating < 1
    ) {
      this.skillSets[index].skillRating = this.defaultRatingValue;
    } else {
      this.skillSets[index].skillRating = Number(ratedValue);
    }
  }

  isFormInvalid(): boolean {
    Helper.markAllFieldAsTouched(this.companyFormGroupRef);
    Helper.markAllFieldAsTouched(this.employeeFormGroupRef);

    for (let formGroup of this.educationFormGroupRef) {
      Helper.markAllFieldAsTouched(formGroup);
      if (formGroup.invalid) {
        return true;
      }
    }

    if (this.companyFormGroupRef.invalid) {
      return true;
    }
    if (this.employeeFormGroupRef.invalid) {
      return true;
    }

    return false;
  }

  submit(all?: boolean) {
    if (this.isFormInvalid()) {
      Helper.showSnackBar(this._snackBar, 'Error in saving the form', true);
      return;
    }
    let data = this.prepareData();

    // Conditon when data is already saved for the company
    if (this.cacheKey) {
      const storedData = this.cache.fetch(this.cacheKey);
      if (storedData && storedData['empInfo']) {
        storedData['empInfo'].push(...data['empInfo']);
        data = storedData;
      }
    }

    this.cacheKey = this.cache.store(
      data,
      this.cacheKey ? this.cacheKey : undefined
    );

    if (this.cacheKey && !all) {
      this.companyFormGroupRef.disable();
    } else if (all) {
      this.companyFormGroupRef.enable();
    }

    Helper.showSnackBar(
      this._snackBar,
      'Company details saved successfully',
      false
    );

    this.reset(all ? 'all' : 'employee');
  }

  prepareData() {
    const data = this.companyFormGroupRef.getRawValue();

    // Saving the creation Date
    if (!this.cacheKey) {
      data['createdAt'] = new Date();
    }
    data['empInfo'] = [this.employeeFormGroupRef.getRawValue()];

    const skillsToBeSaved: { skillName: string; skillRating: number }[] = [];

    this.skillSets.map((data: { skillName: string; skillRating: number }) => {
      if (this.selectedSkills.includes(data.skillName)) {
        skillsToBeSaved.push(data);
      }
    });

    // Saving skills info
    data['empInfo'][0]['skillInfo'] = skillsToBeSaved;

    const eductionInfo = [];
    for (let formGroup of this.educationFormGroupRef) {
      eductionInfo.push(formGroup.getRawValue());
    }
    // Saving education info
    data['empInfo'][0]['eductionInfo'] = eductionInfo;
    return data;
  }

  reset(type: 'all' | 'employee') {
    if (type === 'all') {
      this.cacheKey = '';
      this.companyFormGroupRef.reset();
    }
    this.employeeFormGroupRef.reset();
    this.selectedSkills = [];
    for (let skillset of this.skillSets) {
      skillset.skillRating = this.defaultRatingValue;
    }
    this.educationFormData = [Helper.cloneDeep(this.getEducationFormData)];
    this.educationFormGroupRef.splice(0);
  }

  addFields(index: number) {
    Helper.markAllFieldAsTouched(this.educationFormGroupRef[index]);
    if (this.educationFormGroupRef[index].invalid) {
      return;
    }
    const data: IFormGenerateInput = Helper.cloneDeep(
      this.getEducationFormData
    );
    this.educationFormData.push(data);
  }

  deleteFields(index: number) {
    this.educationFormData.splice(index, 1);
    this.educationFormGroupRef.splice(index, 1);
  }
}
