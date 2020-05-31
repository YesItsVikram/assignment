import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { CategoryService } from '../services/category.service';
import { ContainerService } from '../services/container.service';
import { Item } from '@custom_modules/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  containerIds: string[] = [];

  constructor(
    private inventoryService: InventoryService,
    categoryService: CategoryService,
    private containerService: ContainerService
  ) {}

  ngOnInit(): void {
    this.inventoryService
      .getItems({ pageNumber: 1, limit: 10 })
      .subscribe((resp) => {
        this.items = resp.items;
      });

    this.containerService.getContainers({}).subscribe((data) => {
      data.containers.forEach((container) => {
        this.containerIds.push(container._id.toString());
      });
    });
  }
}
