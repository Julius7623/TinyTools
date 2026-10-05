FROM node:22-slim

# - ffmpeg: menggabung video+audio, konversi MP3
# - python3 + venv + curl_cffi: "impersonasi browser" yang WAJIB untuk TikTok dan Facebook. Biner resmi `yt-dlp`
#   (zipimport) tidak menyertakannya, jadi tanpa ini TikTok gagal dengan "Unable to extract webpage video data".
# - pdf2docx (+PyMuPDF): mesin konversi PDF ke Word untuk PDF to Word (pdf2word.py), murni pip, tanpa LibreOffice.
# - yt-dlp channel nightly: perbaikan situs (TikTok/IG/FB sering berubah) tiba lebih cepat daripada rilis stable.
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg python3 python3-venv curl ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && python3 -m venv /opt/venv \
 && /opt/venv/bin/pip install --no-cache-dir curl-cffi pycryptodomex brotli certifi pdf2docx \
 && mkdir -p /opt/ytdlp \
 && curl -fsSL https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp -o /opt/ytdlp/yt-dlp \
 && chmod a+rx /opt/ytdlp/yt-dlp \
 && chown -R node:node /opt/ytdlp
# venv di depan PATH: skrip yt-dlp memakai python3 milik venv, sehingga curl_cffi terbaca
# NODE_OPTIONS: batasi heap Node (instance free hanya 512 MB, sisanya dipakai ffmpeg/yt-dlp/pdf2docx); bisa ditimpa lewat env var Render
ENV PATH="/opt/venv/bin:/opt/ytdlp:${PATH}" NODE_ENV=production NODE_OPTIONS="--max-old-space-size=256"
# Gagalkan build lebih awal (bukan saat dipakai pengguna) bila yt-dlp / impersonasi tidak berfungsi
RUN yt-dlp --version && python3 -c "import curl_cffi; print('curl_cffi', curl_cffi.__version__)" && python3 -c "import fitz, pdf2docx; print('pdf2word ok')" && (yt-dlp --list-impersonate-targets 2>&1 | head -8 || true)
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: dependensi tidak boleh menjalankan skrip install (rantai pasok)
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY --chown=node:node . .
# Kompres aset statis (.br/.gz) sekali saat build, bukan tiap cold start di instance yang lambat
USER node
RUN node server.js --precompress && ls public/*.br >/dev/null
EXPOSE 3000
CMD ["node", "server.js"]
