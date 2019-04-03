import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-paranoia',
  templateUrl: './paranoia.component.html',
  styleUrls: ['./paranoia.component.css']
})
export class ParanoiaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Coin flip
      $('#coin').on('click', function () {
        var flipResult = Math.random();
        $('#coin').removeClass();
        setTimeout(function () {
          if (flipResult <= 0.5) {
            $('#coin').addClass('heads');
            console.log('it is head');
          }
          else {
            $('#coin').addClass('tails');
            console.log('it is tails');
          }
        }, 100);
      });
  }
}
