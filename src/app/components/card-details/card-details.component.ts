import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyMemoryService } from 'src/app/services/translate/my-memory.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  public idShow = '';
  public infoShow: any;
  public year: number = new Date().getFullYear();
  public currentLanguage = 'en';
  public isLoading = false;
  public errorTranslate = '';

  constructor(
    private route: ActivatedRoute,
    private api: DataService,
    private apiTranslate: MyMemoryService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe((params) => {
      this.idShow = params['id'];
    });

    this.api.getShowById(this.idShow).subscribe({
      next: (show: any) => {
        this.infoShow = show;
      },
      complete: () => (this.isLoading = false),
    });
  }

  translate() {
    const to = this.currentLanguage === 'en' ? 'pt-br' : 'en';
    const from = this.currentLanguage;

    const textToTranslate = `${this.infoShow.summary
      .replace(/(\r\n|\n|\r)/gm, '')
      .slice(0, 300)}&langpair=${from}|${to}`;

    this.apiTranslate.translate(textToTranslate).subscribe({
      next: (res: any) => {
        this.infoShow.summary = res.responseData.translatedText + '...';
        this.errorTranslate = '';
      },
      error: (error: any) => {
        this.errorTranslate =
          '* Falha ao realizar a tradução. Tente novamente.';
      },
    });

    this.currentLanguage = this.currentLanguage === 'en' ? 'pt-br' : 'en';
  }
}
