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
            <p>Ce paramètre représente le nombre d'étoiles qui se forment chaque année dans la Voie lactée.</p>
            
            <h5>État de l'art des connaissances :</h5>
            <ul>
                <li><strong>Observations actuelles :</strong> Les télescopes spatiaux comme <span class="besancon-link" onclick="showHipparcosModal()">Hipparcos</span> et <span class="besancon-link" onclick="showGaiaModal()">Gaia</span> ont permis d'estimer ce taux</li>
                <li><strong>Modèle mis en oeuvre :</strong> Le <span class="besancon-link" onclick="showBesanconModal()">modèle de la galaxie de Besançon</span> fait référence quand à la formation et l'évolution d'une galaxie</li>
                <li><strong>Méthodes de mesure :</strong> Comptage des étoiles jeunes, analyse de la lumière infrarouge des régions de formation stellaire</li>
                <li><strong>Évolution temporelle :</strong> Le taux était plus élevé dans le passé de la galaxie</li>
                <li><strong>Variations régionales :</strong> Plus intense dans les bras spiraux et le centre galactique</li>
            </ul>
            
            <h5>Facteurs influençant ce paramètre :</h5>
            <p>La disponibilité du gaz interstellaire, les ondes de densité dans les bras spiraux, les interactions galactiques, et l'évolution chimique de la galaxie.</p>
        `,
        pessimistic: 1,
        optimistic: 10,
        unit: 'étoiles/an'
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
                <li><strong>Diversité des systèmes :</strong> Jupiter chauds, super-Terres, systèmes compacts</li>
                <li><strong>Méthodes de détection :</strong> Transits, vitesses radiales, microlentilles gravitationnelles</li>
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
        const card = `
            <div class="col-12 mb-3">
                <div class="card term-card h-100" onclick="showTermDetail('${termId}')">
                    <div class="card-body text-center">
                        <h6 class="card-title">${term.name}</h6>
                        <small class="text-muted">${term.title}</small>
                        <div class="term-card-value mt-2">
                            <div class="text-danger small display-term">
                                <i class="fas fa-frown"></i> ${term.pessimistic} ${term.unit}
                            </div>
                            <div class="text-success small display-term">
                                <i class="fas fa-smile"></i> ${term.optimistic} ${term.unit}
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
    const detailHtml = `
        <div class="term-detail">
            ${term.details}
            
            <div class="current-value-display current-value-${type}">
                <h5><i class="fas fa-check-circle"></i> Valeur actuelle sélectionnée</h5>
                <h3>${currentValues[termId]} ${term.unit}</h3>
            </div>
            
            <div class="value-selector">
                <h5><i class="fas fa-sliders-h"></i> Choisissez une valeur :</h5>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card ${currentValues[termId] === term.pessimistic ? 'border-danger bg-light' : ''}" style="cursor: pointer;" onclick="setValue('${termId}', ${term.pessimistic}, 'pessimistic')">
                            <div class="card-body text-center">
                                <h6 class="text-danger"><i class="fas fa-frown"></i> Pessimiste</h6>
                                <h4>${term.pessimistic} ${term.unit}</h4>
                                <div class="btn-group mb-2" role="group">
                                    <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation(); adjustValue('${termId}', 'pessimistic', -1)">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation(); adjustValue('${termId}', 'pessimistic', 1)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <br>
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
                                <h4>${term.optimistic} ${term.unit}</h4>
                                <div class="btn-group mb-2" role="group">
                                    <button class="btn btn-outline-success btn-sm" onclick="event.stopPropagation(); adjustValue('${termId}', 'optimistic', -1)">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button class="btn btn-outline-success btn-sm" onclick="event.stopPropagation(); adjustValue('${termId}', 'optimistic', 1)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <br>
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

function adjustValue(termId, type, direction) {
    const term = drakeTerms[termId];
    
    // Définir les incréments selon le terme
    let increment;
    if (termId === 'R_star') {
        increment = 1; // étoiles/an
    } else if (termId === 'L') {
        increment = direction > 0 ? term[type] * 0.1 : term[type] * 0.1; // 10% d'ajustement
    } else if (term[type] >= 1) {
        increment = 0.1; // Pour les valeurs >= 1
    } else if (term[type] >= 0.1) {
        increment = 0.01; // Pour les valeurs décimales
    } else {
        increment = 0.01; // Pour les très petites valeurs
    }
    
    // Calculer la nouvelle valeur
    let newValue = term[type] + (direction * increment);
    
    // S'assurer que la valeur reste positive
    if (newValue <= 0) {
        newValue = increment;
    }
    
    // Arrondir pour éviter les problèmes de précision JavaScript
    if (increment >= 1) {
        newValue = Math.round(newValue);
    } else if (increment >= 0.1) {
        newValue = Math.round(newValue * 10) / 10;
    } else if (increment >= 0.01) {
        newValue = Math.round(newValue * 100) / 100;
    } else {
        newValue = Math.round(newValue * 1000) / 1000;
    }
    
    // Sauvegarder l'ancienne valeur pour comparaison
    const oldValue = term[type];
    
    // Mettre à jour la valeur dans l'objet
    drakeTerms[termId][type] = newValue;
    
    // Si cette valeur est actuellement sélectionnée, mettre à jour aussi currentValues
    if (currentValues[termId] === oldValue) {
        currentValues[termId] = newValue;
    }
    
    // Mettre à jour l'affichage des cartes avec les nouvelles valeurs
    updateTermCards();
    
    // Rafraîchir l'affichage du détail
    showTermDetail(termId, type);
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
