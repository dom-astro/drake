document.getElementById('calcul').addEventListener('click', function(event) {
    event.preventDefault();

    const R_pessimiste = parseFloat(document.getElementById('R-pessimiste').value);
    const fp_pessimiste = parseFloat(document.getElementById('fp-pessimiste').value);
    const ne_pessimiste = parseFloat(document.getElementById('ne-pessimiste').value);
    const fl_pessimiste = parseFloat(document.getElementById('fl-pessimiste').value);
    const fi_pessimiste = parseFloat(document.getElementById('fi-pessimiste').value);
    const fc_pessimiste = parseFloat(document.getElementById('fc-pessimiste').value);
    const L_pessimiste = parseFloat(document.getElementById('L-pessimiste').value);

    const R_optimiste = parseFloat(document.getElementById('R-optimiste').value);
    const fp_optimiste = parseFloat(document.getElementById('fp-optimiste').value);
    const ne_optimiste = parseFloat(document.getElementById('ne-optimiste').value);
    const fl_optimiste = parseFloat(document.getElementById('fl-optimiste').value);
    const fi_optimiste = parseFloat(document.getElementById('fi-optimiste').value);
    const fc_optimiste = parseFloat(document.getElementById('fc-optimiste').value);
    const L_optimiste = parseFloat(document.getElementById('L-optimiste').value);

    const N_pessimiste = R_pessimiste * fp_pessimiste * ne_pessimiste * fl_pessimiste * fi_pessimiste * fc_pessimiste * L_pessimiste;
    const N_optimiste = R_optimiste * fp_optimiste * ne_optimiste * fl_optimiste * fi_optimiste * fc_optimiste * L_optimiste;

    document.getElementById('result').innerText = `Nombre estimé de civilisations: ${N_pessimiste.toFixed(2)} / ${N_optimiste.toFixed(2)}`;
});

$("#R").on('click', function(event) {
    show_variable('r');
});

$("#fp").on('click', function(event) {
    show_variable('fp');
});

$("#ne").on('click', function(event) {
    show_variable('ne');
});

$("#fl").on('click', function(event) {
    show_variable('fl');
});

$("#fi").on('click', function(event) {
    show_variable('fi');
});

$("#fc").on('click', function(event) {
    show_variable('fc');
});

$("#L").on('click', function(event) {
    show_variable('l');
});

function show_variable(varDrake) {
    showTime=1000;
    if ($("#explication-"+varDrake).is(':visible')) {
        showTime=0;
    }
    $(".explication").hide();
    $("#explication-"+varDrake).show(showTime);
}

$("#explication-n2").hide();

$("#n1").on('click', function(event) {
	$("#explication-n2").hide();
	$("#explication-r").show(500);
});


// Initialiser le graphique ECharts
var chartDom = document.getElementById('hr');
var myChart = echarts.init(chartDom);
var option;

$("#n2").on('click', function(event) {


// Données pour les types d'étoiles
var data = [
    { name: 'Type O', value: [30000, 6], symbolSize: 3, itemStyle: { color: '#ff0000' } },
    { name: 'Type B', value: [20000, 4], symbolSize: 6, itemStyle: { color: '#ff8000' } },
    { name: 'Type A', value: [10000, 3], symbolSize: 9, itemStyle: { color: '#ffff00' } },
    { name: 'Type F', value: [7000, 2], symbolSize: 12, itemStyle: { color: '#ffff80' } },
    { name: 'Type G', value: [5800, 1], symbolSize: 15, itemStyle: { color: '#ffffff' } },
    { name: 'Type K', value: [4500, -1], symbolSize: 18, itemStyle: { color: '#ffcc99' } },
    { name: 'Type M', value: [3000, -2], symbolSize: 21, itemStyle: { color: '#ff9999' } }
];

// Configuration du graphique
option = {
    title: {
        text: 'Diagramme de Hertzsprung-Russell',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + '<br>Température: ' + params.value[0] + ' K<br>Luminosité: ' + params.value[1] + ' L☉';
        }
    },
    xAxis: {
        type: 'value',
        name: 'Température de Surface (K)',
        scale: true,
        axisLabel: {
            formatter: '{value} K'
        },
        inverse: true
    },
    yAxis: {
        type: 'value',
        name: 'Luminosité (Soleil = 1)',
        scale: true,
        axisLabel: {
            formatter: '10^{value} L☉'
        }
    },
    series: [
        {
            type: 'scatter',
            data: data,
            symbolSize: function (data) {
                return data[2];
            },
            label: {
                show: true,
                formatter: '{b}',
                position: 'right'
            }
        }
    ]
};

// Utiliser la configuration pour rendre le graphique
myChart.setOption(option);

	$("#explication-r").hide();
	$("#explication-n2").show(500);
});
