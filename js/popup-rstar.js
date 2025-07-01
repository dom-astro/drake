// Gestion des popups pour le terme R* (taux de formation stellaire)

function ensureBesanconModal() {
    if (!document.getElementById('besanconModal')) {
        const html = `
        	<!-- Modal pour le modèle de la galaxie de Besançon -->
            <div class="modal fade" id="besanconModal" tabindex="-1" aria-labelledby="besanconModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="besanconModalLabel">
                        <i class="fas fa-university"></i> Le Modèle de la Galaxie de Besançon
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="./besancon.jpg" style="width: 250px;" />
                            <h6>Observatoire de Besançon</h6>
                        </div>
                        <div class="col-md-8">
                            <h5><i class="fas fa-info-circle text-primary"></i> Qu'est-ce que le modèle de la galaxie de Besançon ?</h5>
                            <p>
                                Le <strong>modèle de la galaxie de Besançon</strong> est un modèle de synthèse stellaire développé à l'Observatoire de Besançon 
                                depuis les années 1980. Il simule la structure, la formation et l'évolution de notre galaxie, la Voie lactée.
                            </p>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <h5><i class="fas fa-cogs text-success"></i> Caractéristiques principales</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Composantes galactiques :</strong> Disque mince, disque épais, halo, bulbe</li>
                                <li><strong>Formation stellaire :</strong> Taux historique et spatial</li>
                                <li><strong>Évolution chimique :</strong> Enrichissement en métaux</li>
                                <li><strong>Cinématique :</strong> Mouvements des étoiles</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Fonction de masse initiale :</strong> Distribution des masses stellaires</li>
                                <li><strong>Extinction interstellaire :</strong> Poussière galactique</li>
                                <li><strong>Populations stellaires :</strong> Âges et métallicités</li>
                                <li><strong>Prédictions observationnelles :</strong> Comptages d'étoiles</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-info">
                        <i class="fas fa-lightbulb"></i> 
                        <strong>Utilité pour l'équation de Drake :</strong> 
                        Le modèle permet d'estimer précisément le taux de formation stellaire (R*) en tenant compte 
                        de l'évolution temporelle et spatiale de la galaxie.
                    </div>
                    
                    <h5><i class="fas fa-telescope text-warning"></i> Applications modernes</h5>
                    <p>
                        Le modèle est constamment mis à jour avec les données des missions spatiales comme 
                        <strong>Hipparcos</strong>, <strong>Gaia</strong>, et les grands relevés au sol. Il aide à :
                    </p>
                    <ul>
                        <li>Interpréter les observations astrométriques et photométriques</li>
                        <li>Comprendre la structure 3D de la Voie lactée</li>
                        <li>Estimer les populations d'exoplanètes potentiellement habitables</li>
                        <li>Prédire les découvertes des futurs télescopes</li>
                    </ul>
                    
                    <div class="text-center mt-3">
                        <small class="text-muted">
                            <i class="fas fa-link"></i> 
                            Développé à l'<a href="https://model.obs-besancon.fr/" target="_blank">Institut UTINAM</a> (Univers, Transport, Interfaces, Nanostructures, Atmosphère et environnement, Molécules)
                        </small>
                    </div>
                </div>
                <div class="modal-footer d-flex flex-column align-items-center">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        <i class="fas fa-check"></i> Compris !
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function ensureGaiaModal() {
    if (!document.getElementById('gaiaModal')) {
        const html = `
    <!-- Modal pour le satellite Gaia -->
    <div class="modal fade" id="gaiaModal" tabindex="-1" aria-labelledby="gaiaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="gaiaModalLabel">
                        <i class="fas fa-satellite"></i> Le Satellite Gaia
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="img/Gaia.jpg" 
                                 style="width: 250px; border-radius: 10px;" alt="Satellite Gaia" />
                            <h6>Satellite Gaia</h6>
                        </div>
                        <div class="col-md-8">
                            <h5><i class="fas fa-info-circle text-primary"></i> Qu'est-ce que Gaia ?</h5>
                            <p>
                                <strong>Gaia</strong> est un satellite astrométrique de l'Agence Spatiale Européenne (ESA) lancé en 2013. 
                                Sa mission principale est de créer le catalogue stellaire le plus précis jamais réalisé, 
                                en mesurant la position, la distance et le mouvement de plus d'un milliard d'étoiles.
                            </p>
                            <p style="font-size: 14px; font-style: italic;"">(By Spacecraft: ESA/ATG medialab; Milky Way: ESA/Gaia/DPAC. Acknowledgement: A. Moitinho., CC BY-SA IGO 3.0, CC BY-SA 3.0 igo, https://commons.wikimedia.org/w/index.php?curid=119243221)</p>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <h5><i class="fas fa-cogs text-success"></i> Caractéristiques principales</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Précision astrométrique :</strong> Jusqu'à 20 microsecondes d'arc</li>
                                <li><strong>Couverture :</strong> Plus d'un milliard d'étoiles</li>
                                <li><strong>Distance :</strong> Mesures jusqu'à 30 000 années-lumière</li>
                                <li><strong>Vitesses radiales :</strong> Pour les étoiles les plus brillantes</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Photométrie :</strong> Mesures de luminosité précises</li>
                                <li><strong>Spectroscopie :</strong> Composition chimique des étoiles</li>
                                <li><strong>Détection :</strong> Planètes extrasolaires, astéroïdes</li>
                                <li><strong>Durée :</strong> Mission prévue de 10 ans</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-info">
                        <i class="fas fa-lightbulb"></i> 
                        <strong>Utilité pour l'équation de Drake :</strong> 
                        Gaia fournit des données précises sur le taux de formation stellaire (R*) 
                        et la distribution des étoiles dans la Voie lactée, améliorant considérablement 
                        nos estimations pour le premier paramètre de l'équation.
                    </div>
                    
                    <h5><i class="fas fa-telescope text-warning"></i> Découvertes majeures</h5>
                    <p>
                        Gaia a révolutionné notre compréhension de la Voie lactée en révélant :
                    </p>
                    <ul>
                        <li>La structure 3D détaillée de notre galaxie</li>
                        <li>L'histoire de formation et d'évolution de la Voie lactée</li>
                        <li>Des milliers d'exoplanètes potentielles</li>
                        <li>Des étoiles hypervéloces et des systèmes binaires</li>
                    </ul>
                    
                    <div class="text-center mt-3">
                        <small class="text-muted">
                            <i class="fas fa-link"></i> 
                            Mission de l'Agence Spatiale Européenne (ESA) - 2013-2025
                        </small>
                    </div>
                </div>
                <div class="modal-footer d-flex flex-column align-items-center">
                    <small class="text-muted mb-2">
                        <i class="fas fa-link"></i> <a href="https://fr.wikipedia.org/wiki/Gaia_(sonde_spatiale)" target="_blank">En savoir plus sur Wikipédia</a>
                    </small>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        <i class="fas fa-check"></i> Compris !
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function ensureHipparcosModal() {
    if (!document.getElementById('hipparcosModal')) {
        const html = `
    <!-- Modal pour le satellite Hipparcos -->
    <div class="modal fade" id="hipparcosModal" tabindex="-1" aria-labelledby="hipparcosModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="hipparcosModalLabel">
                        <i class="fas fa-satellite"></i> Le Satellite Hipparcos
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="img/Hipparcos.jpg" 
                                 style="width: 250px; border-radius: 10px;" alt="Satellite Hipparcos" />
                            <h6>Satellite Hipparcos</h6>
                        </div>
                        <div class="col-md-8">
                            <h5><i class="fas fa-info-circle text-primary"></i> Qu'est-ce qu'Hipparcos ?</h5>
                            <p>
                                <strong>Hipparcos</strong> (High Precision Parallax Collecting Satellite) était le précurseur de Gaia. 
                                Lancé en 1989 par l'ESA, il fut le premier satellite dédié à l'astrométrie de précision, 
                                mesurant les positions de plus de 118 000 étoiles avec une précision inégalée pour l'époque.
                            </p>
                            <p style="font-size: 14px; font-style: italic; padding-top: 18px;">(By Spacecraft: ESA/ATG medialab; Milky Way: ESA/Gaia/DPAC. Acknowledgement: A. Moitinho., CC BY-SA IGO 3.0, CC BY-SA 3.0 igo, https://commons.wikimedia.org/w/index.php?curid=119243221)</p>
                        </div>
                    </div>
                    
                    <hr>
                    
                    <h5><i class="fas fa-cogs text-success"></i> Caractéristiques principales</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Précision astrométrique :</strong> 1 milliseconde d'arc</li>
                                <li><strong>Couverture :</strong> 118 218 étoiles cataloguées</li>
                                <li><strong>Distance :</strong> Mesures jusqu'à 1 000 années-lumière</li>
                                <li><strong>Photométrie :</strong> Mesures de luminosité</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul>
                                <li><strong>Durée :</strong> Mission de 3.5 ans (1989-1993)</li>
                                <li><strong>Révolutions :</strong> Catalogue Hipparcos et Tycho</li>
                                <li><strong>Héritage :</strong> Base pour les missions futures</li>
                                <li><strong>Impact :</strong> Révolution en astronomie stellaire</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="alert alert-info">
                        <i class="fas fa-lightbulb"></i> 
                        <strong>Utilité pour l'équation de Drake :</strong> 
                        Hipparcos a fourni les premières mesures précises du taux de formation stellaire (R*) 
                        et de la distribution stellaire, établissant les bases pour les estimations 
                        modernes utilisées dans l'équation de Drake.
                    </div>
                    
                    <h5><i class="fas fa-telescope text-warning"></i> Héritage scientifique</h5>
                    <p>
                        Hipparcos a ouvert la voie à l'astrométrie moderne en permettant :
                    </p>
                    <ul>
                        <li>Les premières mesures précises de parallaxes stellaires</li>
                        <li>L'amélioration des modèles de formation stellaire</li>
                        <li>La calibration des échelles de distance cosmiques</li>
                        <li>Le développement des missions astrométriques futures</li>
                    </ul>
                    
                    <div class="text-center mt-3">
                        <small class="text-muted">
                            <i class="fas fa-link"></i> 
                            Mission de l'Agence Spatiale Européenne (ESA) - 1989-1993
                        </small>
                    </div>
                </div>
                <div class="modal-footer d-flex flex-column align-items-center">
                    <small class="text-muted mb-2">
                        <i class="fas fa-link"></i> <a href="https://fr.wikipedia.org/wiki/Hipparcos" target="_blank">En savoir plus sur Wikipédia</a>
                    </small>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        <i class="fas fa-check"></i> Compris !
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function ensureGlobularClustersModal() {
    if (!document.getElementById('globularClustersModal')) {
        const html = `
            <!-- Modal pour les amas globulaires -->
    <div class="modal fade" id="globularClustersModal" tabindex="-1" aria-labelledby="globularClustersModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="globularClustersModalLabel">
                        <i class="fas fa-circle"></i> Les amas globulaires
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <img src="img/m13-hercule.jpg" alt="Amas globulaire" style="width:320px;max-width:100%;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:10px;" />
                        <div style="font-size:0.95em;color:#555;margin-top:0.5em;">Amas globulaire M13 (Par Donald Pelletier — Travail personnel, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=116229890)</div>
                    </div>
                    <h5>Qu'est-ce qu'un amas globulaire ?</h5>
                    <p>
                        Un <strong>amas globulaire</strong> est un ensemble très dense de centaines de milliers à plusieurs millions d'étoiles, liées gravitationnellement et formant une sphère compacte. Ces amas orbitent autour du centre de la galaxie, principalement dans son halo.
                    </p>
                    <h5>Pourquoi sont-ils importants pour la datation de la galaxie ?</h5>
                    <p>
                        Les amas globulaires comptent parmi les objets les plus anciens de la Voie lactée. En étudiant les étoiles qu'ils contiennent, les astronomes peuvent estimer leur âge grâce aux modèles d'évolution stellaire. L'âge des plus vieux amas globulaires (environ 13,2 milliards d'années) fournit une estimation minimale de l'âge de la galaxie elle-même.
                    </p>
                    <ul>
                        <li>Ils servent de "fossiles cosmiques" pour comprendre les premières étapes de la formation galactique.</li>
                        <li>Leur composition chimique (faible métallicité) indique qu'ils se sont formés très tôt dans l'histoire de l'univers.</li>
                    </ul>
                </div>
                <div class="modal-footer d-flex flex-column align-items-center">
                    <small class="text-muted mb-2">
                        <i class="fas fa-link"></i> <a href="https://fr.wikipedia.org/wiki/Amas_globulaire" target="_blank">En savoir plus sur Wikipédia</a>
                    </small>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        <i class="fas fa-check"></i> Compris !
                    </button>
                </div>
            </div>
        </div>
    </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function ensureExtremophileModal() {
    if (!document.getElementById('extremophileModal')) {
        const html = `
        <!-- Modal pour la vie extrêmophile -->
        <div class="modal fade" id="extremophileModal" tabindex="-1" aria-labelledby="extremophileModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="extremophileModalLabel">
                            <i class="fas fa-biohazard"></i> Vie extrêmophile et conditions extrêmes
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-3">
                            <div style="display: flex; align-items: flex-end; justify-content: center; gap: 18px;">
                                <img src="img/extremophile.jpg" alt="Vie extrêmophile" style="width:320px;max-width:100%;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:0;" />
                                <div style="flex:1; display: flex; align-items: flex-end; justify-content: flex-start;">
                                    <small style="font-size:0.9em;color:#555;margin-bottom:4px; text-align: left;">
                                        Microphotographie de l'archéon  <a href='https://fr.wikipedia.org/wiki/Thermococcus_gammatolerans' target='_blank'>Thermococcus gammatolerans</a> par Angels Tapias.<br>
                                        (Microscopist: Jeril — D9143-ASWCYSt-PU-.tif à l’Archivo Angels Tapias et Fabrice Confalonieri, CC BY 3.0, <a href='https://commons.wikimedia.org/w/index.php?curid=7381702' target='_blank'>source</a>)
                                    </small>
                                </div>
                            </div>
                        </div>
                        <h5>Qu'est-ce qu'une vie extrêmophile ?</h5>
                        <p>
                            Les <strong>extrêmophiles</strong> sont des organismes capables de survivre et de prospérer dans des conditions considérées comme hostiles pour la plupart des formes de vie : températures extrêmes, acidité, salinité, pression, absence d'oxygène, radiation, etc.<br>
                            Sur Terre, on trouve des bactéries, archées et même certains eucaryotes dans des milieux comme les sources hydrothermales, les déserts glacés, les lacs hypersalés ou les fonds océaniques.
                        </p>
                        <h5>Pourquoi est-ce important pour les exoplanètes ?</h5>
                        <ul>
                            <li>La découverte d'extrêmophiles sur Terre élargit la notion d'habitabilité planétaire.</li>
                            <li>Des mondes auparavant jugés inhospitaliers pourraient abriter la vie sous des formes adaptées.</li>
                            <li>Les biosignatures recherchées sur les exoplanètes doivent tenir compte de cette diversité d'adaptations.</li>
                        </ul>
                        <div class="alert alert-info">
                            <i class="fas fa-lightbulb"></i> 
                            L'étude des extrêmophiles inspire la recherche de vie sur Mars, Europe, Encelade et de nombreuses exoplanètes, en élargissant les critères de détection de la vie.
                        </div>
                        <div class="text-center mt-3">
                            <small class="text-muted">
                                <i class="fas fa-link"></i> <a href="https://fr.wikipedia.org/wiki/Extr%C3%AAmophile" target="_blank">En savoir plus sur Wikipédia</a>
                            </small>
                        </div>
                    </div>
                    <div class="modal-footer d-flex flex-column align-items-center">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            <i class="fas fa-check"></i> Compris !
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function showBesanconModal() {
    ensureBesanconModal();
    $("#besanconModal").modal("show");
}

function showGaiaModal() {
    ensureGaiaModal();
    $("#gaiaModal").modal("show");
}

function showHipparcosModal() {
    ensureHipparcosModal();
    $("#hipparcosModal").modal("show");
}

function showGlobularClustersModal() {
    ensureGlobularClustersModal();
    $("#globularClustersModal").modal("show");
}

function showExtremophileModal() {
    ensureExtremophileModal();
    $("#extremophileModal").modal("show");
}

// Optionnel : initialisation automatique des liens si besoin
function initRStarPopups() {
    $(document).on('click', '.besancon-link', function(e) {
        if (this.textContent.toLowerCase().includes('besançon')) showBesanconModal();
        else if (this.textContent.toLowerCase().includes('gaia')) showGaiaModal();
        else if (this.textContent.toLowerCase().includes('hipparcos')) showHipparcosModal();
        else if (this.textContent.toLowerCase().includes('amas globulaires')) showGlobularClustersModal();
    });
}

// À appeler dans le document ready si besoin :
// initRStarPopups(); 