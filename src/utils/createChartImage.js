const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

module.exports = async (timeData) => {
    const width = 800; // Define the image width
    const height = 600; // Define the image height
    const canvasRenderService = new ChartJSNodeCanvas({ width, height });

    // Define the chart configuration
    const configuration = {
        type: 'bar',
        data: {
            labels: Array.from({length: 24}, (_, i) => i + ' Uhr'),
            datasets: [{
                label: 'Number of Messages',
                data: timeData,
                backgroundColor: 'rgba(147, 97, 228, 0.5)',
                borderColor: 'rgba(147, 97, 228, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Create the chart image
    const image = await canvasRenderService.renderToBuffer(configuration);

    // Write the image to a file
    fs.writeFileSync('chart.png', image);
};