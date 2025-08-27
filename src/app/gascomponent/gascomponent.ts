import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'gascomponent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gascomponent.html',
  styleUrls: ['./gascomponent.scss']
})
export class GasPredictorComponent implements OnInit {
  allMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  months: string[] = [];
  years: number[] = [];

  selectedMonth = '';
  selectedYear = new Date().getFullYear();
  currentMonthNumber = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  prediction: number | null = null;
  selectedGA: string = '';
  gaList: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.years = Array.from({ length: 3 }, (_, i) => this.currentYear + i);
    this.selectedYear = this.currentYear;
    this.updateMonths(this.selectedYear);
    this.gaList = [
      { name_of_ga: 'TTZ' },
      { name_of_ga: 'DEWAS' },
      { name_of_ga: 'MEERUT' },
      { name_of_ga: 'SONEPAT' },
      { name_of_ga: 'BENGALURU' },
      { name_of_ga: 'Ganjam,Nayagarh &Puri Dist ' },
      { name_of_ga: 'Sundargarh-Jharsuguda District' },
      { name_of_ga: 'Giridih-Dhanbad Dist Jharkhand' },
      { name_of_ga: 'Dehradun District Uttarakhand' },
      { name_of_ga: 'Dakshina Kannada Dist Karnatak' },
      { name_of_ga: 'Saraikela-Kharaswan District' },
      { name_of_ga: 'West Singhbhum District' },
      { name_of_ga: 'Raisen,Shajapur & Sehore dist' },
      { name_of_ga: 'Mirzapur, Chandauli and Sonbha' },
      { name_of_ga: 'Kakinada-AP' },
      { name_of_ga: 'Gajapati,Kandhamal,Boudh&Sonept' },
      { name_of_ga: 'Kondagaon,Bastar,Sukma&Dantewa' },
    ];
  }

  updateMonths(selectedYear: number) {
    if (selectedYear === this.currentYear) {
      this.months = this.allMonths.slice(this.currentMonthNumber - 1);
      this.selectedMonth = this.allMonths[this.currentMonthNumber - 1]; // Reset to current month
    } else {
      this.months = [...this.allMonths];
      this.selectedMonth = this.allMonths[0]; // Reset to January
    }
  }

  predictGas() {
    const monthNumber = this.allMonths.indexOf(this.selectedMonth) + 1;

    const payload = {
      month: monthNumber,
      year: this.selectedYear,
      ga: this.selectedGA
    };

    console.log("🔼 Sending payload:", payload);

    this.http.post<any>('http://localhost:5000/predict', payload).subscribe({
      next: (response) => {
        this.prediction = response.prediction;
      },
      error: (error) => {
        console.error('Prediction failed', error);
        this.prediction = null;
      }
    });
  }
}
