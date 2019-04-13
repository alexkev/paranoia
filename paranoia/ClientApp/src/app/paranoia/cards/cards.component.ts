import { Component, OnInit, Input } from '@angular/core';
import { ParanoiaService } from '../paranoia.service';
import { Paranoia } from '../paranoia.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() paranoia: Paranoia;
  checked: boolean = false;
  selectedParanoia: Paranoia;


  constructor(private paranoiaService: ParanoiaService) {}

  ngOnInit() {
    this.paranoiaService.paranoiaSelectedEvent
    .subscribe(
      (paranoia: Paranoia) => {
        this.selectedParanoia = paranoia;
      }
    );
  }

  like(id: any) {
    console.log('clicked' + ' ' + id)
    if (this.checked === false) {
      $('#' + id).attr('src', '../../../assets/thumb-blue.svg');
      this.checked = true;
      this.paranoiaService.updateLike(id, 1);
    } else {
      $('#' + id).attr('src', '../../../assets/Vector.svg');
      this.checked = false;
      this.paranoiaService.updateLike(id, -1);
    }
  }

  onDelete() {
    this.paranoiaService.deleteParanoia(this.paranoia);
    this.paranoiaService.getParanoias();
  }
}
