import { Injectable } from '@angular/core';

import { BookVehicleStep } from './../book-vehicle-step';
import { BookVehicleStepButtonKind } from './../book-vehicle-step-button-kind.enum';

@Injectable()
export class BookVehicleWizardService {

  static STEP_FILTER = 'filter';
  static STEP_SELECT = 'select';
  static STEP_CONFIRM = 'confirm';

  private steps: BookVehicleStep[];

  private activeStep: BookVehicleStep;

  constructor() {
    // the order of the elements of the array defines
    // the order of the steps in the wizard
    this.steps = [
      {
        name: '1. Filter Vehicles',
        id: BookVehicleWizardService.STEP_FILTER,
        buttons: [
          {kind: BookVehicleStepButtonKind.Next, label: 'Next'}
        ]
      },
      {
        name: '2. Select Available Vehicle',
        id: BookVehicleWizardService.STEP_SELECT,
        buttons: [
          {kind: BookVehicleStepButtonKind.Prev, label: 'Previous'}
        ]
      },
      {
        name: '3. Confirm Booking',
        id: BookVehicleWizardService.STEP_CONFIRM,
        buttons: [
          {kind: BookVehicleStepButtonKind.Prev, label: 'Previous'},
          {kind: BookVehicleStepButtonKind.Next, label: 'Confirm'}
        ]
      }
    ];

    this.activeStep = this.steps[0];
  }

  getSteps(): BookVehicleStep[] {
    return this.steps;
  }

  getActiveStep(): BookVehicleStep {
    return this.activeStep;
  }

  isStepActive(step: BookVehicleStep|string): boolean {
    return (typeof step === 'string')
      ? step === this.activeStep.id
      : (<BookVehicleStep>step).id === this.activeStep.id;
  }

  hasPrevButton() {
    return this.hasButtonOfKind(this.activeStep, BookVehicleStepButtonKind.Prev);
  }

  hasNextButton() {
    return this.hasButtonOfKind(this.activeStep, BookVehicleStepButtonKind.Next);
  }

  getPrevButtonLabel() {
    return this.getButtonLabel(this.activeStep, BookVehicleStepButtonKind.Prev);
  }

  getNextButtonLabel() {
    return this.getButtonLabel(this.activeStep, BookVehicleStepButtonKind.Next);
  }

  moveForward() {
    for (var i = 0; i < this.steps.length; i++) {
      var step = this.steps[i];
      if (step.id === this.activeStep.id && (i + 1) < this.steps.length) {
        this.activeStep = this.steps[i + 1];
        break;
      }
    }
  }

  moveBackward() {
    for (var i = 0; i < this.steps.length; i++) {
      var step = this.steps[i];
      if (step.id === this.activeStep.id && (i - 1) >= 0) {
        this.activeStep = this.steps[i - 1];
        break;
      }
    }
  }

  reset() {
    this.activeStep = this.steps[0];
  }

  private hasButtonOfKind(
    step: BookVehicleStep,
    buttonKind: BookVehicleStepButtonKind
  ): boolean {
    for (let button of step.buttons) {
      if (button.kind === buttonKind) {
        return true;
      }
    }

    return false;
  }

  private getButtonLabel(
    step: BookVehicleStep,
    buttonKind: BookVehicleStepButtonKind
  ): string {
    for (let button of step.buttons) {
      if (button.kind === buttonKind) {
        return button.label;
      }
    }

    return null;
  }
}
