import { Component, OnInit } from '@angular/core';
import { Paranoia } from './paranoia.model';
import * as $ from 'jquery';
import { ParanoiaService } from './paranoia.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paranoia',
  templateUrl: './paranoia.component.html',
  styleUrls: ['./paranoia.component.css']
})
export class ParanoiaComponent implements OnInit {
  // GET : these gets all of the data
  public paranoiaArray: Paranoia[];
  subscription: Subscription;

  // View : this is the item of the array past through the ngFor Loop
  paranoia: Paranoia;
  
  // POST : 
  originalParanoia: Paranoia;
  editMode = false;

  constructor(private paranoiaService: ParanoiaService,
    private router: Router) { }

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
    this.paranoiaService.getParanoias();
    this.arraySubscript();

    this.newest();
  }

  arraySubscript() {
    this.subscription = this.paranoiaService.paranoiaListChangedEvent
      .subscribe(
        (paranoiaArray: Paranoia[]) => {
          this.paranoiaArray = paranoiaArray;
          // console.log(this.paranoiaArray);
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newParanoia = new Paranoia(value.id, value.question, value.like);
    if (this.editMode === true) {
      this.paranoiaService.updateParanoia(this.originalParanoia, newParanoia);
    } else {
      this.paranoiaService.addParanoia(newParanoia);
    }
    this.paranoiaService.getParanoias();
    this.arraySubscript();
    this.newest();
    // this.router.navigate(['/paranoia']);
    form.reset();
  }

  mostPop() {
    this.paranoiaArray.sort((a, b) => (a.like > b.like) ? -1 : 1);
  }

  random() {
    this.paranoiaArray.sort((a, b) => {return 0.5 - Math.random()});
  }

  newest(){
    this.paranoiaArray.sort((a, b) => (a.id > b.id) ? -1 : 1);
  }
  oldest(){
    this.paranoiaArray.sort((a, b) => (a.id < b.id) ? -1 : 1);;
  }
}
