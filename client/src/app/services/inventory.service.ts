import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateItemRequest,
  GetItemsRequest,
  CreateItemResponse,
  GetItemsResponse,
} from '@custom_modules/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  createItem(params: CreateItemRequest): Observable<CreateItemResponse> {
    return this.http.post<CreateItemResponse>(
      environment.InventoryServiceConstants.BASE_ROUTE +
        environment.InventoryServiceConstants.PATHS.CREATE_ITEM,
      params,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  getItems(params: GetItemsRequest): Observable<GetItemsResponse> {
    return this.http.get<GetItemsResponse>(
      environment.InventoryServiceConstants.BASE_ROUTE +
        environment.InventoryServiceConstants.PATHS.GET_ITEMS +
        Utils.getQueryParamsFromObject(params)
    );
  }
}
