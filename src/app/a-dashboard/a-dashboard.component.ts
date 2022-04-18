import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: String,
  staff_id: String,
  rating: Number,
  dept: String,
  respondents: Number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'John', staff_id: '123', rating: 4, dept: 'IT', respondents: 10},
  {name: 'Jane', staff_id: '456', rating: 3, dept: 'HR', respondents: 20},
  {name: 'Joe', staff_id: '789', rating: 5, dept: 'Sales', respondents: 30},
  {name: 'Jack', staff_id: '101', rating: 2, dept: 'Marketing', respondents: 40},
  {name: 'Jill', staff_id: '102', rating: 1, dept: 'Finance', respondents: 50},
  {name: 'Jana', staff_id: '103', rating: 4, dept: 'IT', respondents: 60},
  {name: 'Jone', staff_id: '104', rating: 3, dept: 'HR', respondents: 70},
  {name: 'Jane', staff_id: '105', rating: 5, dept: 'Sales', respondents: 80},
  {name: 'Joe', staff_id: '106', rating: 2, dept: 'Marketing', respondents: 90},
  {name: 'Jack', staff_id: '107', rating: 1, dept: 'Finance', respondents: 100},
  {name: 'Jill', staff_id: '108', rating: 4, dept: 'IT', respondents: 110},
  {name: 'Jana', staff_id: '109', rating: 3, dept: 'HR', respondents: 120},
  {name: 'Jone', staff_id: '110', rating: 5, dept: 'Sales', respondents: 130},
  {name: 'Jane', staff_id: '111', rating: 2, dept: 'Marketing', respondents: 140},
];

@Component({
  selector: 'se-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements AfterViewInit {

  readonly navIsOpen: boolean = true;

  displayedColumns: string[] = ['serial_no', 'name', 'staff_id', 'dept', 'rating', 'respondents'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  chartData = [
    {
      data: [1000, 3400, 1033, 3232, 4231, 2000, 2500, 6000, 5000, 5100, 4011, 5000],
      label: 'Total Evaluations'
    },
    {
      data: [780, 3210, 1000, 2000, 3222, 1212, 2334, 5502, 4343, 4552, 3232, 4231],
      label: 'Evaluations above 3.5'
    },
  ];

  chartLabels = [
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
  ];

  chartOptions = {
    responsive: true
  };
 
}
