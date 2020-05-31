import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../services/container.service';
import { Container } from '@custom_modules/models';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {
  containerIds: string[] = [];
  containers: Container[] = [];

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.containerService.getContainers({}).subscribe((data) => {
      data.containers.forEach((container) => {
        this.containers.push(container);
        this.containerIds.push(container._id.toString());
      });
    });
  }

}
