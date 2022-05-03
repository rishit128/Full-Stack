import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  selectedTicket: Ticket;
  Tickets: Ticket[];
  baseURL = 'http://localhost:5000/tickets';
  constructor(private http: HttpClient) {}

  getTicketList() {
    return this.http.get(this.baseURL);
  }
  postTicket(M: Ticket) {

    return this.http.post(this.baseURL, M);
  }

  putTicket(M: Ticket) {
    return this.http.patch(this.baseURL + `/${M._id}`, M);
  }

  deleteTicket(element:Ticket) {

    return this.http.post('http://localhost:5000/tickets/delete', element);
  }
}
