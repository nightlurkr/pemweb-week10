# API Daftar Produk

Tugas Minggu 10 Pemrograman Web (ET234305). REST API CRUD menggunakan ExpressJS
dan Prisma ORM, dengan database PostgreSQL yang dihosting di Neon.

Lanjutan dari tugas Minggu 9. Data yang sebelumnya disimpan di array sekarang
disimpan di database.

Ryan Adya Purwanto - 5027231046

Repository: https://github.com/nightlurkr/pemweb-week10

## Prasyarat

- Node.js versi 18 atau lebih baru
- npm
- Database PostgreSQL (proyek ini memakai Neon)

## Cara menjalankan

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan koneksi database

Buat file `.env` di root proyek, isi dengan connection string database kamu.
Formatnya bisa dilihat di `.env.example`.

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
```

Gunakan connection string tanpa connection pooling, karena Prisma Migrate
membutuhkan koneksi langsung.

### 3. Jalankan migrasi

```bash
npx prisma migrate dev
```

Perintah ini membuat tabel `Product` di database dan menghasilkan Prisma Client.

### 4. Isi data awal

```bash
npm run seed
```

### 5. Jalankan server

```bash
npm start
```

Server berjalan di `http://localhost:3000`.

### Melihat isi database

```bash
npm run studio
```

Prisma Studio terbuka di `http://localhost:5555`.

## Struktur proyek

```
server.js                           merakit aplikasi: middleware, router, error handler
lib/prisma.js                       satu instance PrismaClient yang dipakai bersama
prisma/schema.prisma                definisi model Product
prisma/migrations/                  riwayat perubahan struktur database
prisma/seed.js                      script pengisi data awal
data/products.js                    data awal yang dipakai seed
routes/products.routes.js           pemetaan URL ke controller
controllers/products.controller.js  logika tiap endpoint
```

Route dan controller dipisah. File route hanya memetakan alamat ke fungsi,
seluruh logika dan akses database berada di controller.

## Model data

```prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Int
}
```

Kolom `id` dibuat otomatis oleh database, tidak dikirim oleh klien.

## Daftar endpoint

| Method | Endpoint        | Keterangan                     | Status sukses |
| ------ | --------------- | ------------------------------ | ------------- |
| GET    | `/`             | Cek server aktif               | 200           |
| GET    | `/products`     | Mengambil seluruh produk       | 200           |
| GET    | `/products/:id` | Mengambil satu produk          | 200           |
| POST   | `/products`     | Menambah produk baru           | 201           |
| PUT    | `/products/:id` | Mengubah produk yang sudah ada | 200           |
| DELETE | `/products/:id` | Menghapus produk               | 200           |

### Status error

| Status | Kondisi                                                      |
| ------ | ------------------------------------------------------------ |
| 400    | `id` bukan angka, atau body tidak memuat `name` dan `price` yang valid |
| 404    | Produk dengan `id` tersebut tidak ada, atau endpoint tidak dikenal |
| 500    | Kesalahan tak terduga di sisi server                          |

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

### POST /products

Body wajib JSON dengan header `Content-Type: application/json`.

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Penghapus","price":3000}'
```

Status `201`:

```json
{ "id": 3, "name": "Penghapus", "price": 3000 }
```

### PUT /products/:id

Body sama dengan POST. Seluruh field wajib dikirim, karena PUT mengganti isi
produk, bukan menambal sebagian.

```bash
curl -X PUT http://localhost:3000/products/3 \
  -H "Content-Type: application/json" \
  -d '{"name":"Penghapus Besar","price":4500}'
```

Status `200`:

```json
{ "id": 3, "name": "Penghapus Besar", "price": 4500 }
```

### DELETE /products/:id

```bash
curl -X DELETE http://localhost:3000/products/3
```

Status `200`:

```json
{
  "message": "Produk berhasil dihapus",
  "data": { "id": 3, "name": "Penghapus Besar", "price": 4500 }
}
```

## Catatan

Data sekarang tersimpan permanen di PostgreSQL. Mematikan dan menyalakan ulang
server tidak menghapus data. Untuk mengembalikan isi tabel ke kondisi awal,
jalankan `npm run seed`.

File `.env` berisi kredensial database dan tidak ikut di-commit.

Bukti pengujian seluruh endpoint ada di `bukti-pengujian.md`.
