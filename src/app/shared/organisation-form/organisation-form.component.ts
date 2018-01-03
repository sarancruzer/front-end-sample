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
      'province': [this.organisation.province, [
          Validators.required
        ]
      ],
      'city': [this.organisation.city, [
          Validators.required
        ]
      ],
      'zipCode': [this.organisation.zipCode, [
          Validators.required
        ]
      ],
      'country': [this.organisation.country, [
          Validators.required
        ]
      ],
      'numberOfEmployees': [this.organisation.numberOfEmployees, [
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
    this.organisation = this.organisationForm.value;
    this.done.emit(this.organisation);
  }

}
