import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TicketService } from '../shared/ticket.service';
import { Ticket } from '../shared/ticket.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import moment from 'moment'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns = ['ticket_desc', 'empid', 'empname','createdAt','updatedAt','DeletedAt','Edit',"Delete"];
  dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.resetForm();
    this.getTicketsData();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    public ticketservice: TicketService,
    public AuthService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.ticketservice.selectedTicket = {
      _id: '',
      ticket_desc: '',
      empid: 0,
      empname: AuthService.user.name,
      creator: AuthService.user._id,
      createdAt: '',
      updatedAt: '',
      DeletedAt: '',
      Date: null,
      Resolved: false,
    };
    
  }

  getTicketsData() {
    this.ticketservice.getTicketList().subscribe((res) => {
      this.ticketservice.Tickets = res as Ticket[];
      this.dataSource = new MatTableDataSource(this.ticketservice.Tickets);
      this.dataSource.paginator = this.paginator;

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  announceSortChange(sortState: Sort) {
    
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onSubmit(form: NgForm)
  {
     
      form.value.creator=this.AuthService.user._id;
      form.value.empname = this.AuthService.user.name;
      if (form.value._id == "" || form.value._id == null) {
 
          this.ticketservice.postTicket(form.value).subscribe((res) => {
         this.resetForm(form);
    
         this.getTicketsData();
     
        });
      }
      else {
  
          this.ticketservice.putTicket(form.value).subscribe((res) => {

          this.resetForm(form);
        
          this.getTicketsData();

        });
      }
  }  
  onEdit(M: Ticket) {
    this.ticketservice.selectedTicket = M;
  }
  resetForm(form?:NgForm){
     
    if(form)
    {
      this.ticketservice.selectedTicket._id=''
      this.ticketservice.selectedTicket.ticket_desc=''
      this.ticketservice.selectedTicket.empname=this.AuthService.user.name
      this.ticketservice.selectedTicket.empid=0
    }
    this.ticketservice.selectedTicket._id=''
    this.ticketservice.selectedTicket.ticket_desc=''
    this.ticketservice.selectedTicket.empname=this.AuthService.user.name
    this.ticketservice.selectedTicket.empid=0
   
  }
  onClose(){
    this.getTicketsData();
  }
  onDelete( element:Ticket) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.ticketservice.deleteTicket(element).subscribe((res) => {
       
        this.getTicketsData(); 
   
      });
    }
  }

  moment(element:any){
    return moment(element).fromNow();
  }
}
