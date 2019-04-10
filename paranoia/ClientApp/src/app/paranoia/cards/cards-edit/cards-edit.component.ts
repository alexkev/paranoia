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
  originalParanoia: Paranoia;
  @Input() paranoia: Paranoia;
  editMode = false;
  id: number;


  constructor(private paranoiaService: ParanoiaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id === null || this.id === undefined) {
            this.editMode = false;
            return;
          }
          this.originalParanoia = this.paranoiaService.getParanoia(this.id);
          if (this.originalParanoia === undefined || this.originalParanoia === null) {
            this.editMode = false;
            return;
          }
          this.editMode = true;
        });
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
    form.reset();
  }


  onCancel() {
    this.router.navigate(['/paranoia']);
  }

}
