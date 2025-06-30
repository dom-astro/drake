let formatter = new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

// Données des termes de l'équation de Drake
const drakeTerms = {
    'R_star': {
        name: 'R*',
        title: 'Taux de formation stellaire',
        description: 'Le taux moyen de formation d\'étoiles dans notre galaxie',
        details: `
            <h4><i class="fas fa-star"></i> Taux de formation stellaire (R*)</h4>
            <p>
                Ce paramètre est une simplification qui représente le nombre d'étoiles qui se forment en moyenne chaque année.
                Pour mieux le conceptualiser, on peut l'estimer comme le <strong>nombre total d'étoiles dans la galaxie (N*)</strong> divisé par son <strong>âge (Ag)</strong>.
            </p>
            <p>
                <strong>R* = N* / Ag</strong>
            </p>

            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Nombre d'étoiles (N*) :</strong> Les estimations, basées sur des missions comme <span class="besancon-link" onclick="showHipparcosModal()">Hipparcos</span> et <span class="besancon-link" onclick="showGaiaModal()">Gaia</span>, varient de 100 à 400 milliards d'étoiles.</li>
                <li><strong>Âge de la galaxie (Ag) :</strong> L'âge de la Voie lactée est estimé principalement grâce à la datation des plus vieilles étoiles et des <span class="besancon-link" onclick="showGlobularClustersModal()">amas globulaires</span> qui la composent. Les plus vieux amas globulaires connus ont un âge d'environ 13,2 milliards d'années, ce qui donne une estimation minimale pour l'âge de la galaxie.</li>
                <li><strong>Modèle de référence :</strong> Le <span class="besancon-link" onclick="showBesanconModal()">modèle de la galaxie de Besançon</span> aide à affiner ces estimations en simulant l'évolution de la galaxie.</li>
            </ul>
        `,
        type: 'computed', // Indique un calcul spécial
        unit: 'étoiles/an',
        sub_params: {
            'N_star': {
                title: 'N*: Nombre d\'étoiles',
                pessimistic: 1e11, // 100 milliards
                optimistic: 4e11,  // 400 milliards
                unit: 'milliards d\'étoiles'
            },
            'Ag': {
                title: 'Ag: Âge de la galaxie',
                pessimistic: 14e9, // 14 milliards d'années
                optimistic: 13e9,   // 13 milliards d'années
                unit: 'milliards d\'années'
            }
        }
    },
    'f_p': {
        name: 'fp',
        title: 'Fraction d\'étoiles avec planètes',
        description: 'La fraction d\'étoiles qui possèdent des systèmes planétaires',
        details: `
            <h4><i class="fas fa-globe"></i> Fraction d'étoiles avec planètes (fp)</h4>
            <p>Quelle proportion d'étoiles possède des planètes en orbite ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Télescopes spatiaux :</strong> Les télescopes spatiaux tels que <span class="besancon-link" onclick="showCorotModal()">Corot</span>, <span class="besancon-link" onclick="showKeplerModal()">Kepler</span> et bientôt l'<span class="besancon-link" onclick="showHabitableWorldsModal()">Observatoire des mondes habitables</span> ont révolutionné la chasse aux exoplanètes</li>
                <li><strong>Statistiques actuelles :</strong> Plus de 90% des étoiles semblables au Soleil ont des planètes</li>
                <li><strong>Diversité des systèmes :</strong> Jupiter chauds, super-Terre, mini-Neptune</li>
                <li><strong>Méthodes de détection :</strong> <span class="besancon-link" onclick="showTransitModal()">Transits</span>, <span class="besancon-link" onclick="showRadialVelocityModal()">vitesses radiales</span>, <span class="besancon-link" onclick="showMicrolensingModal()">microlentilles gravitationnelles</span>, <span class="besancon-link" onclick="showDirectImagingModal()">imagerie directe</span></li>
            </ul>
            
            <h5>Découvertes récentes :</h5>
            <p>Les planètes sont extrêmement communes. Presque toutes les étoiles ont au moins une planète, mais la question est de savoir combien ont des planètes habitables.</p>
        `,
        pessimistic: 0.2,
        optimistic: 1.0,
        unit: 'étoile'
    },
    'n_e': {
        name: 'ne',
        title: 'Planètes habitables par système',
        description: 'Le nombre moyen de planètes par système stellaire qui pourraient abriter la vie',
        details: `
            <h4><i class="fas fa-leaf"></i> Planètes habitables par système (ne)</h4>
            <p>Combien de planètes par système stellaire se trouvent dans la "zone habitable" ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Zone Boucle d'or :</strong> Distance optimale où l'eau liquide peut exister</li>
                <li><strong>Facteurs complexes :</strong> Atmosphère, effet de serre, activité tectonique</li>
                <li><strong>Exemples prometteurs :</strong> Kepler-452b, Proxima Centauri b, TRAPPIST-1</li>
                <li><strong>Habitabilité élargie :</strong> Lunes de géantes gazeuses, océans sous-glaciaires</li>
            </ul>
            
            <h5>Complexité de l'habitabilité :</h5>
            <p>L'habitabilité dépend de nombreux facteurs : type d'étoile, composition atmosphérique, présence d'un champ magnétique, stabilité orbitale, et interactions gravitationnelles.</p>
        `,
        pessimistic: 0.01,
        optimistic: 2.0,
        unit: 'planètes'
    },
    'f_l': {
        name: 'fl',
        title: 'Fraction avec vie',
        description: 'La fraction de planètes habitables où la vie apparaît effectivement',
        details: `
            <h4><i class="fas fa-dna"></i> Fraction avec vie (fl)</h4>
            <p>Sur les planètes habitables, quelle proportion développe réellement la vie ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Origine de la vie :</strong> Encore largement mystérieuse malgré les progrès</li>
                <li><strong>Expériences de laboratoire :</strong> Synthèse de molécules organiques complexes (expérience de Mildred)</li>
                <li><strong>Environnements extrêmes :</strong> Vie dans des conditions extrêmes sur Terre</li>
                <li><strong>Signatures biologiques :</strong> Recherche de biosignatures dans les atmosphères</li>
                <li><strong>Premiers indices :</strong> En utilisant la méthode des transits, on arrive à ectraire la signature de l'atmosphère de certaines exoplanètes</li>
            </ul>
            
            <h5>Hypothèses scientifiques :</h5>
            <p>Certains pensent que la vie émerge facilement (principe de médiocrité), d'autres considèrent qu'elle est exceptionnellement rare (hypothèse de la Terre rare).</p>
        `,
        pessimistic: 0.01,
        optimistic: 1.0,
        unit: ''
    },
    'f_i': {
        name: 'fi',
        title: 'Fraction avec intelligence',
        description: 'La fraction de planètes avec vie qui développent une vie intelligente',
        details: `
            <h4><i class="fas fa-brain"></i> Fraction avec intelligence (fi)</h4>
            <p>Parmi les planètes avec vie, combien développent une intelligence complexe ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Évolution de l'intelligence :</strong> Processus long et complexe sur Terre</li>
                <li><strong>Convergence évolutive :</strong> L'intelligence a évolué plusieurs fois indépendamment</li>
                <li><strong>Facteurs environnementaux :</strong> Climat, géographie, extinctions de masse</li>
                <li><strong>Définition de l'intelligence :</strong> Capacité de manipulation d'outils, communication complexe</li>
            </ul>
            
            <h5>Débats scientifiques :</h5>
            <p>L'intelligence est-elle un aboutissement inévitable de l'évolution ou un accident statistique ? Les extinctions de masse favorisent-elles ou entravent-elles l'émergence de l'intelligence ?</p>
        `,
        pessimistic: 0.01,
        optimistic: 0.5,
        unit: ''
    },
    'f_c': {
        name: 'fc',
        title: 'Fraction communicante',
        description: 'La fraction de civilisations intelligentes qui développent des technologies de communication',
        details: `
            <h4><i class="fas fa-satellite-dish"></i> Fraction communicante (fc)</h4>
            <p>Quelle proportion de civilisations intelligentes développe des technologies radio ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Développement technologique :</strong> Sur Terre, rapide développement au 20ème siècle</li>
                <li><strong>Motivation à communiquer :</strong> Curiosité scientifique, désir de contact</li>
                <li><strong>Contraintes techniques :</strong> Ressources, stabilité sociale, priorités civilisationnelles</li>
                <li><strong>Fenêtre technologique :</strong> Durée pendant laquelle une civilisation émet des signaux détectables</li>
            </ul>
            
            <h5>Considérations modernes :</h5>
            <p>Les civilisations avancées pourraient utiliser des technologies de communication que nous ne pouvons pas détecter. L'évolution vers des communications plus efficaces pourrait les rendre "silencieuses" pour nous.</p>
        `,
        pessimistic: 0.01,
        optimistic: 1.0,
        unit: ''
    },
    'L': {
        name: 'L',
        title: 'Durée de vie communicante',
        description: 'La durée pendant laquelle une civilisation émet des signaux détectables',
        details: `
            <h4><i class="fas fa-hourglass-half"></i> Durée de vie communicante (L)</h4>
            <p>Combien de temps une civilisation reste-t-elle détectable par ses émissions ?</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Exemple terrestre :</strong> Environ 100 ans d'émissions radio intenses</li>
                <li><strong>Facteurs de survie :</strong> Guerres, catastrophes naturelles, changement climatique</li>
                <li><strong>Évolution technologique :</strong> Passage à des communications plus directionnelles</li>
                <li><strong>Filtre de survie :</strong> Capacité à surmonter les crises existentielles</li>
            </ul>
            
            <h5>Scénarios possibles :</h5>
            <p>Auto-destruction rapide, évolution vers des technologies indétectables, expansion interstellaire, ou survie très longue avec émissions continues. Ce paramètre est probablement le plus incertain de tous.</p>
        `,
        pessimistic: 100,
        optimistic: 10000,
        unit: 'années'
    }
};

let currentValues = {};

// Initialisation
$(document).ready(function() {
    initializeValues();
    generateTermCards();
    // Animation intro
    typewriterIntro();

    // Retour à l'intro au clic sur la fusée
    $(document).on('click', '#back-to-intro', function() {
        $('#main-content').fadeOut(400, function() {
            // Réinitialise l'affichage de l'intro
            $("#intro-overlay").fadeIn(400);
            // Réinitialise la formule
            const element = document.getElementById('intro-equation');
            element.innerHTML = '';
            element.onclick = null;
            typewriterIntro();
        });
    });

    $("#titre-equation-drake").css("cursor", "pointer");
    $("#titre-equation-drake").on("click", function() {
        $("#intro-overlay").fadeOut(400, function() {
            $('#main-content').fadeIn(400);
        });
    });
});

function generateTermCards() {
    const grid = $('#terms-grid');
    grid.empty();
    
    Object.keys(drakeTerms).forEach(termId => {
        const term = drakeTerms[termId];

        // Calcul de R* si nécessaire
        if (term.type === 'computed') {
            term.pessimistic = term.sub_params.N_star.pessimistic / term.sub_params.Ag.pessimistic;
            term.optimistic = term.sub_params.N_star.optimistic / term.sub_params.Ag.optimistic;
        }

        // Affichage en pourcentage si l'unité est vide
        let pessValue = term.pessimistic;
        let optiValue = term.optimistic;
        let pessUnit = term.unit;
        let optiUnit = term.unit;
        if (!term.unit) {
            pessValue = (term.pessimistic * 100).toFixed(1).replace(/\.0$/, '');
            optiValue = (term.optimistic * 100).toFixed(1).replace(/\.0$/, '');
            pessUnit = optiUnit = '%';
        } else {
             // Affichage formaté pour les grands nombres R*
            if (termId === 'R_star') {
                pessValue = formatter.format(pessValue);
                optiValue = formatter.format(optiValue);
            }
        }
        const card = `
            <div class="col-12 mb-3">
                <div class="card term-card h-100" onclick="${term.type === 'computed' ? 'showRStarDetail' : 'showTermDetail'}('${termId}')">
                    <div class="card-body text-center">
                        <h6 class="card-title">${term.name}</h6>
                        <small class="text-muted">${term.title}</small>
                        <div class="term-card-value mt-2">
                            <div class="text-danger small display-term">
                                <i class="fas fa-frown"></i> ${pessValue} ${pessUnit}
                            </div>
                            <div class="text-success small display-term">
                                <i class="fas fa-smile"></i> ${optiValue} ${optiUnit}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.append(card);
    });
}

function initializeValues() {
    Object.keys(drakeTerms).forEach(termId => {
        currentValues[termId] = drakeTerms[termId].pessimistic;
    });
}

function updateTermCards() {
    generateTermCards();
}

function showIntroduction() {
    // Réinitialiser les cartes
    $('.term-card').removeClass('active-term');
    
    $('#term-details').hide();
    $('#welcome-screen').show();
}

function showTermDetail(termId, type='pessimistic') {
    // Réinitialiser les cartes
    $('.term-card').removeClass('active-term');
    $(`[onclick="showTermDetail('${termId}')"]`).addClass('active-term');
    
    $('#welcome-screen').hide();
    $('#term-details').show();
    
    const term = drakeTerms[termId];
    // Affichage en pourcentage si l'unité est vide
    const isPercent = !term.unit;
    let currentValueFormatted, pessValueFormatted, optiValueFormatted;
    let unitFormatted = term.unit || ' %';

    if (isPercent) {
        const formatPercent = (val) => (val * 100).toFixed(1).replace(/\.0$/, '');
        currentValueFormatted = formatPercent(currentValues[termId]);
        pessValueFormatted = formatPercent(term.pessimistic);
        optiValueFormatted = formatPercent(term.optimistic);
    } else {
        currentValueFormatted = currentValues[termId];
        pessValueFormatted = term.pessimistic;
        optiValueFormatted = term.optimistic;
    }

    // Définir l'incrément selon le paramètre
    let increment = 0.01;
    if (term.unit === 'étoiles/an' || term.unit === 'années') increment = 1;
    else if (term.unit === 'planètes') increment = 0.01;
    else if (term.unit === 'étoile') increment = 0.01;
    else if (term.unit === '' || isPercent) increment = 0.01;
    else if (term.unit === 'milliards d\'étoiles' || term.unit === 'milliards d\'années') increment = 1e9;

    const detailHtml = `
        <div class="term-detail">
            ${term.details}
            
            <div class="current-value-display current-value-${type}">
                <h5><i class="fas fa-check-circle"></i> Valeur actuelle sélectionnée</h5>
                <h3>${currentValueFormatted}${unitFormatted}</h3>
            </div>
            
            <div class="value-selector">
                <h5><i class="fas fa-sliders-h"></i> Ajustez les bornes pessimiste et optimiste :</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card ${currentValues[termId] === term.pessimistic ? 'border-danger bg-light' : ''}" style="cursor: pointer;" onclick="setValue('${termId}', ${term.pessimistic}, 'pessimistic')">
                            <div class="card-body text-center">
                                <h6 class="text-danger"><i class="fas fa-frown"></i> Pessimiste</h6>
                                <div class="d-flex align-items-center justify-content-center mb-2">
                                    <button class="btn btn-outline-danger btn-sm me-2" onclick="event.stopPropagation(); adjustParamBound('${termId}', 'pessimistic', -${increment})"><i class="fas fa-minus"></i></button>
                                    <span style="font-size:1.2em;font-weight:bold;min-width:70px;display:inline-block;text-align:center;">${pessValueFormatted}${unitFormatted}</span>
                                    <button class="btn btn-outline-danger btn-sm ms-2" onclick="event.stopPropagation(); adjustParamBound('${termId}', 'pessimistic', ${increment})"><i class="fas fa-plus"></i></button>
                                </div>
                                <button class="btn ${currentValues[termId] === term.pessimistic ? 'btn-danger' : 'btn-outline-danger'}" type="button">
                                    ${currentValues[termId] === term.pessimistic ? 'Sélectionner' : 'Sélectionner'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card ${currentValues[termId] === term.optimistic ? 'border-success bg-light' : ''}" style="cursor: pointer;" onclick="setValue('${termId}', ${term.optimistic}, 'optimistic')">
                            <div class="card-body text-center">
                                <h6 class="text-success"><i class="fas fa-smile"></i> Optimiste</h6>
                                <div class="d-flex align-items-center justify-content-center mb-2">
                                    <button class="btn btn-outline-success btn-sm me-2" onclick="event.stopPropagation(); adjustParamBound('${termId}', 'optimistic', -${increment})"><i class="fas fa-minus"></i></button>
                                    <span style="font-size:1.2em;font-weight:bold;min-width:70px;display:inline-block;text-align:center;">${optiValueFormatted}${unitFormatted}</span>
                                    <button class="btn btn-outline-success btn-sm ms-2" onclick="event.stopPropagation(); adjustParamBound('${termId}', 'optimistic', ${increment})"><i class="fas fa-plus"></i></button>
                                </div>
                                <button class="btn ${currentValues[termId] === term.optimistic ? 'btn-success' : 'btn-outline-success'}" type="button">
                                    ${currentValues[termId] === term.optimistic ? 'Sélectionner' : 'Sélectionner'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#term-details').html(detailHtml);
}

function adjustParamBound(termId, bound, step) {
    const term = drakeTerms[termId];
    let value = term[bound];
    value += step;
    // Pour les pourcentages, ne pas dépasser 0-1
    if (!term.unit && (value < 0)) value = 0;
    // Ne pas croiser l'autre borne
    if (bound === 'pessimistic' && value > term.optimistic) value = term.optimistic;
    if (bound === 'optimistic' && value < term.pessimistic) value = term.pessimistic;
    // Arrondir selon le pas
    if (Math.abs(step) >= 1) value = Math.round(value);
    else if (Math.abs(step) >= 0.1) value = Math.round(value * 10) / 10;
    else if (Math.abs(step) >= 0.01) value = Math.round(value * 100) / 100;
    else value = Math.round(value * 1000) / 1000;
    term[bound] = value;
    // Si la valeur courante était sur la borne, la mettre à jour aussi
    if (currentValues[termId] === value - step) currentValues[termId] = value;
    updateTermCards();
    showTermDetail(termId, bound);
}

function setValue(termId, value, type) {
    currentValues[termId] = value;
    updateTermCards(); // Mettre à jour l'affichage des cartes
    showTermDetail(termId, type); // Rafraîchir l'affichage du détail
    
    // Petit feedback visuel pour le résultat
    $('#result-value').html('Cliquez sur Calcul');
    $('.result-display').addClass('border border-warning');
    setTimeout(() => {
        $('.result-display').removeClass('border border-warning');
    }, 1000);
}

function calculateResult() {
    // S'assurer que R* est calculé avant le reste
    if (drakeTerms['R_star'].type === 'computed') {
        currentValues['R_star'] = (currentValues.N_star || drakeTerms.R_star.sub_params.N_star.pessimistic) / 
                                  (currentValues.Ag || drakeTerms.R_star.sub_params.Ag.pessimistic);
    }

    let resultPessimistic = 1
      , resultOptimistic = 1;
    Object.keys(drakeTerms).forEach(termId => {
        resultPessimistic *= drakeTerms[termId].pessimistic;
        resultOptimistic *= drakeTerms[termId].optimistic;
    });

    // Formater le résultat selon sa taille
    let formattedResultP, formattedResultO;
    if (resultPessimistic >= 1000000) {
        formattedResultP = (resultPessimistic / 1000000).toFixed(0) + 'M';
    } else if (resultPessimistic >= 1000) {
        formattedResultP = (resultPessimistic / 1000).toFixed(0) + 'K';
    } else if (resultPessimistic >= 1) {
        formattedResultP = resultPessimistic.toFixed(0);
    } else if (resultPessimistic >= 0.01) {
        formattedResultP = resultPessimistic.toFixed(3);
    } else {
        formattedResultP = resultPessimistic.toFixed(0);
    }
    if (resultOptimistic >= 1000000) {
        formattedResultO = (resultOptimistic / 1000000).toFixed(0) + 'M';
    } else if (resultOptimistic >= 1000) {
        formattedResultO = (resultOptimistic / 1000).toFixed(0) + 'K';
    } else if (resultOptimistic >= 1) {
        formattedResultO = resultOptimistic.toFixed(0);
    } else if (resultOptimistic >= 0.01) {
        formattedResultO = resultOptimistic.toFixed(3);
    } else {
        formattedResultO = resultOptimistic.toFixed(0);
    }
    
    $('#result-value-pessimistic').html("Valeur pessimiste: "+ formatter.format(resultPessimistic.toFixed(0)));
    $('#result-value-optimistic').html("Valeur optimiste: "+ formatter.format(resultOptimistic.toFixed(0)));
    
    // Animation du résultat
    $('.result-display').addClass('animate__animated animate__pulse');
    setTimeout(() => {
        $('.result-display').removeClass('animate__animated animate__pulse');
    }, 1000);
}

function showBesanconModal() {
    $("#besanconModal").modal("show");
};

function showGaiaModal() {
    $("#gaiaModal").modal("show");
};

function showHipparcosModal() {
    $("#hipparcosModal").modal("show");
};

function showKeplerModal() {
    $("#keplerModal").modal("show");
};

function showCorotModal() {
    $("#corotModal").modal("show");
};

function showHabitableWorldsModal() {
    $("#habitableWorldsModal").modal("show");
};

function showTransitModal() {
    $("#transitModal").modal("show");
};

function showRadialVelocityModal() {
    $("#radialVelocityModal").modal("show");
};

function showMicrolensingModal() {
    $("#microlensingModal").modal("show");
};

function showDirectImagingModal() {
    $("#directImagingModal").modal("show");
};

function showGlobularClustersModal() {
    $("#globularClustersModal").modal("show");
}

function typewriterIntro() {
    const equation = "N = R* × f<sub>p</sub> × n<sub>e</sub> × f<sub>l</sub> × f<sub>i</sub> × f<sub>c</sub> × L";
    const terms = [
        { key: 'R*', def: "<b>R*</b> : Taux de formation d'étoiles dans la galaxie (par an)" },
        { key: 'f<sub>p</sub>', def: "<b>f<sub>p</sub></b> : Fraction d'étoiles possédant des planètes" },
        { key: 'n<sub>e</sub>', def: "<b>n<sub>e</sub></b> : Nombre moyen de planètes habitables par étoile" },
        { key: 'f<sub>l</sub>', def: "<b>f<sub>l</sub></b> : Fraction de planètes habitables où la vie apparaît" },
        { key: 'f<sub>i</sub>', def: "<b>f<sub>i</sub></b> : Fraction de planètes avec vie où la vie devient intelligente" },
        { key: 'f<sub>c</sub>', def: "<b>f<sub>c</sub></b> : Fraction de civilisations intelligentes capables de communiquer" },
        { key: 'L', def: "<b>L</b> : Durée de vie moyenne d'une civilisation communicante (en années)" }
    ];
    const element = document.getElementById('intro-equation');
    const defsContainer = document.getElementById('intro-defs');
    defsContainer.innerHTML = '';
    let index = 0;
    let currentText = "";
    let termIndex = 0;
    // Pour détecter la fin d'un terme
    const termOrder = [
        'R*', 'f<sub>p</sub>', 'n<sub>e</sub>', 'f<sub>l</sub>', 'f<sub>i</sub>', 'f<sub>c</sub>', 'L'
    ];
    function typeChar() {
        if (index < equation.length) {
            const char = equation.charAt(index);
            if (char === '<') {
                let tagEnd = equation.indexOf('>', index);
                if (tagEnd !== -1) {
                    const tag = equation.substring(index, tagEnd + 1);
                    currentText += tag;
                    index = tagEnd + 1;
                } else {
                    currentText += char;
                    index++;
                }
            } else {
                currentText += char;
                index++;
            }
            element.innerHTML = currentText + '<span class="cursor">|</span>';
            // Vérifie si on vient de finir un terme
            if (termIndex < termOrder.length) {
                // On regarde si le terme complet vient d'être écrit
                let lastTerm = termOrder[termIndex];
                // On retire les espaces pour la comparaison
                let cleanCurrent = currentText.replace(/\s/g, '');
                let cleanTerm = lastTerm.replace(/\s/g, '');
                // On cherche la dernière occurrence du terme
                if (cleanCurrent.endsWith(cleanTerm)) {
                    // Affiche la définition correspondante
                    defsContainer.innerHTML += `<div style='margin-bottom:0.5em;animation:fadein 0.7s;'>${terms[termIndex].def}</div>`;
                    // Supprime l'animation une fois terminée
                    const lastDef = defsContainer.lastElementChild;
                    if (lastDef) {
                        lastDef.addEventListener('animationend', function() {
                            lastDef.style.animation = '';
                        }, { once: true });
                    }
                    termIndex++;
                }
            }
            setTimeout(typeChar, 240);
        } else {
            element.innerHTML = currentText + '<span class="cursor">|</span>';
            // Ajout du clic sur la formule
            element.style.cursor = 'pointer';
            element.onclick = function() {
                $("#intro-overlay").fadeOut(400, function() {
                    $('#main-content').fadeIn(400);
                });
            };
        }
    }
    setTimeout(typeChar, 800);
}

// Animation d'apparition douce pour les définitions
if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `@keyframes fadein { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none;} }`;
    document.head.appendChild(style);
}

function showRStarDetail(termId) {
    // Activer la carte
    $('.term-card').removeClass('active-term');
    $(`[onclick="showRStarDetail('${termId}')"]`).addClass('active-term');
    
    $('#welcome-screen').hide();
    $('#term-details').show();

    const term = drakeTerms[termId];
    const N_star = term.sub_params.N_star;
    const Ag = term.sub_params.Ag;

    // Récupérer les valeurs sélectionnées ou les valeurs par défaut (pessimistes)
    currentValues.N_star = currentValues.N_star || N_star.pessimistic;
    currentValues.Ag = currentValues.Ag || Ag.pessimistic;

    // Calculer R* actuel
    currentValues['R_star'] = currentValues.N_star / currentValues.Ag;

    // Incréments
    const nstarStep = 1e10;
    const agStep = 1e8;

    const detailHtml = `
        <div class="term-detail">
            ${term.details}
            
            <div class="current-value-display current-value-pessimistic">
                <h5><i class="fas fa-check-circle"></i> Valeur actuelle calculée pour R*</h5>
                <h3>${formatter.format(currentValues['R_star'])} ${term.unit}</h3>
            </div>
            
            <div class="value-selector">
                <h5><i class="fas fa-sliders-h"></i> Ajustez les bornes pessimiste et optimiste pour N* et Ag :</h5>
                
                <!-- Sélecteur pour N* -->
                <div class="mt-3">
                    <h6>${N_star.title}</h6>
                    <div class="row align-items-center mb-2">
                        <div class="col-md-6">
                            <div class="card ${currentValues.N_star === N_star.pessimistic ? 'border-danger bg-light' : ''}" style="cursor: pointer;" onclick="setSubParamValue('R_star', 'N_star', ${N_star.pessimistic})">
                                <div class="card-body text-center">
                                    <h6 class="text-danger"><i class="fas fa-frown"></i> Pessimiste</h6>
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <button class="btn btn-outline-danger btn-sm me-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'N_star', 'pessimistic', -${nstarStep})"><i class="fas fa-minus"></i></button>
                                        <span style="font-size:1.1em;font-weight:bold;min-width:90px;display:inline-block;text-align:center;">${(N_star.pessimistic / 1e9).toLocaleString('fr-FR', {maximumFractionDigits:2})} ${N_star.unit}</span>
                                        <button class="btn btn-outline-danger btn-sm ms-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'N_star', 'pessimistic', ${nstarStep})"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card ${currentValues.N_star === N_star.optimistic ? 'border-success bg-light' : ''}" style="cursor: pointer;" onclick="setSubParamValue('R_star', 'N_star', ${N_star.optimistic})">
                                <div class="card-body text-center">
                                    <h6 class="text-success"><i class="fas fa-smile"></i> Optimiste</h6>
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <button class="btn btn-outline-success btn-sm me-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'N_star', 'optimistic', -${nstarStep})"><i class="fas fa-minus"></i></button>
                                        <span style="font-size:1.1em;font-weight:bold;min-width:90px;display:inline-block;text-align:center;">${(N_star.optimistic / 1e9).toLocaleString('fr-FR', {maximumFractionDigits:2})} ${N_star.unit}</span>
                                        <button class="btn btn-outline-success btn-sm ms-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'N_star', 'optimistic', ${nstarStep})"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sélecteur pour Ag -->
                <div class="mt-4">
                    <h6>${Ag.title}</h6>
                    <div class="row align-items-center mb-2">
                        <div class="col-md-6">
                             <div class="card ${currentValues.Ag === Ag.pessimistic ? 'border-danger bg-light' : ''}" style="cursor: pointer;" onclick="setSubParamValue('R_star', 'Ag', ${Ag.pessimistic})">
                                <div class="card-body text-center">
                                    <h6 class="text-danger"><i class="fas fa-frown"></i> Pessimiste (âge élevé)</h6>
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <button class="btn btn-outline-danger btn-sm me-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'Ag', 'pessimistic', -${agStep})"><i class="fas fa-minus"></i></button>
                                        <span style="font-size:1.1em;font-weight:bold;min-width:90px;display:inline-block;text-align:center;">${(Ag.pessimistic / 1e9).toLocaleString('fr-FR', {maximumFractionDigits:2})} ${Ag.unit}</span>
                                        <button class="btn btn-outline-danger btn-sm ms-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'Ag', 'pessimistic', ${agStep})"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card ${currentValues.Ag === Ag.optimistic ? 'border-success bg-light' : ''}" style="cursor: pointer;" onclick="setSubParamValue('R_star', 'Ag', ${Ag.optimistic})">
                                <div class="card-body text-center">
                                    <h6 class="text-success"><i class="fas fa-smile"></i> Optimiste (âge plus faible)</h6>
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <button class="btn btn-outline-success btn-sm me-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'Ag', 'optimistic', -${agStep})"><i class="fas fa-minus"></i></button>
                                        <span style="font-size:1.1em;font-weight:bold;min-width:90px;display:inline-block;text-align:center;">${(Ag.optimistic / 1e9).toLocaleString('fr-FR', {maximumFractionDigits:2})} ${Ag.unit}</span>
                                        <button class="btn btn-outline-success btn-sm ms-2" onclick="event.stopPropagation(); adjustSubParamBound('R_star', 'Ag', 'optimistic', ${agStep})"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#term-details').html(detailHtml);
}

function adjustSubParamBound(termId, subParamId, bound, step) {
    const term = drakeTerms[termId];
    let value = term.sub_params[subParamId][bound];
    value += step;
    // Ne pas croiser l'autre borne
    if (bound === 'pessimistic' && value > term.sub_params[subParamId].optimistic) value = term.sub_params[subParamId].optimistic;
    if (bound === 'optimistic' && value < term.sub_params[subParamId].pessimistic) value = term.sub_params[subParamId].pessimistic;
    // Arrondir
    if (Math.abs(step) >= 1e9) value = Math.round(value / 1e9) * 1e9;
    else if (Math.abs(step) >= 1e8) value = Math.round(value / 1e8) * 1e8;
    else value = Math.round(value);
    term.sub_params[subParamId][bound] = value;
    // Si la valeur courante était sur la borne, la mettre à jour aussi
    if (currentValues[subParamId] === value - step) currentValues[subParamId] = value;
    showRStarDetail(termId);
}
