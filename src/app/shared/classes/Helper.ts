import { FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export class Helper {
  /**
   *
   * @param formGroup For which all the controls will be marked as touched
   */
  static markAllFieldAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((name) => {
      formGroup.get(name)!.markAllAsTouched();
    });
  }

  static cloneDeep(obj: object | any) {
    try {
      return Object.assign({}, obj);
    } catch {
      return obj;
    }
  }

  static showSnackBar(
    snackBar: MatSnackBar,
    message: string,
    isError?: boolean,
    config?: MatSnackBarConfig
  ) {
    snackBar.open(
      `${message}`,
      ``,
      config
        ? config
        : {
            duration: 2000,
            panelClass: isError ? 'warning' : '',
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
    );
  }

  static generateUniqueKey(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
