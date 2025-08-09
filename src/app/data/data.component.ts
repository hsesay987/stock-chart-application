import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EChartsOption } from 'echarts';
import { ActivatedRoute } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  symbol: string = 'IBM';
  companyInfo: any = null;
  companyLogoUrl: string = '';
  loading = true;

  options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const data = params[0];
        return `<strong>${
          data.axisValue
        }</strong><br/>Price: $${data.data.toFixed(2)}`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
    },
    dataZoom: [
      { type: 'inside', start: 90, end: 100 },
      { start: 90, end: 100 },
    ],
    series: [
      {
        name: 'Price',
        type: 'line',
        data: [],
        smooth: true,
        symbol: 'none',
        itemStyle: { color: '#007bff' },
        lineStyle: { width: 2 },
        areaStyle: { color: 'rgba(0,123,255,0.1)' },
      },
    ],
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  currentPrice: number = 0;
  priceChange: number = 0;
  priceChangePercent: number = 0;
  updateInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.symbol = params.get('symbol') || 'IBM';
      this.getCompanyInfo();
      this.loadAllData();

      // Refresh data every 5 minutes
      if (this.updateInterval) clearInterval(this.updateInterval);
      this.updateInterval = setInterval(() => {
        this.loadAllData();
      }, 300000);
    });
  }

  ngOnDestroy(): void {
    if (this.updateInterval) clearInterval(this.updateInterval);
  }

  loadAllData() {
    this.getCompanyInfo();
    this.getQuote();
    this.getData();
  }

  private getDomainFromUrl(url: string): string | null {
    try {
      // Use URL API to parse domain safely
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch {
      // If invalid URL, try basic fallback:
      if (url.includes('/')) {
        return url.split('/')[0];
      }
      return url;
    }
  }

  // Get static company info
  getCompanyInfo() {
    this.http
      .get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${this.symbol}&apikey=J6X4KBDG72MFLOLQ`
      )
      .subscribe((info: any) => {
        this.companyInfo = info;
        if (info?.Website) {
          const domain = this.getDomainFromUrl(info.Website);
          if (domain) {
            this.companyLogoUrl = `https://logo.clearbit.com/${domain}`;
          } else {
            this.companyLogoUrl = 'assets/default-logo.png'; // fallback
          }
        } else {
          this.companyLogoUrl = 'assets/default-logo.png'; // fallback
        }
      });
  }

  // Get current price & change
  getQuote() {
    this.http
      .get(
        'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.symbol}&apikey=J6X4KBDG72MFLOLQ'
      )
      .subscribe((quote: any) => {
        const data = quote['Global Quote'];
        if (data) {
          this.currentPrice = parseFloat(data['05. price']);
          this.priceChange = parseFloat(data['09. change']);
          this.priceChangePercent = parseFloat(data['10. change percent']);
        }
      });
  }

  // Get intraday chart data
  getData() {
    this.loading = true;
    this.http
      .get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=5min&apikey=J6X4KBDG72MFLOLQ'
      )
      .subscribe((result: any) => {
        const timeSeries = result['Time Series (5min)'];
        if (!timeSeries) {
          this.loading = false;
          return;
        }

        const entries = Object.entries(timeSeries)
          .map(([timestamp, values]: any) => ({
            time: timestamp,
            value: parseFloat(values['4. close']),
          }))
          .sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          );

        const xAxisData = entries.map((e) => e.time);
        const seriesData = entries.map((e) => e.value);

        const currentSeries = Array.isArray(this.options.series)
          ? this.options.series[0]
          : (this.options.series as any);

        this.options = {
          ...this.options,
          xAxis: { type: 'category', data: xAxisData },
          series: [{ ...currentSeries, data: seriesData }],
        };

        this.loading = false;
      });
  }
}
