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

    const url =
      InventoryServiceConstants.GET_ITEM_ROUTE +
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
      containerId: container._id,
    };

    await Request.HttpRequest<OnItemMovedToContainerResponse>(
      InventoryServiceConstants.ON_ITEM_MOVE_ROUTE,
      { method: 'POST' },
      reqData
    );
  }
}
