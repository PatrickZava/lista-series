import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() infos: any;
  @Output() findedShows = new EventEmitter();

  public searchedTerm = '';
  public randomPlaceholder = '';

  constructor(private api: DataService) {}

  public getRandomPlaceholder() {
    const random = Math.floor(Math.random() * this.infos.length);
    this.randomPlaceholder = `Ex: ${this.infos[random].name}`;
  }

  public getSearchedShow(event: any) {
    if (event === '') {
      this.searchedTerm = event;
    } else {
      this.searchedTerm = event.target.value;
    }

    this.api.getShow(this.searchedTerm).subscribe((res: any) => {
      const filteredShows = res.map((res: any) => res.show);

      this.findedShows.emit(
        filteredShows
          .filter(
            (show: any) =>
              show.name && show.premiered && show.language && show.image
          )
          .slice(0, 8)
      );
    });
  }
}
