import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  forbiddenNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ nameIsForbidden: true });
        } else resolve(null);
      }, 1500);
    });
    return promise;
  }

  onSubmitForm() {
    console.log(this.projectForm);
    this.projectForm.reset('userData');
  }
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        projectName: new FormControl(
          null,
          [Validators.required],
          this.forbiddenNames.bind(this)
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      status: new FormControl('critical'),
    });

    this.projectForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    this.projectForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }

  constructor(private formBuilder: FormBuilder) {}
}
