document.getElementById('calcul').addEventListener('click', function(event) {
    event.preventDefault();

    const R = parseFloat(document.getElementById('R').value);
    const fp = parseFloat(document.getElementById('fp').value);
    const ne = parseFloat(document.getElementById('ne').value);
    const fl = parseFloat(document.getElementById('fl').value);
    const fi = parseFloat(document.getElementById('fi').value);
    const fc = parseFloat(document.getElementById('fc').value);
    const L = parseFloat(document.getElementById('L').value);

    const N = R * fp * ne * fl * fi * fc * L;

    document.getElementById('result').innerText = `Nombre estimé de civilisations: ${N.toFixed(2)}`;
});

$("#R").on('click', function(event) {
    show_variable('r');
});

$("#fp").on('click', function(event) {
    show_variable('fp');
});

$("#fl").on('click', function(event) {
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