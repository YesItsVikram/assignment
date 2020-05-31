import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateContainerRequest,
  GetRootContainerRequest,
  GetContainersRequest,
  DeleteContainerRequest,
  MoveContainerResponse,
  MoveItemRequest,
  GetContainersResponse,
  GetRootContainerResponse,
  CreateContainerResponse,
  DeleteContainerResponse,
  MoveItemResponse,
  MoveContainerRequest,
} from '@custom_modules/models';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  constructor(private http: HttpClient) { }

  getContainers(
    params: GetContainersRequest
  ): Observable<GetContainersResponse> {
    return this.http.get<GetContainersResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.GET_CONTAINERS +
      Utils.getQueryParamsFromObject(params)
    );
  }

  getRootContainer(
    params: GetRootContainerRequest
  ): Observable<GetRootContainerResponse> {
    return this.http.get<GetRootContainerResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.GET_ROOT_CONTAINER +
      Utils.getQueryParamsFromObject(params)
    );
  }

  createContainer(
    params: CreateContainerRequest
  ): Observable<CreateContainerResponse> {
    return this.http.post<CreateContainerResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.CREATE_CONTAINER,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  deleteContainer(
    params: DeleteContainerRequest
  ): Observable<DeleteContainerResponse> {
    return this.http.post<DeleteContainerResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.DELETE_CONTAINER,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  moveContainer(
    params: MoveContainerRequest
  ): Observable<MoveContainerResponse> {
    return this.http.post<MoveContainerResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.MOVE_CONTAINER,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  moveItem(params: MoveItemRequest): Observable<MoveItemResponse> {
    return this.http.post<MoveItemResponse>(
      environment.ContainerServiceConstants.BASE_ROUTE +
      environment.ContainerServiceConstants.PATHS.MOVE_ITEM,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}
