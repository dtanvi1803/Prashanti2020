import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { VisitDetailsEditComponent } from '../Patients/VisitDetailsEdit/VisitDetailsEdit.component';

@Injectable()
export class VisitPreventUnsavedChanges implements CanDeactivate<VisitDetailsEditComponent> {
    canDeactivate(component: VisitDetailsEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved Visit Detail changes will be lost');
        }
        return true;
    }
}
