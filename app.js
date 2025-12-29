const API = "PASTE_API_URL";
let user = JSON.parse(localStorage.getItem("user"));
let editId=null;

function login(){
 fetch(API,{method:"POST",
  body:JSON.stringify({
   action:"login",
   username, password
  })
 }).then(r=>r.json()).then(r=>{
  if(!r.status) return alert("Login gagal");
  localStorage.setItem("user",JSON.stringify(r.user));
  location="dashboard.html";
 });
}

function logout(){
 localStorage.clear(); location="index.html";
}

if(user){
 welcome.innerText="Halo "+user.username+" ("+user.role+")";
 if(user.role!=="admin") adminPanel.style.display="none";
 load();
}

function load(){
 fetch(API+"?action=inventory")
 .then(r=>r.json())
 .then(d=>{
  data.innerHTML=d.map(x=>`
   <tr>
    <td>${x.kode}</td>
    <td>${x.nama}</td>
    <td>${x.stok}</td>
    <td>${x.harga}</td>
    <td>
     <button onclick='edit(${JSON.stringify(x)})'>✏️</button>
     ${user.role==="admin"?
       `<button onclick='hapus(${x.id})'>🗑️</button>`:""}
    </td>
   </tr>`).join("");
 });
}

form?.addEventListener("submit",e=>{
 e.preventDefault();
 fetch(API,{method:"POST",body:JSON.stringify({
  action:editId?"updateItem":"addItem",
  id:editId,
  kode:kode.value,
  nama:nama.value,
  stok:stok.value,
  harga:harga.value
 })}).then(()=>{editId=null;form.reset();load();});
});

function edit(d){
 editId=d.id;
 kode.value=d.kode;
 nama.value=d.nama;
 stok.value=d.stok;
 harga.value=d.harga;
}

function hapus(id){
 if(confirm("Hapus?"))
 fetch(API,{method:"POST",
  body:JSON.stringify({action:"deleteItem",id})
 }).then(load);
}

function addUser(){
 fetch(API,{method:"POST",body:JSON.stringify({
  action:"addUser",
  username:uuser.value,
  password:upass.value,
  role:urole.value
 })}).then(()=>alert("User ditambahkan"));
}
