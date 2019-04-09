import { Component, OnInit } from '@angular/core';
import { Paranoia } from './paranoia.model';
import * as $ from 'jquery';
import { ParanoiaService } from './paranoia.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-paranoia',
  templateUrl: './paranoia.component.html',
  styleUrls: ['./paranoia.component.css']
})
export class ParanoiaComponent implements OnInit {
  public paranoiaArray: Paranoia[];
  originalParanoia: Paranoia;
  subscription: Subscription;
  editMode = false;
  checked: boolean = false;

   

  constructor(private paranoiaService: ParanoiaService,
    private router: Router,
    private route: ActivatedRoute) { }

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
          console.log(this.paranoiaArray);
        }
      );
      this.paranoiaService.getParanoias();


  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newParanoia = new Paranoia(value.id, value.question, value.like);
    if (this.editMode === true) {
      this.paranoiaService.updateParanoia(this.originalParanoia, newParanoia);
    } else {
      this.paranoiaService.addParanoia(newParanoia);
    }
    this.router.navigate(['/paranoia']);
  }

  mostPop() {
    this.paranoiaArray.sort((a, b) => (a.like > b.like) ? -1 : 1)
  }

  random() {
    this.paranoiaArray.sort((a, b) => {return 0.5 - Math.random()});
  }

  like(id: any) {
    console.log('clicked' + ' ' + id)
    if (!this.checked) {
      $('#' + id).attr('src', '../../assets/thumb-blue.svg');
      this.checked = true;
    } else {
      $('#' + id).attr('src', '../../assets/Vector.svg');
      this.checked = false;
    }
  }
}
