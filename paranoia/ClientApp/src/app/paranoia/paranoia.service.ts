import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 

import { Paranoia } from './paranoia.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ParanoiaService {
  public paranoiaArray: Paranoia[];
  paranoiaListChangedEvent = new Subject<Paranoia[]>();

  myAppUrl: string = "";  

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getParanoias() {
    this.http.get<Paranoia[]>(this.myAppUrl + 'api/paranoia')
      .subscribe(result => {
        this.paranoiaArray = result;
        this.paranoiaListChangedEvent.next(this.paranoiaArray.slice())
        console.log(result);
    }, error => console.error(error));
  }

  // errorHandler(error: Response) {
  //   console.log(error);
  //   return Observable.throw(error);
  // }  

}
