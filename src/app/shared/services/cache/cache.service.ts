import { Helper } from './../../classes/Helper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  keyGenerator() {
    return Helper.generateUniqueKey(8);
  }

  store(value: any, uniqueKey?: string) {
    const key = uniqueKey ?? this.keyGenerator();
    localStorage.setItem(key, JSON.stringify(value));
    return key;
  }

  fetch(key: string): any {
    const cachedObj = localStorage.getItem(key);
    if (cachedObj) {
      return JSON.parse(cachedObj);
    }
    return null;
  }

  fetchAll(): any {
    const keys = Object.keys(localStorage);
    if (!keys) {
      return;
    }
    const storage = localStorage;
    const data: any = {};
    keys.forEach((key: string) => {
      data[key] = JSON.parse(storage[key]);
    });
    return data;
  }

  deleteKey(key: string): void {
    localStorage.removeItem(key);
  }
}
