import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private grades: Array<number> = [
    1,
    2,
    3,
    4,
    5,
  ];

  constructor() { }

  getAll(){
    return this.grades;
  }
}
