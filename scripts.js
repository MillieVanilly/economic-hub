document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const msaSelect = document.getElementById('msa-select');
    const loadDataBtn = document.getElementById('load-data-btn');
    const loadingElement = document.getElementById('loading');
    const dataContainer = document.getElementById('data-container');
    const msaTitle = document.getElementById('msa-title');
    const msaSubtitle = document.getElementById('msa-subtitle');
    
    // Charts objects
    let employmentChart = null;
    let populationChart = null;
    let permitsChart = null;
    
    // Load MSA list on page load
    loadMSAList();
    
    // Event Listeners
    loadDataBtn.addEventListener('click', function() {
        const selectedMSA = msaSelect.value;
        if (selectedMSA) {
            loadMSAData(selectedMSA);
        } else {
            alert('Please select an MSA first');
        }
    });
    
    // Functions
    async function loadMSAList() {
        try {
            // In a real app, this would fetch from an API
            // For demo purposes, we'll use a sample list of MSAs
            const msaList = [
                { id: '10180', name: 'Abilene, TX MSA' },
                { id: '10420', name: 'Akron, OH MSA' },
                { id: '10580', name: 'Albany-Schenectady-Troy, NY MSA' },
                { id: '10740', name: 'Albuquerque, NM MSA' },
                { id: '10900', name: 'Allentown-Bethlehem-Easton, PA-NJ MSA' },
                { id: '12060', name: 'Atlanta-Sandy Springs-Alpharetta, GA MSA' },
                { id: '12420', name: 'Austin-Round Rock-Georgetown, TX MSA' },
                { id: '12580', name: 'Baltimore-Columbia-Towson, MD MSA' },
                { id: '13820', name: 'Birmingham-Hoover, AL MSA' },
                { id: '14460', name: 'Boston-Cambridge-Newton, MA-NH MSA' },
                { id: '16980', name: 'Chicago-Naperville-Elgin, IL-IN-WI MSA' },
                { id: '19100', name: 'Dallas-Fort Worth-Arlington, TX MSA' },
                { id: '19740', name: 'Denver-Aurora-Lakewood, CO MSA' },
                { id: '19820', name: 'Detroit-Warren-Dearborn, MI MSA' },
                { id: '26420', name: 'Houston-The Woodlands-Sugar Land, TX MSA' },
                { id: '31080', name: 'Los Angeles-Long Beach-Anaheim, CA MSA' },
                { id: '33100', name: 'Miami-Fort Lauderdale-Pompano Beach, FL MSA' },
                { id: '35620', name: 'New York-Newark-Jersey City, NY-NJ-PA MSA' },
                { id: '38060', name: 'Phoenix-Mesa-Chandler, AZ MSA' },
                { id: '41860', name: 'San Francisco-Oakland-Berkeley, CA MSA' },
                { id: '42660', name: 'Seattle-Tacoma-Bellevue, WA MSA' },
                { id: '47900', name: 'Washington-Arlington-Alexandria, DC-VA-MD-WV MSA' }
            ];
            
            // Clear existing options except the first one
            while (msaSelect.options.length > 1) {
                msaSelect.remove(1);
            }
            
            // Add MSA options to select
            msaList.forEach(msa => {
                const option = document.createElement('option');
                option.value = msa.id;
                option.textContent = msa.name;
                msaSelect.appendChild(option);
            });
            
            // For demo: pre-select Abilene
            msaSelect.value = '10180';
            
            // Auto-load data for the pre-selected MSA
            loadMSAData('10180');
            
        } catch (error) {
            console.error('Error loading MSA list:', error);
            alert('Failed to load MSA list. Please try again later.');
        }
    }
    
    function loadMSAData(msaId) {
        try {
            showLoading(true);
            
            // In a real app, this would make API calls to get real data
            // For demo purposes, we'll use mock data
            const mockData = generateMockData(msaId);
            
            // Short timeout to simulate API call
            setTimeout(() => {
                // Update UI with the data
                updateUI(mockData);
                
                showLoading(false);
                dataContainer.classList.remove('hidden');
            }, 800);
            
        } catch (error) {
            console.error('Error loading MSA data:', error);
            showLoading(false);
            dataContainer.classList.add('hidden');
            alert('Failed to load MSA data. Please try again later.');
        }
    }
    
    function showLoading(isLoading) {
        if (isLoading) {
            loadingElement.classList.remove('hidden');
            dataContainer.classList.add('hidden');
        } else {
            loadingElement.classList.add('hidden');
        }
    }
    
    function updateUI(data) {
        if (!data) {
            console.error('No data available to update UI');
            return;
        }
        
        try {
            // Update title and subtitle
            msaTitle.textContent = `${data.msaName} Market Overview`;
            msaSubtitle.textContent = `Data as of ${data.dataDate}`;
            
            // Update economic conditions data
            document.getElementById('labor-force-num').textContent = formatNumber(data.laborForce.current);
            document.getElementById('labor-force-pct').textContent = '-';
            document.getElementById('labor-force-yoy-num').textContent = formatNumber(data.laborForce.yearOverYearChange);
            document.getElementById('labor-force-yoy-pct').textContent = formatPercent(data.laborForce.yearOverYearChangePercent);
            
            document.getElementById('employment-num').textContent = formatNumber(data.employment.current);
            document.getElementById('employment-pct').textContent = '-';
            document.getElementById('employment-yoy-num').textContent = formatNumber(data.employment.yearOverYearChange);
            document.getElementById('employment-yoy-pct').textContent = formatPercent(data.employment.yearOverYearChangePercent);
            
            document.getElementById('unemployment-num').textContent = formatPercent(data.unemployment.current);
            document.getElementById('unemployment-pct').textContent = '-';
            document.getElementById('unemployment-yoy-num').textContent = formatPercent(data.unemployment.yearOverYearChange);
            document.getElementById('unemployment-yoy-pct').textContent = '-';
            
            // Update population data
            document.getElementById('pop-2010-num').textContent = formatNumber(data.population.year2010);
            document.getElementById('pop-2010-pct').textContent = '-';
            document.getElementById('pop-2020-num').textContent = formatNumber(data.population.year2020);
            document.getElementById('pop-2020-pct').textContent = '-';
            document.getElementById('pop-change-num').textContent = formatNumber(data.population.annualChange);
            document.getElementById('pop-change-pct').textContent = formatPercent(data.population.annualChangePercent);
            
            document.getElementById('hh-2010-num').textContent = formatNumber(data.households.year2010);
            document.getElementById('hh-2010-pct').textContent = '-';
            document.getElementById('hh-2020-num').textContent = formatNumber(data.households.year2020);
            document.getElementById('hh-2020-pct').textContent = '-';
            document.getElementById('hh-change-num').textContent = formatNumber(data.households.annualChange);
            document.getElementById('hh-change-pct').textContent = formatPercent(data.households.annualChangePercent);
            
            // Update housing inventory data
            document.getElementById('total-units').textContent = formatNumber(data.housingInventory.totalUnits);
            document.getElementById('occupied-units').textContent = formatNumber(data.housingInventory.occupied);
            document.getElementById('owner-units').textContent = formatNumber(data.housingInventory.owners);
            document.getElementById('owner-pct').textContent = formatPercent(data.housingInventory.ownerPercent);
            document.getElementById('renter-units').textContent = formatNumber(data.housingInventory.renters);
            document.getElementById('renter-pct').textContent = formatPercent(data.housingInventory.renterPercent);
            document.getElementById('vacant-units').textContent = formatNumber(data.housingInventory.vacant);
            document.getElementById('for-sale').textContent = formatNumber(data.housingInventory.forSale);
            document.getElementById('for-rent').textContent = formatNumber(data.housingInventory.forRent);
            document.getElementById('other-vacant').textContent = formatNumber(data.housingInventory.otherVacant);
            
            // Create charts
            createEmploymentChart(data.employmentHistory);
            createPopulationChart(data.populationHistory);
            createPermitsChart(data.buildingPermits);
        } catch (error) {
            console.error('Error updating UI with data:', error);
            alert('Error displaying data. Please try again later.');
        }
    }
    
    function createEmploymentChart(data) {
        if (!data || !document.getElementById('employment-chart')) {
            console.error('Cannot create employment chart: missing data or DOM element');
            return;
        }
        
        try {
            const ctx = document.getElementById('employment-chart').getContext('2d');
            
            // Destroy existing chart if it exists
            if (employmentChart) {
                employmentChart.destroy();
            }
            
            employmentChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Employment',
                            data: data.employment,
                            borderColor: '#0062cc',
                            backgroundColor: 'rgba(0, 98, 204, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Unemployment Rate',
                            data: data.unemploymentRate,
                            borderColor: '#dc3545',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            tension: 0.3,
                            fill: true,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Employment Trends',
                            font: {
                                size: 14
                            }
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 10
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Employment'
                            },
                            beginAtZero: false
                        },
                        y1: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Unemployment Rate (%)'
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating employment chart:', error);
        }
    }
    
    function createPopulationChart(data) {
        if (!data || !document.getElementById('population-chart')) {
            console.error('Cannot create population chart: missing data or DOM element');
            return;
        }
        
        try {
            const ctx = document.getElementById('population-chart').getContext('2d');
            
            // Destroy existing chart if it exists
            if (populationChart) {
                populationChart.destroy();
            }
            
            populationChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Population',
                            data: data.population,
                            backgroundColor: 'rgba(32, 201, 151, 0.7)'
                        },
                        {
                            label: 'Net Migration',
                            data: data.netMigration,
                            backgroundColor: 'rgba(0, 98, 204, 0.7)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Population Growth and Migration',
                            font: {
                                size: 14
                            }
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 10
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'People'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating population chart:', error);
        }
    }
    
    function createPermitsChart(data) {
        if (!data || !document.getElementById('permits-chart')) {
            console.error('Cannot create permits chart: missing data or DOM element');
            return;
        }
        
        try {
            const ctx = document.getElementById('permits-chart').getContext('2d');
            
            // Destroy existing chart if it exists
            if (permitsChart) {
                permitsChart.destroy();
            }
            
            permitsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Single-Family',
                            data: data.singleFamily,
                            backgroundColor: 'rgba(0, 98, 204, 0.7)'
                        },
                        {
                            label: 'Multi-Family',
                            data: data.multiFamily,
                            backgroundColor: 'rgba(111, 66, 193, 0.7)'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Building Permits',
                            font: {
                                size: 14
                            }
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                boxWidth: 10
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            stacked: true,
                            title: {
                                display: true,
                                text: 'Number of Units'
                            }
                        },
                        x: {
                            stacked: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating permits chart:', error);
        }
    }
    
    // Helper functions
    function formatNumber(number) {
        if (number === undefined || number === null) {
            return '-';
        }
        return new Intl.NumberFormat('en-US').format(number);
    }
    
    function formatPercent(number) {
        if (number === undefined || number === null) {
            return '-';
        }
        return new Intl.NumberFormat('en-US', { 
            style: 'percent', 
            minimumFractionDigits: 1, 
            maximumFractionDigits: 1 
        }).format(number / 100);
    }
    
    // Mock data generator for demo
    function generateMockData(msaId) {
        if (!msaId) {
            console.error('No MSA ID provided to generate data');
            return null;
        }
        
        // Get MSA name from select element
        const selectedOption = msaSelect.options[msaSelect.selectedIndex];
        const msaName = selectedOption ? selectedOption.text : 'Unknown MSA';
        
        // Generate some random data based on the MSA ID to make it appear unique
        const seedValue = parseInt(msaId) % 100;
        const randomFactor = seedValue / 100;
        
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        return {
            msaId: msaId,
            msaName: msaName,
            dataDate: formattedDate,
            
            // Economic conditions
            laborForce: {
                current: 100000 + Math.round(randomFactor * 50000),
                yearOverYearChange: 1500 + Math.round(randomFactor * 1000),
                yearOverYearChangePercent: 1.5 + randomFactor
            },
            employment: {
                current: 95000 + Math.round(randomFactor * 47500),
                yearOverYearChange: 1200 + Math.round(randomFactor * 800),
                yearOverYearChangePercent: 1.3 + randomFactor
            },
            unemployment: {
                current: 5 - randomFactor,
                yearOverYearChange: -0.2 - randomFactor * 0.3
            },
            
            // Population
            population: {
                year2010: 150000 + Math.round(randomFactor * 50000),
                year2020: 165000 + Math.round(randomFactor * 60000),
                annualChange: 1500 + Math.round(randomFactor * 1000),
                annualChangePercent: 0.9 + randomFactor
            },
            households: {
                year2010: 55000 + Math.round(randomFactor * 20000),
                year2020: 62000 + Math.round(randomFactor * 25000),
                annualChange: 700 + Math.round(randomFactor * 500),
                annualChangePercent: 1.2 + randomFactor
            },
            
            // Housing inventory
            housingInventory: {
                totalUnits: 70000 + Math.round(randomFactor * 30000),
                occupied: 62000 + Math.round(randomFactor * 25000),
                owners: 40000 + Math.round(randomFactor * 15000),
                ownerPercent: 65 - randomFactor * 10,
                renters: 22000 + Math.round(randomFactor * 10000),
                renterPercent: 35 + randomFactor * 10,
                vacant: 8000 + Math.round(randomFactor * 5000),
                forSale: 1500 + Math.round(randomFactor * 1000),
                forRent: 2500 + Math.round(randomFactor * 1500),
                otherVacant: 4000 + Math.round(randomFactor * 2500)
            },
            
            // Chart data
            employmentHistory: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Current'],
                employment: [
                    90000 + Math.round(randomFactor * 40000),
                    85000 + Math.round(randomFactor * 38000),
                    88000 + Math.round(randomFactor * 40000),
                    91000 + Math.round(randomFactor * 42000),
                    93000 + Math.round(randomFactor * 45000),
                    95000 + Math.round(randomFactor * 47500)
                ],
                unemploymentRate: [
                    4 + randomFactor,
                    10 - randomFactor * 2,
                    7 - randomFactor,
                    6 - randomFactor,
                    5.5 - randomFactor,
                    5 - randomFactor
                ]
            },
            populationHistory: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Current'],
                population: [
                    161000 + Math.round(randomFactor * 55000),
                    162500 + Math.round(randomFactor * 56000),
                    163000 + Math.round(randomFactor * 57000),
                    163500 + Math.round(randomFactor * 58000),
                    164000 + Math.round(randomFactor * 59000),
                    165000 + Math.round(randomFactor * 60000)
                ],
                netMigration: [
                    500 + Math.round(randomFactor * 1000),
                    1000 + Math.round(randomFactor * 1500),
                    300 + Math.round(randomFactor * 700),
                    400 + Math.round(randomFactor * 800),
                    350 + Math.round(randomFactor * 750),
                    800 + Math.round(randomFactor * 1200)
                ]
            },
            buildingPermits: {
                labels: ['2019', '2020', '2021', '2022', '2023', 'Current'],
                singleFamily: [
                    800 + Math.round(randomFactor * 400),
                    600 + Math.round(randomFactor * 300),
                    900 + Math.round(randomFactor * 450),
                    950 + Math.round(randomFactor * 475),
                    850 + Math.round(randomFactor * 425),
                    750 + Math.round(randomFactor * 375)
                ],
                multiFamily: [
                    300 + Math.round(randomFactor * 200),
                    150 + Math.round(randomFactor * 100),
                    400 + Math.round(randomFactor * 250),
                    500 + Math.round(randomFactor * 300),
                    600 + Math.round(randomFactor * 350),
                    450 + Math.round(randomFactor * 275)
                ]
            }
        };
    }
}); 