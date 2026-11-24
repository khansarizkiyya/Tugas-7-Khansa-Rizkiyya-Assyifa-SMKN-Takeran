let proyek = [];

const daftarProyek = document.querySelector("#daftar-proyek");
const jumlahProyek = document.querySelector("#jumlah-proyek");

function buatKartu(item) {
    const kartu = document.createElement("article");
    kartu.className = "project-item";

    if (item.gambar) {
        const gambar = document.createElement("img");
        gambar.className = "project-img";
        gambar.alt = item.alt || "";
        gambar.addEventListener("error", () => {
            const pesan = document.createElement("p");
            pesan.className = "project-image-missing";
            pesan.textContent = `Gambar tidak ditemukan: ${item.gambar}`;
            gambar.replaceWith(pesan);
        }, { once: true });
        gambar.src = item.gambar;
        kartu.append(gambar);
    }

    const kategori = document.createElement("span");
    kategori.className = "label";
    kategori.textContent = item.kategori;

    const judul = document.createElement("h2");
    judul.className = "section-heading";
    judul.style.marginTop = "8px";
    judul.textContent = item.judul;

    const deskripsi = document.createElement("p");
    deskripsi.className = "bio-text";
    deskripsi.style.marginBottom = "12px";
    deskripsi.textContent = item.deskripsi;

    kartu.append(kategori, judul, deskripsi);
    return kartu;
}

function tampilkanProyek(daftar) {
    if (!daftarProyek) return;
    daftarProyek.replaceChildren(...daftar.map((item) => buatKartu(item)));
    if (jumlahProyek) {
        jumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${proyek.length} proyek`;
    }
}

let kategoriAktif = "Semua";

function tampilkanKategori(kategori) {
    kategoriAktif = kategori;
    const daftar = kategori === "Semua"
        ? proyek
        : proyek.filter((item) => item.kategori === kategori);
    tampilkanProyek(daftar);
}

function pasangFilter(idTombol, kategori) {
    const tombol = document.querySelector(idTombol);
    if (!tombol) return;
    
    tombol.addEventListener("click", () => {
        // Mengatur class aktif pada tombol
        document.querySelectorAll(".tombol-filter").forEach(b => b.classList.remove("aktif"));
        tombol.classList.add("aktif");
        tampilkanKategori(kategori);
    });
}

async function muatProyek() {
    if (!daftarProyek) return;

    if (jumlahProyek) {
        jumlahProyek.textContent = "Memuat data proyek...";
    }

    try {
        const response = await fetch("data/proyek.json");
        if (!response.ok) {
            throw new Error(`Gagal memuat data proyek (Status: ${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Format data proyek tidak valid.");
        }

        proyek = data;
        tampilkanKategori(kategoriAktif);
    } catch (error) {
        daftarProyek.replaceChildren();
        if (jumlahProyek) {
            jumlahProyek.textContent = "Gagal memuat proyek.";
        }

        const pesan = document.createElement("p");
        pesan.className = "bio-text";
        pesan.textContent = `Terjadi kesalahan saat memuat proyek: ${error.message}`;
        daftarProyek.append(pesan);
    }
}

// Inisialisasi saat halaman proyek dimuat
if (daftarProyek) {
    pasangFilter("#filter-semua", "Semua");
    pasangFilter("#filter-html", "HTML");
    pasangFilter("#filter-css", "CSS");
    pasangFilter("#filter-javascript", "JavaScript");
    muatProyek();
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

const usernameGitHub = "khansarizkiyya";
const statusRepo = document.querySelector("#status-repo");
const daftarRepo = document.querySelector("#daftar-repo");

async function muatRepositoriGitHub() {
  if (!statusRepo || !daftarRepo) return;

  statusRepo.textContent = "Memuat repositori GitHub...";
  daftarRepo.replaceChildren();

  try {
    const response = await fetch(
      `https://api.github.com/users/${usernameGitHub}/repos?sort=updated&per_page=6`
    );
    if (!response.ok) {
      throw new Error(`GitHub API memberi status ${response.status}`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos)) {
      throw new Error("Format data repositori tidak valid.");
    }

    const repoTeratas = repos
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
      .slice(0, 6);

    if (repoTeratas.length === 0) {
      statusRepo.textContent = "Belum ada repositori publik yang ditemukan.";
      return;
    }

    const kartuRepo = repoTeratas.map((repo) => {
      const item = document.createElement("li");
      item.className = "repo-card";

      const header = document.createElement("div");
      header.className = "repo-card-header";

      const nama = document.createElement("a");
      nama.className = "repo-name";
      nama.href = repo.html_url;
      nama.target = "_blank";
      nama.rel = "noopener noreferrer";
      nama.textContent = repo.name;

      const bintang = document.createElement("span");
      bintang.className = "repo-stars";
      bintang.textContent = `⭐ ${repo.stargazers_count}`;
      header.append(nama, bintang);

      const deskripsi = document.createElement("p");
      deskripsi.className = "repo-desc";
      deskripsi.textContent =
        repo.description || "Tidak ada deskripsi repositori.";

      const footer = document.createElement("div");
      footer.className = "repo-card-footer";

      const bahasa = document.createElement("span");
      bahasa.className = "repo-lang";
      bahasa.textContent = repo.language || "Tanpa Bahasa";

      const tautanRepo = document.createElement("a");
      tautanRepo.className = "repo-open";
      tautanRepo.href = repo.html_url;
      tautanRepo.target = "_blank";
      tautanRepo.rel = "noopener noreferrer";
      tautanRepo.textContent = "Lihat Repo →";

      footer.append(bahasa, tautanRepo);
      item.append(header, deskripsi, footer);
      return item;
    });

    daftarRepo.append(...kartuRepo);
    statusRepo.textContent =
      `Menampilkan ${repoTeratas.length} repositori terbaru dari @${usernameGitHub}.`;
  } catch (error) {
    statusRepo.textContent =
      `Terjadi kesalahan saat memuat repositori: ${error.message}`;
  }
}

muatRepositoriGitHub();