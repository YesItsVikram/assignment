import { Container, Item } from '@custom_modules/models';
import { Request } from '@custom_modules/utils';
import { GetItemRequest } from '../models/requests/outgoing/GetItemRequest';
import { InventoryServiceConstants } from '../Constants';
import { GetItemResponse } from '../models/responses/incoming/GetItemResponse';
import { OnItemMovedToContainerRequest } from '../models/requests/outgoing/OnItemMovedToContainerRequest';
import { OnItemMovedToContainerResponse } from '../models/responses/incoming/OnItemMovedToContainerResponse';

export class InventoryService {
  async getItem(itemId: string): Promise<Item | null> {
    const reqData: GetItemRequest = { id: itemId };

    const baseRoute = InventoryServiceConstants.BASE_ROUTE;
    const url =
      (baseRoute.charAt(baseRoute.length - 1) === '/'
        ? baseRoute.substr(0, baseRoute.length - 1)
        : baseRoute) +
      InventoryServiceConstants.ROUTES.GET_ITEM +
      Request.getQueryParamsFromObject(reqData);

    const resp = await Request.HttpRequest<GetItemResponse>(url, {
      method: 'GET',
    });

    if (resp?.status?.resp_code === 200) return resp.item;
    return null;
  }

  async itemMovedToContainer(itemId: string, container: Container) {
    const reqData: OnItemMovedToContainerRequest = {
      itemId,
      containerId: container._id.toString(),
    };
    const baseRoute = InventoryServiceConstants.BASE_ROUTE;
    const url =
      (baseRoute.charAt(baseRoute.length - 1) === '/'
        ? baseRoute.substr(0, baseRoute.length - 1)
        : baseRoute) + InventoryServiceConstants.ROUTES.ON_ITEM_MOVE;

    await Request.HttpRequest<OnItemMovedToContainerResponse>(
      url,
      { method: 'POST' },
      reqData
    );
  }
}
