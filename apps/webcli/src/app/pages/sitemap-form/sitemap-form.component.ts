import {Component, effect, input, output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SitemapData, SitemapImage} from "@seo-kit-boilerplate/seok-core/sitemap";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {distinctUntilChanged} from "rxjs";

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-sitemap-form',
  templateUrl: './sitemap-form.component.html',
  styleUrls: []
})
export class SitemapFormComponent {

  sitemap = input.required<SitemapData>();

  sitemapChange = output<SitemapData>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      lastmod: [''],
      changefreq: [''],
      priority: [''],
      images: this.fb.array([])
    });

    effect(() => {
      const sitemap = this.sitemap();

      this.form.patchValue(sitemap);
      this.setImages(sitemap.images ?? []);
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(), distinctUntilChanged()).subscribe(res => {
      this.sitemapChange.emit(res)
    });
  }

  get images() {
    return this.form.get('images') as FormArray;
  }

  setImages(images: SitemapImage[]) {
    const imageFGs = images.map(image => this.fb.group(image));
    const imageFormArray = this.fb.array(imageFGs);
    this.form.setControl('images', imageFormArray);
  }

  addImage() {
    this.images.push(this.fb.group({
      loc: [''],
      caption: [''],
      title: ['']
    }));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }
}
