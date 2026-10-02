# 📋 Changelog — Timelapse AI Prompt Generator

---

## v2.1.0 — 25 Mei 2026

### 🐛 Bug Fixes

#### Upload Gambar Lebih Andal
- **Konteks foto kamu sekarang benar-benar terpakai.**
  Sebelumnya, teks konteks yang kamu ketik di kolom "💬 Konteks Timelapse" (misalnya: _"mulai dari tanah kosong, ada pekerja konstruksi"_) diam-diam tidak dikirim ke AI saat mode Upload Foto. Sekarang sudah diperbaiki — AI akan membaca konteks kamu dan memasukkannya ke dalam prompt yang dihasilkan.

#### Petunjuk Gambar Awal Lebih Akurat
- **Label "Video Transisi 0" yang membingungkan sudah dihapus.**
  Di halaman hasil, kartu Gambar Awal sebelumnya menampilkan petunjuk yang menyebut "Video Transisi 0" — yang tidak ada. Sekarang petunjuknya benar: _"Dipakai di Video Transisi 1 (gambar awal)"_.

#### Tombol Salin Lebih Handal
- **Tombol copy prompt sekarang bekerja di semua kondisi.**
  Di browser atau koneksi tertentu, tombol "Salin" bisa diam-diam gagal tanpa pemberitahuan. Sekarang ada sistem cadangan otomatis — prompt tetap tersalin meskipun di lingkungan yang tidak ideal.

---

### ✨ Perbaikan Tampilan & UX

#### Loading State Lebih Informatif
- **Teks loading sekarang dinamis sesuai proses yang sedang berjalan.**
  Saat AI sedang bekerja, kamu akan melihat pesan yang lebih spesifik:
  - _"AI menganalisis gambar kamu..."_ — saat foto sedang dianalisis
  - _"AI menganalisis gambar & menyusun prompt konstruksi..."_ — saat prompt sedang dibuat dari foto
  - _"Menyusun prompt sinematik..."_ — saat generate dari teks

#### Navigasi Mode Lebih Konsisten
- **Posisi frame di-reset otomatis saat kamu ganti mode.**
  Kalau kamu pernah set posisi foto ke "Tengah", lalu pindah ke mode Ketik Ide, lalu balik lagi ke Upload Foto — posisi foto sekarang otomatis kembali ke "Awal". Tidak ada lagi state yang nyangkut dari sesi sebelumnya.

---

### ⚡ Perbaikan Performa & Stabilitas (Internal)

- **Error API Key lebih cepat terdeteksi** — kalau API Key kamu tidak valid, aplikasi sekarang langsung memberi tahu tanpa buang-buang waktu mencoba ulang ke model cadangan.
- **Pemrosesan gambar lebih aman** — kalau format file gambar tidak terduga, aplikasi sekarang menampilkan pesan error yang jelas alih-alih crash tanpa keterangan.

---

## v2.0.0 — Rilis Awal

- Mode **Upload Foto** — AI analisis gambar referensi kamu dan jadikan anchor timelapse
- Mode **Ketik Ide** — AI generate 3 saran cerita dari deskripsi kamu
- Generator **Keyframe Imagen** (Nano Banana) + **Video Prompt Veo 3**
- Pilihan posisi foto: **Awal / Tengah / Akhir**
- Selector jumlah transisi 1–10
- Pilihan kamera: **Static** atau **Cinematic Move**
- 9 template timelapse siap pakai
- API Key tersimpan lokal di browser (tidak dikirim ke server manapun)
