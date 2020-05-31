import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from '@custom_modules/models';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  constructor(private http: HttpClient) {}

  getContainers(): Observable<Container[]>;

  getRootContainer(): Observable<Container | null>;

  createContainer(container): Observable<Container | null>;
}
