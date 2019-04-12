import { Injectable, Inject, EventEmitter } from '@angular/core';

import { Paranoia } from './paranoia.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

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
        console.log(result);
        this.paranoiaArray = result;
        this.paranoiaListChangedEvent.next(this.paranoiaArray.slice())
        console.log(this.paranoiaListChangedEvent);
        // this.paranoiaListChangedEvent.next(result)
        console.log(result);
    }, error => console.error(error));
  }

  getParanoia(id: number) {
    return this.http.get<Paranoia>(this.myAppUrl + 'api/paranoias/' + id);
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
          console.log(res)
          this.paranoiaArray = res.paranoia;
          console.log(this.paranoiaArray)
          console.log(res.paranoia)
          this.paranoiaListChangedEvent.next(this.paranoiaArray.slice());
          // this.paranoiaListChangedEvent.next(res.paranoia);
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
