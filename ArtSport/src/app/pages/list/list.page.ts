import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ArtItemService } from 'src/app/services/art-item.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  loaded: boolean = false;
  artItems: Object;

  constructor(public artItemService: ArtItemService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.loaded = false;
    this.artItemService.getList().subscribe( artItems => {
      this.artItems = artItems;
    }).add( () => {
      this.loaded = true;
    });
  }
}
