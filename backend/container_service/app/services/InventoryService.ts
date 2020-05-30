import { Container } from '../models/Container';
import { Item } from '../models/Item';

export class InventoryService {
  async getItem(itemId: string): Promise<Item | null> {}

  async itemMovedToContainer(itemId: string, container: Container) {}

  async itemRemovedFromContainer(itemId: string) {}
}
