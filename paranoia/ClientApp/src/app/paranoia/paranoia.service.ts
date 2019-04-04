import { Injectable } from '@angular/core';
import { Paranoia } from './paranoia.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ParanoiaService {

  constructor(private http: HttpClient) { }

}
