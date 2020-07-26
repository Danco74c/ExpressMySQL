const hostString = "http://172.16.50.90:8080"

document.addEventListener('DOMContentLoaded', function () {
    fetch( hostString + '/getString')
    .then(response => response.json())
    .then(data => loadHTML(data['data']));
    
});


function loadHTML(data) {
    const textElement = document.getElementById('dbText');

    if (data.length === 0) {
        table.innerHTML = "NO DATA";
        return;
    }

    let html = data[0].msg;

    textElement.innerHTML = html;
}
