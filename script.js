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

document.getElementById('R').addEventListener('click', function(event) {
    $(".explication").hide();
    $("#explication-r").show(500);
});

document.getElementById('fp').addEventListener('click', function(event) {
    $(".explication").hide();
    $("#explication-fp").show(500);
});
