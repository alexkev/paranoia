import { Component, OnInit } from '@angular/core';
import { Paranoia } from './paranoia.model';
import * as $ from 'jquery';
import {ParanoiaService } from './paranoia.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-paranoia',
  templateUrl: './paranoia.component.html',
  styleUrls: ['./paranoia.component.css']
})
export class ParanoiaComponent implements OnInit {
  public paranoiaArray: Paranoia[];
  subscription: Subscription;

  constructor(private paranoiaService: ParanoiaService) { }

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
    // this.paranoiaArray = this.paranoiaService.;
    this.subscription = this.paranoiaService.paranoiaListChangedEvent
      .subscribe(
        (paranoiaArray: Paranoia[]) => {
          this.paranoiaArray = paranoiaArray;
        }
      );
  }
}
