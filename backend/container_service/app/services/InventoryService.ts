import {
  Container,
  Item,
  GetItemRequest,
  GetItemResponse,
  OnItemMovedToContainerRequest,
  OnItemMovedToContainerResponse,
} from '@custom_modules/models';
import { Request } from '@custom_modules/utils';
import { InventoryServiceConstants } from '../Constants';

export class InventoryService {
  async getItem(itemId: string): Promise<Item | null> {
    const reqData: GetItemRequest = { id: itemId };

    const url =
      this.getUrl(InventoryServiceConstants.ROUTES.GET_ITEM) +
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

    await Request.HttpRequest<OnItemMovedToContainerResponse>(
      this.getUrl(InventoryServiceConstants.ROUTES.ON_ITEM_MOVE),
      { method: 'POST' },
      reqData
    );
  }

  private getUrl(path = ''): string {
    const baseRoute = InventoryServiceConstants.BASE_ROUTE;
    return (
      (baseRoute.charAt(baseRoute.length - 1) === '/'
        ? baseRoute.substr(0, baseRoute.length - 1)
        : baseRoute) + path
    );
  }
}
