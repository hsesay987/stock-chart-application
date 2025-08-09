# Stock Chart Application — Real-Time Stock Dashboard

## Overview

This application is a sleek Angular-based stock dashboard application that lets users search for any publicly traded company and view real-time stock data, interactive price charts, and key company fundamentals. It leverages the [Alpha Vantage API](https://www.alphavantage.co/) to fetch financial data and uses [ngx-echarts](https://github.com/xieziyu/ngx-echarts) for dynamic, zoomable charts.

The app features a clean, modern UI with:

- A search bar for querying stock symbols (e.g., AAPL, MSFT)
- Company logo and profile information (sector, industry, market cap, P/E ratio, EPS, dividend yield)
- Real-time price updates with price change indicators (green/red arrows)
- An interactive intraday price chart with zoom and pan
- Graceful fallback for missing company logos and data
- Auto-refresh of stock data every 5 minutes

---

## Features

- **Search any stock** symbol to instantly load its profile and price data
- **Company overview** with sector, industry, market cap, and financial ratios
- **Real-time price and price change** indicators with arrows and colors
- **Interactive intraday line chart** with smooth lines, tooltips, and zooming
- **Company logo fetching** using Clearbit API based on company website URL
- **Automatic data refresh** every 5 minutes for up-to-date info
- **Responsive and visually appealing UI** with custom CSS styling

---

## Technology Stack

- **Angular 15+** for frontend SPA framework
- **TypeScript** as the primary programming language
- **ngx-echarts** as the Angular wrapper for ECharts library for charting
- **Alpha Vantage API** for real-time stock data and company information
- **Clearbit Logo API** for fetching company logos by domain
- **RxJS** for reactive data fetching and subscriptions
- **Angular Router** for URL-based stock symbol routing

---

## Usage

- On the homepage, enter a valid stock symbol in the search bar and click Search.
- The app navigates to /data/:symbol and loads the stock data.
- View company details including logo, sector, industry, and financial metrics.
- Interact with the intraday price chart: zoom, pan, and hover to see prices.
- The data automatically refreshes every 5 minutes.

## Notes
- The free Alpha Vantage API has request limits (typically 5 requests per minute). Exceeding these may cause the app to not fetch data temporarily.
- Company logos are fetched from Clearbit based on the company’s website URL in the Alpha Vantage overview data. If unavailable, a default logo (Tesla) is shown.
- The intraday chart uses 5-minute interval data.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is licensed under the MIT License.


Let me know if you want it packaged as a file or any tweaks!
