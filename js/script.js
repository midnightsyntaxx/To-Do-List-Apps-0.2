const inputNama = document.getElementById('inputNama');
const inputWaktu = document.getElementById('inputWaktu');
const tombol = document.getElementById('tombolTambah');
const listTugas = document.getElementById('listTugas');
const listSelesai = document.getElementById('listSelesai');

tombol.addEventListener('click', () => {
    if(inputNama.value.trim() === "") {
        alert('isi dulu bre rutinitasnya!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'routine-item';

    li.innerHTML = `
    <input type="checkbox" class="routine-check">
    <div class="routine-info">
        <span class="routine-name">${inputNama.value}</span>
        <span class="routine-time">${inputWaktu.value || '--:--'}</span>
    </div>
    <span class="span-delete">\u00d7</span>
    `;

    const checkbox = li.querySelector('.routine-check');
    checkbox.style.cursor = 'pointer';

    listTugas.appendChild(li);
    inputNama.value = "";
    inputWaktu.value = "";
    inputNama.focus();
    simpanData();
});


//memindahkan dan menghapus tugas//

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('routine-check')) {
        const itemTambah = e.target.parentElement;
        if(e.target.checked) {
            itemTambah.classList.add('checked');
            listSelesai.appendChild(itemTambah);
        } else {
            itemTambah.classList.remove('checked');
            listTugas.appendChild(itemTambah);
        }
        simpanData();
    }

    if(e.target.classList.contains('span-delete')) {
        const itemHapus = e.target.parentElement;
        itemHapus.style.opacity = '0';
        itemHapus.style.transition = '0.5s';
        itemHapus.style.transform = 'translateY(20px)';

        setTimeout(() => {
            itemHapus.remove();
            simpanData();
        }, 500);
    }
});


//local storage//

function simpanData() {
    localStorage.setItem("dataTugas", listTugas.innerHTML);
    localStorage.setItem("dataSelesai", listSelesai.innerHTML);
}

function tampilData() {
    listTugas.innerHTML = localStorage.getItem("dataTugas") || "";
    listSelesai.innerHTML = localStorage.getItem("dataSelesai") || "";
}

tampilData();