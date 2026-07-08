# Deploy NKR Website di Dokploy

Domain produksi: `nusakharisma.lumifin.cloud`

## Opsi 1: Application Static

1. Buat Application baru di Dokploy.
2. Pilih repository project ini.
3. Pilih build type `Static`.
4. Set root directory ke `.`.
5. Tambahkan domain `nusakharisma.lumifin.cloud`.
6. Set port domain ke `80`.
7. Deploy.

## Opsi 2: Docker Compose

1. Buat service `Compose`.
2. Pilih compose path `./docker-compose.yml`.
3. Deploy service.
4. Buka tab `Domains`.
5. Tambahkan domain `nusakharisma.lumifin.cloud`.
6. Pilih service `nkr-website` dan port `80`.
7. Aktifkan HTTPS/SSL di domain Dokploy bila DNS sudah mengarah ke server.

Pastikan DNS `A` atau `CNAME` untuk `nusakharisma.lumifin.cloud` sudah mengarah ke server Dokploy.
