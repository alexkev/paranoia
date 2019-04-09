import { Injectable } from '@angular/core';


@Injectable()
export class Paranoia {
  public id: string;
  public question: string;
  public like: number;
  constructor(id: string,  question: string, like: number) {
    this.id = id;
    this.question = question;
    this.like = like;
  }
}
