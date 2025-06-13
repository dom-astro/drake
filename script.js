// Cache des sélecteurs jQuery fréquemment utilisés
const $inputSwitch = $('.input-switch');
const $pessimiste = $('.pessimiste');
const $optimiste = $('.optimiste');
const $explication = $('.explication');

// Gestion des interrupteurs pour activer/désactiver les variables
$inputSwitch.on("change", function() {
    const $this = $(this);
    const isChecked = $this.prop('checked');
    if(isChecked) {
        const id = $this.attr('id').replace("toggleSwitch-", "");
        show_variable(id);
        enabledVar(id);
    }

    // Désactive tous les autres interrupteurs sauf celui sélectionné
    $inputSwitch.prop('checked', false);
    $this.prop('checked', isChecked);
});

// Active par défaut la variable R au chargement
enabledVar("r");

// Fonction pour activer/désactiver les champs de saisie optimiste et pessimiste
function enabledVar(id) {
    // Désactive tous les champs de saisie
    $pessimiste.prop('disabled', true);
    $optimiste.prop('disabled', true);
    // Active uniquement les champs correspondant à la variable sélectionnée
    $(`#${id}-pessimiste`).prop('disabled', false);
    $(`#${id}-optimiste`).prop('disabled', false);    
}

// Constantes pour la validation
const VALIDATION_RULES = {
    'R': { min: 0, max: 1000 },
    'fp': { min: 0, max: 1 },
    'ne': { min: 0, max: 10 },
    'fl': { min: 0, max: 1 },
    'fi': { min: 0, max: 1 },
    'fc': { min: 0, max: 1 },
    'L': { min: 0, max: 10000 },
    'A': { min: 1, max: 100 }
};

// Fonction de validation des entrées
function validateInput(value, type) {
    const rules = VALIDATION_RULES[type];
    if (!rules) return true;
    
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= rules.min && numValue <= rules.max;
}

// Gestionnaire d'événement pour le calcul de l'équation de Drake
$('#calcul').on('click', function(event) {
    event.preventDefault();
    
    try {
        // Objet pour stocker les valeurs
        const values = {
            pessimiste: {},
            optimiste: {}
        };
        
        // Liste des variables à valider
        const variables = ['R', 'fp', 'ne', 'fl', 'fi', 'fc', 'L', 'A'];
        
        // Validation et récupération des valeurs
        for (const variable of variables) {
            for (const scenario of ['pessimiste', 'optimiste']) {
                const elementId = `${variable.toLowerCase()}-${scenario}`;
                const value = $(`#${elementId}`).val();
                
                if (!validateInput(value, variable)) {
                    throw new Error(`Valeur invalide pour ${variable} (${scenario})`);
                }
                
                values[scenario][variable] = parseFloat(value);
            }
        }
        
        // Calcul pour chaque scénario
        const results = {};
        for (const scenario of ['pessimiste', 'optimiste']) {
            const v = values[scenario];
            results[scenario] = (v.R * v.fp * v.ne * v.fl * v.fi * v.fc * v.L * 100) / v.A;
        }
        
        // Affichage des résultats avec formatage
        $('#result').html(
            `Nombre estimé de civilisations:<br>
            Scénario pessimiste: ${results.pessimiste.toLocaleString(undefined, {maximumFractionDigits: 2})}<br>
            Scénario optimiste: ${results.optimiste.toLocaleString(undefined, {maximumFractionDigits: 2})}`
        );
            
    } catch (error) {
        $('#result').html(
            `<span style="color: red">Erreur: ${error.message}</span>`
        );
    }
});

// Fonction pour afficher les explications des variables
function show_variable(varDrake) {
    const $targetExplication = $(`#explication-${varDrake}`);
    const showTime = $targetExplication.is(':visible') ? 0 : 1000;
    
    // Cache toutes les explications et affiche celle de la variable sélectionnée
    $explication.hide();
    $targetExplication.show(showTime);
}

// Cache l'explication n2 par défaut
$("#explication-n2").hide();

// Gestion des boutons de navigation entre les explications
$("#n1").on('click', function(event) {
    $("#explication-n2").hide();
    $("#explication-r").show(500);
});

// Configuration du diagramme de Hertzsprung-Russell
var chartDom = document.getElementById('hr');
var myChart = echarts.init(chartDom);
var option;

$("#n2").on('click', function(event) {

// Définition des données pour les différents types d'étoiles
var data = [
    { name: 'Type O', value: [30000, 6], symbolSize: 3, itemStyle: { color: '#ff0000' } }, // Étoiles très chaudes et lumineuses
    { name: 'Type B', value: [20000, 4], symbolSize: 6, itemStyle: { color: '#ff8000' } },
    { name: 'Type A', value: [10000, 3], symbolSize: 9, itemStyle: { color: '#ffff00' } },
    { name: 'Type F', value: [7000, 2], symbolSize: 12, itemStyle: { color: '#ffff80' } },
    { name: 'Type G', value: [5800, 1], symbolSize: 15, itemStyle: { color: '#ffffff' } }, // Type solaire
    { name: 'Type K', value: [4500, -1], symbolSize: 18, itemStyle: { color: '#ffcc99' } },
    { name: 'Type M', value: [3000, -2], symbolSize: 21, itemStyle: { color: '#ff9999' } } // Étoiles froides et peu lumineuses
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
        name: '',
        scale: true,
        axisLabel: {
            formatter: '{value} K'
        },
        inverse: true,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
    },
    yAxis: {
        type: 'value',
        name: 'Luminosité Soleil',
        min: -3,
        scale: true,
        axisLabel: {
            formatter: '10^{value} L☉'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
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
        },
        {
          name: 'line',
          type: 'line',
          smooth: true,
          datasetIndex: function (data) {
            return data[1][0];
        },
          symbolSize: 0.1,
          symbol: 'circle',
          label: { show: true, fontSize: 16 },
          labelLayout: { dx: -20 },
          encode: { label: 2, tooltip: 1 }
        }
    ]
};

// Utiliser la configuration pour rendre le graphique
myChart.setOption(option);

    $("#explication-r").hide();
    $("#explication-n2").show(500);
});

// Gestion de la popup DSFR
$(function() {
    const $modal = $('#modal-besancon');
    const $link = $('a[aria-controls="modal-besancon"]');
    const $closeButton = $('.fr-btn--close');
    
    // Ouvrir la popup
    $link.on('click', function(e) {
        e.preventDefault();
        $modal.attr('aria-hidden', 'false');
        $('body').css('overflow', 'hidden');
    });
    
    // Fermer la popup en cliquant en dehors
    $modal.on('click', function(e) {
        if (e.target === $modal[0]) {
            closeModal();
        }
    });
    
    // Fermer la popup avec le bouton de fermeture
    if ($closeButton.length) {
        $closeButton.on('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    // Fermer la popup avec la touche Escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $modal.attr('aria-hidden') === 'false') {
            closeModal();
        }
    });

    // Fonction pour fermer la popup
    function closeModal() {
        $modal.attr('aria-hidden', 'true');
        $('body').css('overflow', '');
    }
});

const drakeText = "L'équation de Drake est une formule utilisée pour estimer le nombre de civilisations extraterrestres dans notre galaxie, la Voie lactée, dont nous pourrions détecter les signaux. Elle a été développée par l'astronome Frank Drake en 1961. Alors jeune astronome, il proposa sa formule pour justifier sa tentative de détection avec le programme SETI.";
let typing = false;
$(function() {
    const $h1 = $('h1');
    const $h3 = $('#drake-typer');
    $h1.css('cursor', 'pointer');
    $h1.on('click', function() {
        if (typing) return;
        typing = true;
        $h3.text("");
        let i = 0;
        function typeWriter() {
            if (i < drakeText.length) {
                $h3.text($h3.text() + drakeText.charAt(i));
                i++;
                setTimeout(typeWriter, 25);
            } else {
                typing = false;
            }
        }
        typeWriter();
        typing = true;
    });
});
