import { Component, OnInit, Input } from '@angular/core';
import { ParanoiaService } from '../../paranoia.service';
import { Paranoia } from '../../paranoia.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cards-edit',
  templateUrl: './cards-edit.component.html',
  styleUrls: ['./cards-edit.component.css']
})
export class CardsEditComponent implements OnInit {
  paranoiaArray: Paranoia[];
  // originalParanoia: Paranoia;
  @Input() paranoia: Paranoia;
  id: number;

  constructor(private paranoiaService: ParanoiaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
 
          this.paranoiaService.getParanoia(this.id)
            .subscribe(
              (paranoia: Paranoia) => {
                this.paranoia = paranoia;
                console.log(this.paranoia);
              }
            )
        });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newParanoia = new Paranoia(value.id, value.question, value.like);
    this.paranoiaService.updateParanoia(this.paranoia, newParanoia);
    this.router.navigate(['/paranoia']);
    this.paranoiaService.getParanoias();
  }


  onCancel() {
    this.router.navigate(['/paranoia']);
  }

}
