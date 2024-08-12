import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  http = inject(HttpClient);
  assets = new BehaviorSubject<string[]>([]);

  getAssets(): Observable<string[]> {
    this.http.get<string[]>('/api/get-assets').subscribe((assets: string[]) => {
      this.assets.next(assets);
    });

    return this.assets.asObservable();
  }

  getAssetLink(fileName: string): string {
    return '/api/get-asset?name=' + encodeURI(fileName);
  }

  deleteAssets(fileName: string) {
    this.http.delete('/api/delete-assets?name=' + encodeURI(fileName)).subscribe({
      next: (response) => {
        console.log('Delete successful:', response);
        this.getAssets();
      },
      error: (error) => {
        console.error('Delete failed:', error);
        this.getAssets();
      }
    });
  }

  uploadFiles(files: File[]) {
    const formData: FormData = new FormData();
    files.forEach(file => formData.append('files', file, file.name));
    return this.http.post('/api/upload-assets', formData).subscribe(() => {
      this.getAssets();
    });
  }

  isImage(asset: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
    const extension = asset.split('.').pop()?.toLowerCase();
    return imageExtensions.includes(extension || '');
  }
}
