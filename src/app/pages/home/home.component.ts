import { Component, OnInit } from '@angular/core';
import { PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  infos: any;
  showedInfos: any;
  searchedInfos: any;
  totalCards = 0;
  pageIndex = 0;
  pageSize = 8;
  sizePaginator = 0;
  isDisabled = false;
  isSearching = false;
  isResetingToggle = false;

  constructor(
    private api: DataService,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit(): void {
    this.changeTextsPaginator();
    this.getAllShows();
  }

  public handlePage(event: PageEvent): void {
    this.pageSize = event.pageSize;

    const initialPage = event.pageSize * event.pageIndex;
    const finalPage = event.pageSize * event.pageIndex + event.pageSize;

    this.showedInfos = this.isSearching
      ? this.searchedInfos.slice(initialPage, finalPage)
      : this.infos.slice(initialPage, finalPage);
  }

  public setFindedShows(event: []) {
    if (event.length === 0) {
      this.sizePaginator = this.infos.length;
      this.showedInfos = this.infos.slice(this.pageIndex, this.pageSize);
      this.isDisabled = false;
    } else {
      this.showedInfos = event;
      this.sizePaginator = event.length;
      this.isDisabled = true;
    }

    this.isResetingToggle = true;
  }

  public setStatusToggle(value: string) {
    if (value === 'All') {
      this.isSearching = false;
      this.showedInfos = this.infos.slice(this.pageIndex, this.pageSize);
      this.sizePaginator = this.infos.length;
    } else {
      this.isSearching = true;
      this.searchedInfos = this.infos.filter(
        (info: any) => info.status === value
      );
      this.showedInfos = this.searchedInfos.slice(
        this.pageIndex,
        this.pageSize
      );
      this.sizePaginator = this.searchedInfos.length;
    }
    this.isResetingToggle = false;
  }

  private getAllShows() {
    this.api.getAllShows().subscribe((res: any) => {
      this.infos = res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      this.totalCards = this.infos.length;
      this.showedInfos = this.infos.slice(this.pageIndex, this.pageSize);
      this.sizePaginator = this.infos.length;
    });
  }

  private changeTextsPaginator() {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Itens por página';

    this._MatPaginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;

      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }
}
