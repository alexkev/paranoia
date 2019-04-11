import { Injectable, Inject, EventEmitter } from '@angular/core';

// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { Router } from '@angular/router';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw'; 

import { Paranoia } from './paranoia.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class ParanoiaService {
  public paranoiaArray: Paranoia[];
  public paranoia: Paranoia;
  paranoiaSelectedEvent = new EventEmitter<Paranoia>();

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
        console.log(this.paranoiaListChangedEvent);
        // this.paranoiaListChangedEvent.next(result)
    }, error => console.error(error));
  }

  getParanoia(id: number) {
    return this.http.get<Paranoia>(this.myAppUrl + 'api/paranoias/' + id);
    // for (const paranoia of this.paranoiaArray) {
    //   if (paranoia.id === id) {
    //     return paranoia;
    //   }
    // }
    // return null;
  }

  getParanoiaArray(id: number) {
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
      const currentId = paranoia.id;
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

    this.http.post<{message: string, paranoia: Paranoia[] }>(this.myAppUrl + 'api/paranoias',
      newParanoia)

      .subscribe(
        (res) => {
       //   this.paranoiaArray = res.paranoia;
         // this.paranoiaListChangedEvent.next(this.paranoiaArray.slice());
        });
  }

  updateParanoia(originalParanoia: Paranoia, newParanoia: Paranoia) {
    this.http.put<{ message: string, paranoias: Paranoia[] }>(this.myAppUrl + 'api/paranoias/' + originalParanoia.id
      , newParanoia)
    
      .subscribe(
        (responseData) => {
         // this.paranoiaArray = responseData.paranoias;
        //  this.paranoiaListChangedEvent.next(this.paranoiaArray.slice());
        });
  }

  updateLike(id: number, likes: number) {
    let paranoiaItem = this.getParanoiaArray(id);

    paranoiaItem.like += likes;

    this.updateParanoia(this.getParanoiaArray(id), paranoiaItem);
  }

  deleteParanoia(paranoia: Paranoia) {
    if (paranoia === null || paranoia === undefined) {
      return;
    }

    this.http.delete<{ message: string, paranoias: Paranoia[] }>((this.myAppUrl + 'api/paranoias/' + paranoia.id))
      .subscribe(
        (responseData) => {
        //  this.paranoiaArray = responseData.paranoias;
        //  this.paranoiaListChangedEvent.next(this.paranoiaArray);
      });
  }
}
