import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GetCategoriesRequest,
  ItemCategory,
  ContainerCategory,
  CreateItemCategoryRequest,
  CreateItemCategoryResponse,
  CreateContainerCategoryRequest,
  CreateContainerCategoryResponse,
} from '@custom_modules/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories<T extends ItemCategory | ContainerCategory>(
    params: GetCategoriesRequest
  ): Observable<T> {
    return this.http.get<T>(
      environment.CategoryServiceConstants.BASE_ROUTE +
        environment.CategoryServiceConstants.PATHS.GET_CATEGORIES +
        Utils.getQueryParamsFromObject(params)
    );
  }

  createItemCategory(
    params: CreateItemCategoryRequest
  ): Observable<CreateItemCategoryResponse> {
    return this.http.post<CreateItemCategoryResponse>(
      environment.CategoryServiceConstants.BASE_ROUTE +
        environment.CategoryServiceConstants.PATHS.CREATE_ITEM_CATEGORY,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  createContainerCategory(
    params: CreateContainerCategoryRequest
  ): Observable<CreateContainerCategoryResponse> {
    return this.http.post<CreateContainerCategoryResponse>(
      environment.CategoryServiceConstants.BASE_ROUTE +
        environment.CategoryServiceConstants.PATHS.CREATE_CONTAINER_CATEGORY,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}
