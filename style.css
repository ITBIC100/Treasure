const API = "PASTE_URL_API_DISINI";
let editId = null;

// LOGIN
function login() {
  fetch(API + "?action=users")
    .then(r => r.json())
    .then(users => {
      const u = user.value, p = pass.value;
      const ok = users.find(x => x[0]==u && x[1]==p);
      if (ok) location.href = "dashboard.html";
      else alert("Login gagal");
    });
}

// LOAD INVENTORY
function load() {
  fetch(API + "?action=inventory")
    .then(r => r.json())
    .then(data => {
      let html="", low="";
      data.forEach(d => {
        html += `<tr>
          <td>${d.kode}</td>
          <td>${d.nama}</td>
          <td>${d.stok}</td>
          <td>${d.harga}</td>
          <td>
            <button onclick='edit(${JSON.stringify(d)})'>✏️</button>
            <button onclick='hapus(${d.id})'>🗑️</button>
          </td>
        </tr>`;
        if (d.stok <= 10) low += `<li>${d.nama} (${d.stok})</li>`;
      });
      dataEl.innerHTML = html;
      lowStock.innerHTML = low;
    });
}

form?.addEventListener("submit", e => {
  e.preventDefault();
  const payload = {
    action: editId ? "update" : "add",
    id: editId,
    kode: kode.value,
    nama: nama.value,
    stok: stok.value,
    harga: harga.value
  };
  fetch(API, { method:"POST", body:JSON.stringify(payload) })
    .then(() => { editId=null; form.reset(); load(); });
});

function edit(d) {
  editId = d.id;
  kode.value=d.kode;
  nama.value=d.nama;
  stok.value=d.stok;
  harga.value=d.harga;
}

function hapus(id) {
  if(confirm("Hapus data?"))
    fetch(API, { method:"POST", body:JSON.stringify({action:"delete",id}) })
      .then(load);
}

// EXPORT EXCEL
function exportExcel() {
  window.open(API + "?action=inventory");
}

load?.();
