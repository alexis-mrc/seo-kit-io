import {Component, effect, input, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Metatags} from "@seo-kit-boilerplate/seok-core/metatags";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {distinctUntilChanged} from "rxjs";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-metatags-form',
  templateUrl: './metatags-form.component.html',
  styleUrls: []
})
export class MetatagsFormComponent {

  metatags = input.required<Metatags>();

  metatagsChange = output<Metatags>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      og: this.fb.group({
        type: [''],
        site_name: ['']
      }),
      twitter: this.fb.group({
        card: [''],
        site: [''],
        creator: ['']
      })
    });

    effect(() => {
      const metatags = this.metatags();

      this.form.patchValue(metatags);
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(), distinctUntilChanged()).subscribe(res => {
      this.metatagsChange.emit(res)
    });
  }
}
