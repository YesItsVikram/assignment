import { Component, OnInit, Input } from '@angular/core';
import { Container } from '@custom_modules/models';
import { ContainerService } from '../services/container.service';

@Component({
  selector: 'app-container-card',
  templateUrl: './container-card.component.html',
  styleUrls: ['./container-card.component.scss']
})
export class ContainerCardComponent implements OnInit {
  @Input() container: Container;
  @Input() containerIds: string[] = [];
  selectedid: string | undefined;

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
  }

  moveClicked() {
    if (this.selectedid) {
      this.containerService.moveContainer({ id: this.container._id.toString(), destinationContainerId: this.selectedid })
        .subscribe(data => {
          window.alert(data.status.resp_message);
        });
    }
  }

  deleteClicked() {
    this.containerService.deleteContainer({ id: this.container._id.toString() })
      .subscribe(data => {
        window.alert(data.status.resp_message);
      });
  }
}
