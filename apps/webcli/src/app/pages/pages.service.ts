import {DestroyRef, inject, Injectable} from "@angular/core";
import {SeokPage} from "@seo-kit-boilerplate/seok-core/pages";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, debounceTime, Observable, Subject, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private updateSubjectsMap = new Map<string, Subject<Partial<SeokPage>>>();

  http = inject(HttpClient);
  pages = new BehaviorSubject<Partial<SeokPage>[]>([]);

  destroyRef = inject(DestroyRef);

  constructor() {}

  getPages(): Observable<Partial<SeokPage>[]> {
    this.http.get<Partial<SeokPage>[]>('/api/get-pages').subscribe((pages: Partial<SeokPage>[]) => {
      this.pages.next(pages);
    });

    return this.pages.asObservable();
  }

  addPage(id: string) {
    this.http.post<Partial<SeokPage>[]>(`/api/add-page?id=${encodeURI(id)}`, {}).subscribe(() => {
      this.getPages();
    });
  }

  deletePage(id: string) {
    this.http.post(`/api/delete-page?id=${encodeURI(id)}`, {}).subscribe(() => {
      this.getPages();
    });
  }

  generateMdToHtml(file: File, path: string) {
    const formData: FormData = new FormData();
    formData.append('files', file, file.name)
    this.http.post('/api/upload-md', formData).pipe(
      switchMap(() => {
        return this.http.post(`/api/md-to-html`, {filePath: path});
      })
    ).subscribe(() => {
      this.getPages();
    });
  }

  updatePage(page: Partial<SeokPage>) {
    if (!page.id) {
      alert('Error : id is unknown');
      return;
    }

    let updateSubject = this.updateSubjectsMap.get(page.id);

    if (!updateSubject) {
      updateSubject = new Subject<Partial<SeokPage>>();
      this.updateSubjectsMap.set(page.id, updateSubject);

      updateSubject.asObservable().pipe(
        debounceTime(500),
        switchMap(updatedPage => this.http.post(`/api/update-page`, updatedPage)),
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(() => {
        this.getPages();
      });
    }

    updateSubject.next(page);
  }
}
