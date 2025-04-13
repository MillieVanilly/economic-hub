# Matt's Economic Hub

This web application allows users to view housing and economic data for any Metropolitan Statistical Area (MSA) in the United States, similar to the HUD's Market at a Glance tool.

## Features

- Select from a list of Metropolitan Statistical Areas
- View economic conditions including labor force, employment, and unemployment data
- View population and household data from Census sources
- View housing market conditions including building permits and housing inventory
- Interactive charts for visualizing trends
- Responsive design works on desktop and mobile devices

## How to Use

1. Open `index.html` in a web browser
2. Select an MSA from the dropdown menu
3. Click "Load Data" to view the data for that MSA
4. Explore the various sections with economic and housing data

## Technical Details

This application is built with:

- HTML5
- CSS3
- JavaScript (vanilla)
- Chart.js for data visualization

## Current Limitations

Currently, the application uses mock data for demonstration purposes. In a production environment, you would need to:

1. Connect to real data sources (Census API, BLS API, HUD APIs, etc.)
2. Implement proper data fetching and error handling
3. Add caching for performance
4. Implement more robust UI controls and filtering

## Extending the Application

### Adding Real Data Sources

To connect to real data sources, you would need to:

1. Register for API keys from data providers:
   - [Census API](https://www.census.gov/data/developers/data-sets.html)
   - [BLS API](https://www.bls.gov/developers/)
   - [HUD User Data](https://www.huduser.gov/portal/dataset/market-at-a-glance.html)

2. Modify the data fetching functions in `scripts.js`:
   - Replace `loadMSAList()` with a function that fetches MSAs from a real API
   - Replace `loadMSAData()` with functions that fetch real data for each section
   - Update the data structures to match the API response formats

### Enhancing Visualizations

You can enhance the charts by:

1. Adding more data series to existing charts
2. Creating additional chart types (pie charts, stacked area charts, etc.)
3. Adding time-period selectors to view different date ranges
4. Implementing interactive features like tooltips and drill-downs

### Improving the UI

Possible UI improvements:

1. Add a search box to filter MSAs
2. Implement tabs for different data categories
3. Add a "compare MSAs" feature
4. Enable data export to CSV/PDF
5. Add a map-based MSA selector

## License

This project is open source and available for personal and commercial use. 