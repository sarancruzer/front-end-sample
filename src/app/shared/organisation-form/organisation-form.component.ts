import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Organisation } from '../../models';

@Component({
  selector: 'nb-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css']
})
export class OrganisationFormComponent implements OnInit {

  @Input() organisation: Organisation;

  @Input() submitName: string;

  @Output() done: EventEmitter<Organisation> = new EventEmitter();

  organisationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.organisationForm = this.formBuilder.group({
      'name': [this.organisation.name, [
          Validators.required
        ]
      ],
      'website': [this.organisation.website, [
          Validators.required
        ]
      ],
      'phone': [this.organisation.phone, Validators.compose([
          Validators.required, Validators.pattern('^[0-9]+$')
        ])
      ],
      'address': [this.organisation.address, [
          Validators.required
        ]
      ],
      'state': [this.organisation.state, [
          Validators.required
        ]
      ],
      'city': [this.organisation.city, [
          Validators.required
        ]
      ],
      'postal_code': [this.organisation.postal_code, [
          Validators.required
        ]
      ],
      'country': [this.organisation.country, [
          Validators.required
        ]
      ],
      'no_of_employees': [this.organisation.no_of_employees, [
          Validators.required
        ]
      ]
    });
  }

  isFormControlDirty(controlName: string): boolean {
    if (!this.organisationForm) {
      return false;
    }

    const form = this.organisationForm;
    const control = form.get(controlName);

    return control && control.dirty;
  }

  isFormControlValid(controlName: string): boolean {
    if (!this.organisationForm) {
      return false;
    }

    const form = this.organisationForm;
    const control = form.get(controlName);

    return control && control.valid;
  }

  onSubmit() {
    console.log("onsubmit");
    this.organisation = this.organisationForm.value;
    this.done.emit(this.organisation);
  }

}
