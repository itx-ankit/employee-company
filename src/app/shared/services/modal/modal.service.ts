import { IModalData } from './../../Interfaces/IModalData';
import { Injectable, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalData: IModalData;
  private modalRef: Map<any, MatDialogRef<Component>> = new Map();

  constructor(private dialog: MatDialog) {}

  openModal(modalData: IModalData) {
    if (!modalData) {
      return;
    }

    if (!modalData.modalId) {
      modalData.modalId = Symbol();
    }

    this.modalData = modalData;
    const modalConf = {
      data: {
        modalData: modalData,
      },
    };

    this.modalRef.set(
      modalData.modalId,
      this.dialog.open(modalData.componentToLoad, modalConf)
    );

    return modalData.modalId;
  }

  closeModal(modalId: Symbol) {
    this.modalRef.get(modalId)!.close();
  }
}
