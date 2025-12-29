const API_URL = "PASTE_URL_APPS_SCRIPT_DISINI";

function loadData() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(item => {
            rows += `
            <tr>
                <td>${item.kode}</td>
                <td>${item.nama}</td>
                <td>${item.stok}</td>
                <td>Rp ${item.harga}</td>
            </tr>`;
        });
        document.getElementById("data").innerHTML = rows;
    });
}

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();

    const data = {
        kode: kode.value,
        nama: nama.value,
        stok: stok.value,
        harga: harga.value
    };

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
    }).then(() => {
        loadData();
        form.reset();
    });
});

loadData();
