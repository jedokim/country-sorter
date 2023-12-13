import { Component, OnInit, NgZone } from '@angular/core';
import { HubService } from './hub.service';
import { SelectorFlags } from '@angular/compiler/src/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hubSpot-app';
  uniqueCountries = [];

  usArray = [];
  spainArray = [];
  irelandArray = [];
  mexicoArray = [];
  canadaArray = [];
  singaporeArray = [];
  japanArray = [];
  ukArray = [];
  franceArray = [];
  dateList = [];
  data;
  sendData = {};
  index: number;
  maxAttendees: string;
  fieldname = [
    'countries',
    'attendeeCount',
    'attendees',
    'name',
    'startDate'
  ];


  constructor(
    private hubservice: HubService,
  ) {
  }

  ngOnInit() {
    this.hubservice.getDataFromHubSpot().subscribe(
      res => {
        this.data = res.partners;
        this.sortData(this.data);
      }

    );
  }

  sortData(result: any) {
    this.getUniqueCountries(result);
    this.sortByCountry(result);
    this.countDate(result);
  }

  getUniqueCountries(data: any) {
    this.uniqueCountries = [...new Set(data.map(item => item.country))];
    // ["United States", "Ireland", "Spain", "Mexico", "Canada", "Singapore", "Japan", "United Kingdom", "France"]
  }

  sortByCountry(data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === 'United States') {
        this.usArray.push(data[i]);
      } else if (data[i].country === 'Ireland') {
        this.irelandArray.push(data[i]);
      } else if (data[i].country === 'Spain') {
        this.spainArray.push(data[i]);
      } else if (data[i].country === 'Mexico') {
        this.mexicoArray.push(data[i]);
      } else if (data[i].country === 'Canada') {
        this.canadaArray.push(data[i]);
      } else if (data[i].country === 'Singapore') {
        this.singaporeArray.push(data[i]);
      } else if (data[i].country === 'Japan') {
        this.japanArray.push(data[i]);
      } else if (data[i].country === 'United Kingdom') {
        this.ukArray.push(data[i]);
      } else if (data[i].country === 'France') {
        this.franceArray.push(data[i]);
      }
    }
  }

  countDate(result) {

    let a = [], dateCount = [], prev;

    result.sort();
    for (let j = 0; j < result.length; j++) {
      for (let k = 0; k < result[j].availableDates.length; k++) {
        this.dateList.push(moment(result[j].availableDates[k], 'YYYY-MM-DD').unix());
      }

    }
    const arr = this.dateList;
    arr.sort();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        dateCount.push(1);
      } else {
        dateCount[dateCount.length - 1]++;
      }
      prev = arr[i];
    }

    const readableDates = [];
    for (let i = 0; i < a.length; i++) {
      readableDates.push(moment.unix(a[i]).format('YYYY-MM-DD'));
    }
    this.maxParticipants(readableDates, dateCount);
    return [a, dateCount];
  }

  maxParticipants(readableDates, dateCount) {
    this.index = 0;
    let prev = 0;
    for (let i = 0; i < dateCount.length; i++) {
      if (dateCount && dateCount[i] && dateCount[i + 1]) {
        if ((dateCount[i] + dateCount[i + 1]) > prev) {
          prev = (dateCount[i] + dateCount[i + 1]);
          this.index = i;
        }
      }
    }
    this.maxAttendees = readableDates[this.index];
    console.log('You will get max participants if you schedule on ' + readableDates[this.index]);
    // You will get max participants if you schedule on 05/17/2017

    this.formatSendData();
  }

  formatSendData() {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].availableDates.length; j++) {
        if (this.data[i].availableDates[j] === this.maxAttendees) {

        }
      }
    }
  }
  // Thank you for taking the time to read through my code.
  // If you are wondering why I did not send the data back out to finish this assignment,
  // I experienced some angular errors in the beginning that took a good chunk of time.
  // While I know that the time is up, for the sake of for my own curiosity, I will try and finish this assignment on my own.
}
