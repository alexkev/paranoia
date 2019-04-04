import { Injectable } from '@angular/core';

@Injectable()
export class Paranoia {
  public id: number;
  public question: string;
  public like: number;
  constructor(id: number,  question: string, like: number) {
    this.id = id;
    this.question = question;
    this.like = like;
  }
}
