# API Daftar Produk

Tugas Minggu 9 Pemrograman Web (ET234305). REST API sederhana menggunakan ExpressJS.
Data produk masih disimpan di dalam array, belum memakai database.

Ryan Adya Purwanto - 5027231046

Repository: https://github.com/nightlurkr/pemweb-week9-express-api

## Prasyarat

- Node.js versi 18 atau lebih baru
- npm

## Cara menjalankan

```bash
npm install
npm start
```

Server berjalan di `http://localhost:3000`.
Untuk menghentikannya, tekan `Ctrl + C` di terminal.

## Struktur proyek

```
server.js                           merakit aplikasi: middleware, router, dan menyalakan server
data/products.js                    sumber data produk (array)
routes/products.routes.js           pemetaan URL ke controller
controllers/products.controller.js  logika tiap endpoint
```

Route dan controller sengaja dipisah. File route hanya berisi pemetaan alamat,
sedangkan seluruh logika berada di controller. Dengan begitu, mengubah alamat
endpoint tidak menyentuh logikanya, dan sebaliknya.

## Daftar endpoint

| Method | Endpoint        | Keterangan                  | Status sukses |
| ------ | --------------- | --------------------------- | ------------- |
| GET    | `/`             | Cek server aktif            | 200           |
| GET    | `/products`     | Mengambil seluruh produk    | 200           |
| GET    | `/products/:id` | Mengambil satu produk       | 200           |
| POST   | `/products`     | Menambah produk baru        | 201           |

### Status error

| Status | Kondisi                                      |
| ------ | -------------------------------------------- |
| 400    | Body POST tidak memuat `name` atau `price` yang valid |
| 404    | Produk dengan `id` tersebut tidak ada        |

## Contoh penggunaan

### GET /products

```bash
curl http://localhost:3000/products
```

```json
[
  { "id": 1, "name": "Buku", "price": 15000 },
  { "id": 2, "name": "Pulpen", "price": 5000 }
]
```

### GET /products/:id

```bash
curl http://localhost:3000/products/1
```

```json
{ "id": 1, "name": "Buku", "price": 15000 }
```

Jika id tidak ditemukan, server membalas status `404`:

```json
{ "message": "Produk tidak ditemukan" }
```

### POST /products

Body wajib berformat JSON dan disertai header `Content-Type: application/json`.

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Penghapus","price":3000}'
```

Balasan status `201`:

```json
{ "id": 3, "name": "Penghapus", "price": 3000 }
```

Field `id` dibuat oleh server, yaitu id tertinggi yang ada ditambah satu.
Jika `name` kosong atau `price` bukan angka positif, server membalas status `400`.

## Catatan

Data disimpan di dalam array pada proses yang sedang berjalan. Setiap kali server
dimatikan dan dinyalakan ulang, data kembali ke dua produk awal.

Bukti pengujian seluruh endpoint ada di `bukti-pengujian.md`, lengkap dengan
screenshot Thunder Client di folder `screenshot/`.
