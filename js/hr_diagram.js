// Diagramme de Hertzsprung-Russell - Code JS externalisé

// Fonction pour obtenir la couleur d'une étoile selon sa température
function getStarColor(temp) {
    if (temp > 30000) return '#9bb0ff'; // Bleu très clair (O)
    if (temp > 10000) return '#aabfff'; // Bleu clair (B)
    if (temp > 7500) return '#cad7ff';  // Bleu-blanc (A)
    if (temp > 6000) return '#f8f7ff';  // Blanc (F)
    if (temp > 5200) return '#fff4ea';  // Jaune-blanc (G)
    if (temp > 3700) return '#ffd2a1';  // Orange (K)
    return '#ffad51';                   // Rouge-orange (M)
}

// Fonction pour obtenir le type spectral selon la température
function getSpectralType(temp) {
    if (temp > 30000) return 'O';
    if (temp > 10000) return 'B';
    if (temp > 7500) return 'A';
    if (temp > 6000) return 'F';
    if (temp > 5200) return 'G';
    if (temp > 3700) return 'K';
    return 'M';
}

// Données d'étoiles réelles avec leurs propriétés
const stellarData = [
    // Séquence principale - Étoiles de type O et B (très chaudes)
    {name: 'Alnitak', temp: 29500, luminosity: 100000, mass: 33, type: 'Séquence principale'},
    {name: 'Mintaka', temp: 29500, luminosity: 90000, mass: 24, type: 'Séquence principale'},
    {name: 'Alnilam', temp: 27000, luminosity: 375000, mass: 40, type: 'Séquence principale'},
    {name: 'Spica', temp: 22400, luminosity: 20500, mass: 11, type: 'Séquence principale'},
    {name: 'Regulus', temp: 12460, luminosity: 288, mass: 3.8, type: 'Séquence principale'},
    {name: 'Bellatrix', temp: 21800, luminosity: 9211, mass: 8.6, type: 'Séquence principale'},
    // ... (reste des données inchangé)
    {name: 'Van Maanen 2', temp: 5800, luminosity: 0.00017, mass: 0.68, type: 'Naines blanches'},
];

// État des filtres
let spectralFilters = {
    'O': true, 'B': true, 'A': true, 'F': true, 
    'G': true, 'K': true, 'M': true
};
let stellarFilters = {
    'Séquence principale': true,
    'Géantes rouges': true,
    'Naines blanches': true,
    'Supergéantes': true
};

// Fonction pour filtrer les données
function filterData() {
    return stellarData.filter(star => {
        const spectralType = getSpectralType(star.temp);
        return spectralFilters[spectralType] && stellarFilters[star.type];
    });
}

// Fonction pour mettre à jour le graphique
function updateChart() {
    const filteredData = filterData();
    const newSeries = [];
    // Série pour la séquence principale
    const mainSequenceData = filteredData
        .filter(star => star.type === 'Séquence principale')
        .map(star => [star.temp, star.luminosity, star.mass, star.name]);
    if (mainSequenceData.length > 0) {
        newSeries.push({
            name: 'Séquence principale',
            type: 'scatter',
            symbolSize: function(data) {
                return Math.sqrt(data[2]) * 8 + 5;
            },
            data: mainSequenceData,
            itemStyle: {
                color: function(params) {
                    const temp = params.data[0];
                    return getStarColor(temp);
                },
                opacity: 0.9
            },
            emphasis: {
                itemStyle: {
                    opacity: 1,
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }
        });
    }
    // Autres séries
    Object.keys(colorMap).forEach(type => {
        const typeData = filteredData
            .filter(star => star.type === type)
            .map(star => [star.temp, star.luminosity, star.mass, star.name]);
        if (typeData.length > 0) {
            newSeries.push({
                name: type,
                type: 'scatter',
                symbolSize: function(data) {
                    return Math.sqrt(data[2]) * 8 + 5;
                },
                data: typeData,
                itemStyle: {
                    color: colorMap[type],
                    opacity: 0.8
                },
                emphasis: {
                    itemStyle: {
                        opacity: 1,
                        borderColor: '#fff',
                        borderWidth: 2
                    }
                }
            });
        }
    });
    chart.setOption({
        series: newSeries
    });
}

// Gestionnaires d'événements pour les filtres spectraux
document.addEventListener('DOMContentLoaded', function() {
    Object.keys(spectralFilters).forEach(type => {
        const checkbox = document.getElementById(`type-${type}`);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                spectralFilters[type] = this.checked;
                updateChart();
            });
        }
    });
    // Gestionnaires d'événements pour les filtres stellaires
    const stellarCheckboxes = {
        'main-sequence': 'Séquence principale',
        'red-giants': 'Géantes rouges',
        'white-dwarfs': 'Naines blanches',
        'supergiants': 'Supergéantes'
    };
    Object.keys(stellarCheckboxes).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                stellarFilters[stellarCheckboxes[id]] = this.checked;
                updateChart();
            });
        }
    });

    // Configuration des couleurs par type (conservé pour les autres types)
    window.colorMap = {
        'Géantes rouges': '#ff6b6b',
        'Supergéantes': '#ff8b94',
        'Naines blanches': '#ffe66d'
    };

    // Préparation initiale des données pour ECharts
    const series = [];
    // Série spéciale pour la séquence principale avec couleurs réalistes
    series.push({
        name: 'Séquence principale',
        type: 'scatter',
        symbolSize: function(data) {
            return Math.sqrt(data[2]) * 8 + 5; // Taille basée sur la masse
        },
        data: stellarData
            .filter(star => star.type === 'Séquence principale')
            .map(star => [star.temp, star.luminosity, star.mass, star.name]),
        itemStyle: {
            color: function(params) {
                const temp = params.data[0];
                return getStarColor(temp);
            },
            opacity: 0.9
        },
        emphasis: {
            itemStyle: {
                opacity: 1,
                borderColor: '#fff',
                borderWidth: 2
            }
        }
    });
    // Autres séries avec couleurs fixes
    Object.keys(window.colorMap).forEach(type => {
        series.push({
            name: type,
            type: 'scatter',
            symbolSize: function(data) {
                return Math.sqrt(data[2]) * 8 + 5;
            },
            data: stellarData
                .filter(star => star.type === type)
                .map(star => [star.temp, star.luminosity, star.mass, star.name]),
            itemStyle: {
                color: window.colorMap[type],
                opacity: 0.8
            },
            emphasis: {
                itemStyle: {
                    opacity: 1,
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }
        });
    });
    // Configuration du graphique
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: 'Diagramme de Hertzsprung-Russell',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ffffff',
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                const [temp, luminosity, mass, name] = params.data;
                const spectralType = getSpectralType(temp);
                return `
                    <div style="padding: 10px;">
                        <strong>${name}</strong><br/>
                        Type spectral: ${spectralType}<br/>
                        Température: ${temp.toLocaleString()} K<br/>
                        Luminosité: ${luminosity.toLocaleString()} L☉<br/>
                        Masse: ${mass} M☉<br/>
                        Classe: ${params.seriesName}
                    </div>
                `;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#333',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'log',
            name: 'Température de surface (K)',
            nameLocation: 'middle',
            nameGap: 30,
            inverse: true, // Inverse pour avoir les étoiles chaudes à gauche
            min: 2500,
            max: 50000,
            axisLabel: {
                color: '#cccccc',
                formatter: function(value) {
                    return value.toLocaleString();
                }
            },
            nameTextStyle: {
                color: '#cccccc',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#555'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#333'
                }
            }
        },
        yAxis: {
            type: 'log',
            name: 'Luminosité (L☉)',
            nameLocation: 'middle',
            nameGap: 50,
            min: 0.00001,
            max: 500000,
            axisLabel: {
                color: '#cccccc',
                formatter: function(value) {
                    if (value >= 1) {
                        return value.toLocaleString();
                    } else {
                        return value.toExponential(1);
                    }
                }
            },
            nameTextStyle: {
                color: '#cccccc',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#555'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#333'
                }
            }
        },
        series: series,
        legend: {
            show: false // Masqué car nous avons notre propre légende
        },
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
    };
    // Initialisation du graphique
    window.chart = echarts.init(document.getElementById('chart'));
    window.chart.setOption(option);
    // Responsivité
    window.addEventListener('resize', function() {
        window.chart.resize();
    });
}); 