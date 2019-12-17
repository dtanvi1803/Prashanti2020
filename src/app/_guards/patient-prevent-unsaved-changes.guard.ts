import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PatientEditComponent } from '../Patients/PatientEdit/PatientEdit.component';

@Injectable()
export class PatientPreventUnsavedChanges implements CanDeactivate<PatientEditComponent> {
    canDeactivate(component: PatientEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}
