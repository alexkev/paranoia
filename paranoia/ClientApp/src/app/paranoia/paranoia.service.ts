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
    this.http.get<Paranoia[]>(this.myAppUrl + 'api/paranoias')
      .subscribe(result => {
        this.paranoiaArray = result;
        this.paranoiaListChangedEvent.next(this.paranoiaArray.slice())
        console.log(result);
    }, error => console.error(error));
  }

  getParanoia(id: string): Paranoia {
    for (const paranoia of this.paranoiaArray) {
      if (paranoia.id === id) {
        return paranoia;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const paranoia of this.paranoiaArray) {
      const currentId = parseInt(paranoia.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addParanoia(newParanoia: Paranoia) {
    if (!newParanoia) {
      return;
    }
    newParanoia.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     const strParanoia = JSON.stringify(newParanoia);

    this.http.post<{message: string, paranoia: Paranoia[] }>(this.myAppUrl + 'api/paranoias',
      strParanoia,
      { headers: headers })

      .subscribe(
        (res) => {
          this.paranoiaArray = res.paranoia;
          this.paranoiaListChangedEvent.next(this.paranoiaArray.slice());
        });
  }

  updateParanoia(originalParanoia: Paranoia, newParanoia: Paranoia) {
    if (!originalParanoia || !newParanoia) {
      return;
    }

    const pos = this.paranoiaArray.indexOf(originalParanoia);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strParanoia = JSON.stringify(newParanoia);

    this.http.patch<{ message: string, paranoias: Paranoia[] }>(this.myAppUrl + 'api/paranoias' + originalParanoia.id
      , strParanoia
      , { headers: headers })
      // .map(
      //   (res: Response) => {
      //     return res.json().obj;
      //   })
      .subscribe(
        (responseData) => {
          this.paranoiaArray = responseData.paranoias;
          this.paranoiaListChangedEvent.next(this.paranoiaArray.slice());
        });
  }

  // errorHandler(error: Response) {
  //   console.log(error);
  //   return Observable.throw(error);
  // }  

}
