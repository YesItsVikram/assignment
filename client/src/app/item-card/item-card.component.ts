import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@custom_modules/models';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  @Input() containerIds: string[] = [];

  selectedid: string | undefined;

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void { }

  buttonClicked() {
    if (this.selectedid) {
      this.containerService.moveItem({ id: this.item._id.toString(), destinationContainerId: this.selectedid }).subscribe(data => {
        window.alert(data.status.resp_message);
      })
    }
  }
}
