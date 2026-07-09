# Panduan Deploy Website NKR ke Dokploy

Target domain:

```text
https://nusakharisma.lumifin.cloud
```

Folder ini (`Dokploynkrweb`) sudah berisi file yang siap deploy:

- `index.html`
- `about/`
- `products/`
- `services/`
- `contact/`
- `assets/`
- `styles.css`
- `script.js`
- `sitemap.xml`
- `robots.txt`
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`

## 1. Yang Perlu Disiapkan

Sebelum deploy, pastikan 3 hal ini sudah ada:

1. Server Dokploy sudah aktif dan bisa dibuka dari browser.
2. Domain/subdomain `nusakharisma.lumifin.cloud` sudah diarahkan ke IP server Dokploy.
3. File dalam folder `Dokploynkrweb` sudah masuk ke Git repository atau sudah siap di-upload sesuai metode yang Anda pakai.

## 2. Setting DNS Domain

Di DNS provider domain `lumifin.cloud`, buat record:

```text
Type: A
Name: nusakharisma
Value: IP_SERVER_DOKPLOY
TTL: Auto / Default
```

Contoh:

```text
Type: A
Name: nusakharisma
Value: 123.123.123.123
```

Jika server Dokploy memakai CNAME, gunakan:

```text
Type: CNAME
Name: nusakharisma
Value: domain-server-dokploy-anda.com
```

Tunggu propagasi DNS. Biasanya beberapa menit, tapi bisa sampai beberapa jam.

## 3. Cara Deploy Paling Mudah: Application Static

Ini cara yang paling disarankan untuk website ini karena websitenya adalah HTML/CSS/JS statis.

### Langkah 1: Masuk ke Dokploy

1. Buka dashboard Dokploy.
2. Pilih project yang ingin dipakai.
3. Klik `Create Application` atau `New Application`.

### Langkah 2: Hubungkan Repository

Jika folder ini sudah ada di GitHub/GitLab:

1. Pilih Git provider.
2. Pilih repository website NKR.
3. Pilih branch, biasanya `main`.

Jika repository berisi folder lain selain `Dokploynkrweb`, maka isi:

```text
Root Directory / Build Path: Dokploynkrweb
```

Jika repository hanya berisi isi folder `Dokploynkrweb`, maka isi:

```text
Root Directory / Build Path: .
```

### Langkah 3: Pilih Build Type

Pilih:

```text
Build Type: Static
```

Untuk website statis, Dokploy akan menyajikan file lewat Nginx. Saat membuat domain, gunakan port `80`.

### Langkah 4: Deploy

Klik:

```text
Deploy
```

Tunggu sampai status deployment sukses.

### Langkah 5: Tambahkan Domain

1. Buka tab `Domains`.
2. Klik `Add Domain`.
3. Isi domain:

```text
nusakharisma.lumifin.cloud
```

4. Isi port:

```text
80
```

5. Simpan.

### Langkah 6: Aktifkan HTTPS

Jika DNS sudah benar dan domain sudah mengarah ke server Dokploy:

1. Buka domain settings di Dokploy.
2. Aktifkan SSL/HTTPS.
3. Tunggu certificate dibuat.
4. Coba buka:

```text
https://nusakharisma.lumifin.cloud
```

## 4. Cara Alternatif: Docker Compose

Gunakan cara ini kalau Anda ingin deploy memakai file `docker-compose.yml`.

### Langkah 1: Buat Compose App

1. Di Dokploy, klik `Create`.
2. Pilih `Docker Compose` atau `Compose`.
3. Pilih repository yang berisi folder ini.

Jika repository berisi folder `Dokploynkrweb`, gunakan compose path:

```text
Dokploynkrweb/docker-compose.yml
```

Jika repository hanya berisi isi folder `Dokploynkrweb`, gunakan:

```text
docker-compose.yml
```

### Langkah 2: Deploy Compose

Klik:

```text
Deploy
```

Compose akan membangun image Nginx dari `Dockerfile`.

### Langkah 3: Tambahkan Domain di Tab Domains

Dokploy merekomendasikan konfigurasi domain lewat UI, bukan menulis Traefik labels manual.

1. Buka app Docker Compose yang sudah dibuat.
2. Masuk ke tab `Domains`.
3. Klik `Add Domain`.
4. Isi:

```text
Domain: nusakharisma.lumifin.cloud
Service: nkr-website
Port: 80
```

5. Simpan.
6. Aktifkan HTTPS/SSL setelah DNS mengarah ke server.

## 5. Checklist Setelah Deploy

Setelah deployment sukses, cek URL berikut:

```text
https://nusakharisma.lumifin.cloud
https://nusakharisma.lumifin.cloud/products/
https://nusakharisma.lumifin.cloud/products/disposable-medis.html
https://nusakharisma.lumifin.cloud/contact/
https://nusakharisma.lumifin.cloud/sitemap.xml
https://nusakharisma.lumifin.cloud/robots.txt
```

Pastikan:

- Halaman home tampil.
- Logo NKR tampil.
- Tombol menu mobile bisa dibuka.
- Halaman produk bisa dibuka.
- Form contact membuka email.
- `sitemap.xml` tampil.
- `robots.txt` tampil.
- HTTPS aktif dan tidak muncul warning browser.

## 6. Jika Domain Belum Bisa Dibuka

Cek ini satu per satu:

1. DNS `nusakharisma.lumifin.cloud` sudah mengarah ke IP server Dokploy.
2. Di Dokploy domain sudah ditambahkan.
3. Port domain di Dokploy adalah `80`.
4. Deployment status sukses.
5. SSL/HTTPS hanya diaktifkan setelah DNS benar.
6. Jika memakai Docker Compose, service yang dipilih adalah `nkr-website`.

## 7. Jika Halaman Produk 404

Pastikan URL detail produk memakai `.html`, contoh:

```text
/products/disposable-medis.html
/products/perawatan-luka.html
/products/radiologi.html
```

Untuk halaman listing produk, URL-nya:

```text
/products/
```

## 8. Catatan untuk Update Website

Jika ingin mengubah konten:

1. Edit file HTML/CSS di folder ini.
2. Commit dan push ke repository.
3. Klik redeploy di Dokploy atau aktifkan auto deploy.

Jika ingin mengganti logo:

```text
assets/nkr_logo.png
```

Jika ingin mengganti gambar hero:

```text
assets/nkr-medical-supplies-hero.png
```
