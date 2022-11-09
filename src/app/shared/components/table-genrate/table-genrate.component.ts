import { companyData } from './../../../../dummyData';
import { Helper } from './../../classes/Helper';
import { Validators, FormGroup } from '@angular/forms';
import { FormGenerateComponent } from 'src/app/shared/components/form-generate/form-generate.component';
import { CacheService } from './../../services/cache/cache.service';
import { IModalData } from './../../Interfaces/IModalData';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IIcon } from '../../Interfaces/IIcon';
import { ModalService } from '../../services/modal/modal.service';
import { IFormGenerateInput } from '../../Interfaces/IFormGenerate';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-genrate',
  templateUrl: './table-genrate.component.html',
  styleUrls: ['./table-genrate.component.scss'],
})
export class TableGenrateComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'companyName',
    'email',
    'phoneNumber',
    'createdAt',
    'actions',
  ];
  editIcon: IIcon = {
    type: 'MATICON',
    class: 'mode_edit',
  };
  deleteIcon: IIcon = {
    type: 'MATICON',
    class: 'delete',
  };
  searchIcon: IIcon = {
    type: 'MATICON',
    class: 'search',
  };
  dataSource: MatTableDataSource<any>;
  companyFormData: IFormGenerateInput;
  formGroupRef = new EventEmitter<any>();
  uniqueKey: Map<string, string> = new Map();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private modal: ModalService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    let tableData = this.cacheService.fetchAll() ?? {};
    if (!Object.keys(tableData).length || Object.keys(tableData).length < 10) {
      tableData = { ...tableData, ...Helper.cloneDeep(companyData) };
    }
    this.dataSource = new MatTableDataSource<any>(
      this.prepareTableData(tableData)
    );
  }

  getRepresentableDate(date: string): string {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  }

  prepareTableData(data: any) {
    let tableData = data;
    const tempData: object[] = [];
    Object.keys(tableData).forEach((key) => {
      tempData.push(tableData[key]);
      this.uniqueKey.set(JSON.stringify(tableData[key]), key);
    });
    return tempData;
  }

  edit(data: any) {
    const modalUniqueId = Symbol();
    const companyFormData: IFormGenerateInput = {
      formName: 'New Company',
      displaySubmitButton: true,
      submitButtonName: 'Submit',
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
          value: data.companyName,
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
          value: data.email,
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
          value: data.phoneNumber,
        },
      ],
      submitButtonCallback: (formGroup: FormGroup) => {
        let value = formGroup.getRawValue();
        value = { ...data, ...value };
        this.cacheService.store(
          value,
          this.uniqueKey.get(JSON.stringify(data))
        );
        this.modal.closeModal(modalUniqueId);
      },
      formGroupEvent: this.formGroupRef,
    };
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: FormGenerateComponent,
      formInput: companyFormData,
      modalId: modalUniqueId,
    };
    this.modal.openModal(modalData);
  }

  delete(data: any) {
    const modalUniqueId = Symbol();
    const deleteFormData: IFormGenerateInput = {
      formName: '',
      displaySubmitButton: true,
      submitButtonName: 'Yes',
      displayCancelButton: true,
      cancelButtonName: 'No',
      message: 'Do you really want to delete this row?',
      fields: [],
      submitButtonCallback: (formGroup: FormGroup) => {
        const groupedKey: string = JSON.stringify(data);
        if (groupedKey) {
          this.cacheService.deleteKey(this.uniqueKey.get(groupedKey)!);
          const index = this.dataSource.data.indexOf(data);
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
        this.modal.closeModal(modalUniqueId);
      },
    };
    const modalData: IModalData = {
      modalName: 'Edit',
      componentToLoad: FormGenerateComponent,
      formInput: deleteFormData,
      modalId: modalUniqueId,
      modalHeightVh: 12,
    };
    this.modal.openModal(modalData);
  }

  search(event: any) {
    const filterValue = event.value.toString();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
