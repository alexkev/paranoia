import { Component, OnInit } from '@angular/core';
import { Paranoia } from './paranoia.model';
import * as $ from 'jquery';

import { Paranoia } from './paranoia.model';
import {ParanoiaService } from './paranoia.service';


@Component({
  selector: 'app-paranoia',
  templateUrl: './paranoia.component.html',
  styleUrls: ['./paranoia.component.css']
})
export class ParanoiaComponent implements OnInit {
  public paranoiaArray: Paranoia[] = [
    {
      id: 1,
      question: 'HELLO WORLD -  Server not working',
      like: 500
    },
    {
      id: 2,
      question: 'HELLO WORLD -  Server not working',
      like: 500
    }
  ];

  constructor() { }

  ngOnInit() {
    // Coin flip
      $('#coin').on('click', function () {
        const flipResult = Math.random();
        $('#coin').removeClass();
        setTimeout(function () {
          if (flipResult <= 0.5) {
            $('#coin').addClass('heads');
            console.log('it is heads');
          } else {
            $('#coin').addClass('tails');
            console.log('it is tails');
          }
        }, 100);
      });

    // GET Array of Paranoia
  }
}
