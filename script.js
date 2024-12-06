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