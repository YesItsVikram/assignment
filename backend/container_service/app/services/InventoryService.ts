import { Container, Item } from '@custom_modules/models';

export class InventoryService {
  async getItem(itemId: string): Promise<Item | null> {}

  async itemMovedToContainer(itemId: string, container: Container) {}
}
