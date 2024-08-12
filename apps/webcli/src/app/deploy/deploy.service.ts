import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeployService {

  filePath = signal<string>('');

  firebaseProjectId = signal<string>('');

  httpClient = inject(HttpClient);

  constructor() {
    this.loadProjectId();
  }

  buildClientApp() {
    this.httpClient.get<{ filePath: string }>('/api/build-client-app').subscribe((res: { filePath: string }) => {
      this.filePath.set(res.filePath);
    });
  }

  getFirebaseProjectsList() {
    this.httpClient.get('/api/firebase-projects-list').subscribe();
  }

  loadProjectId() {
    this.httpClient.get<{projects: { default: string }}>('/api/firebase-project-id').subscribe({
      next: res => {
        this.firebaseProjectId.set(res?.projects?.default ?? '');
      },
      error: error => {
        this.firebaseProjectId.set('');
      }
    });
  }

  setProjectId(projectId: string) {
    if (this.firebaseProjectId() !== projectId) {
      this.httpClient.post(`/api/firebase-project-id/${projectId.trim()}`, {}).subscribe(() => {
        this.loadProjectId();
      });
    }
  }

  deployToFirebaseProd() {
    if (this.firebaseProjectId() !== '') {
      this.httpClient.get(`/api/firebase-deploy-prod`).subscribe();
    }
  }

  deployToFirebasePreview() {
    if (this.firebaseProjectId() !== '') {
      this.httpClient.get(`/api/firebase-deploy-preview`).subscribe();
    }
  }
}
