# TinyTools

TinyTools is a small web toolbox with three tools: a media downloader, a PDF-to-Word converter, and a QR code maker.

## Video Downloader
Paste a public media URL from a platform supported by `yt-dlp`. The downloader exposes available video/audio formats and does not require the site to be hard-coded in the UI.

## PDF to Word
Upload a text-based PDF and get an editable Word file (.docx). Conversion runs on the server with `pdf2docx`; the PDF is deleted as soon as it is converted.

## QR Maker
Create QR codes for links, text, Wi-Fi, and WhatsApp. Codes are generated in the browser.

## Deployment
The included Dockerfile installs FFmpeg, yt-dlp nightly, and PDF tooling.
