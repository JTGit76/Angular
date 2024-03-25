import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  tableData: any[] = [];
  selectedItem: any = null;
  currentPage: any[] = [];
  pageSize = 50;
  pageIndex = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/tableData').subscribe(data => {
      console.log(data);
      this.tableData = data;
      this.updatePage();
    });
  }

  selectItem(item: any): void {
    this.selectedItem = this.selectedItem === item ? null : item;
  }

  updatePage(): void {
    this.currentPage =
      [
        ...this.currentPage,
        ...this.tableData.slice(
          this.pageIndex * this.pageSize,
          (this.pageIndex + 1) * this.pageSize)
        ];
  }

  nextPage(): void {
    console.log('Next Page Called');
    this.pageIndex++;
    this.updatePage();
  }

  previousPage(): void {
    this.pageIndex--;
    this.updatePage();
  }

  checkIfLastItem(index: number): void {
    if (this.currentPage.length != 0
      && (index + 9) >= this.currentPage.length - 1) {
      this.nextPage();
    }

    // NOTE EXPANDED PANEL SIZE CHANGES THIS CALL

    // if (this.currentPage.length != 0
    //   && (index) == this.currentPage.length - 1) {
    //   this.previousPage();
    // }

    this.viewport.scrollToIndex(index);
  }
}
