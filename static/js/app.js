// URL for jason
const url = "https://viassde.github.io/weather-dashboard/samples.json";

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);
// initialize
updatePlotly();

function updatePlotly() {

    var dropdownMenu = d3.select("#selDataset");
    var subjectId = dropdownMenu.property("value");

    // keep only the selected ID 
    function filterData(sample) {
        return sample.id === subjectId
    };

    // read json
    d3.json(url).then(function (data) {
        // console.log('all data (json):', data);

        var filteredData = data.samples.filter(filterData);
        // console.log('filteredData:', filteredData)

        var sampleValues = filteredData[0].sample_values.slice(0, 10);

        var otuIds = filteredData[0].otu_ids.slice(0, 10);
        //console.log('otuIds:', otuIds)

        var otuLabels = filteredData[0].otu_labels.slice(0, 10);
        //console.log('otuLabels', otuLabels)

        var trace1 = {
            y: String(otuIds),
            x: sampleValues,
            orientation: 'h',
            type: "bar"
        };
        var data1 = [trace1];
        var layout = {
            title: "Top 10 OTUs: Bar chart",
            height: 500,
            width: 1000
        };
        Plotly.newPlot("bar", data1, layout);

        //bubble
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: 'markers',
            marker: {
                size: sampleValues,
                color: otuIds
            }
        };
        var data2 = [trace2];
        var layout = {
            title: 'Top 10 OTUs: Bubble chart',
            xaxis: { title: { text: 'OTU ID' } },
            showlegend: false,
            height: 500,
            width: 1000
        };
        Plotly.newPlot('bubble', data2, layout);

    });
};
