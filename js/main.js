const proyek = [
    {
        judul: "Halaman Profil Pertama", 
        kategori: "HTML", 
        gambar: "img/proyek-profil.png", 
        alt: "Tangkapan layar halaman profil", 
        deskripsi: "Halaman web pertama saya, dibuat dengan HTML dasar."
    },
    {
        judul: "Form Kontak", 
        kategori: "HTML", 
        gambar: "img/proyek-kontak.png", 
        alt: "Tangkapan layar form kontak", 
        deskripsi: "Form dengan label dan validasi bawaan browser."
    },
    {
        judul: "Tabel Jadwal Belajar", 
        kategori: "HTML", 
        gambar: "img/proyek-jadwal.png", 
        alt: "Tangkapan layar tabel jadwal", 
        deskripsi: "Jadwal belajar mingguan dengan thead dan tbody."
    },
    {
        judul: "Portofolio Responsif", 
        kategori: "CSS", 
        gambar: "img/proyek-responsif.png", 
        alt: "Tangkapan layar portofolio responsif", 
        deskripsi: "Rapi di ponsel, tablet, dan laptop dengan Flexbox."
    },
    {
        judul: "Kalkulator Nilai Rapor", 
        kategori: "JavaScript", 
        gambar: "img/proyek-kalkulator.png", 
        alt: "Tangkapan layar kalkulator nilai", 
        deskripsi: "Rata-rata dan predikat nilai dengan fungsi JavaScript."
    },
    {
        judul: "Lima Soal Logika", 
        kategori: "JavaScript", 
        gambar: "img/proyek-logika.png", 
        alt: "Tangkapan layar soal logika", 
        deskripsi: "Lima fungsi logika yang masing-masing diuji 3 masukan."
    }
];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
    return `
    <article class="project-item">
        <span class="label">${item.kategori}</span>
        <h2 class="section-heading" style="margin-top: 8px;">${item.judul}</h2>
        <p class="bio-text" style="margin-bottom: 12px;">${item.deskripsi}</p>
        <span class="project-label" style="display:block; margin-bottom:8px;">File: ${item.gambar}</span>
    </article>`;
}

function tampilkanProyek(daftar) {
    if (!daftarProyek) return;
    const semuaKartu = daftar.map((item) => buatKartu(item));
    daftarProyek.innerHTML = semuaKartu.join("");
    if (jumlahProyek) {
        jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
    }
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);
    if (!tombol) return;
    
    tombol.addEventListener("click", () => {
        // Mengatur class aktif pada tombol
        document.querySelectorAll(".tombol-filter").forEach(b => b.classList.remove("aktif"));
        tombol.classList.add("aktif");

        if (kategori === "Semua") {
            tampilkanProyek(proyek);
        } else {
            tampilkanProyek(proyek.filter((item) => item.kategori === kategori));
        }
    });
}

// Inisialisasi saat halaman proyek dimuat
if (daftarProyek) {
    tampilkanProyek(proyek);
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");
}

const tombolTema = document.querySelector("#btnToggleTema");

if (localStorage.getItem("tema") === "light") {
  document.body.classList.add("light-mode");
  if (tombolTema) tombolTema.textContent = "🌙 Mode Gelap";
} else {
  if (tombolTema) tombolTema.textContent = "🔆 Mode Terang";
}

if (tombolTema) {
  tombolTema.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("tema", "light");
      tombolTema.textContent = "🌙 Mode Gelap";
    } else {
      localStorage.setItem("tema", "dark");
      tombolTema.textContent = "🔆 Mode Terang";
    }
  });
}

const kotakPesan = document.querySelector("#pesan");
const hitungKarakter = document.querySelector("#hitung-karakter");

if (kotakPesan && hitungKarakter) {
  kotakPesan.addEventListener("input", () => {
    hitungKarakter.textContent = `${kotakPesan.value.length}/300 karakter`;
  });
}