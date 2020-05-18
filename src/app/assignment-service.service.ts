import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssignmentServiceService {

  constructor(private httpClient:HttpClient) { }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://localhost:8080/upload';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData);
  }
}
