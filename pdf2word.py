#!/usr/bin/env python3
"""PDF -> DOCX untuk PDF to Word. Dipanggil server.js:  pdf2word.py <input.pdf> <output.docx> <maks_halaman>

Kode keluar (dibaca server.js):  0 = berhasil, 2 = bukan PDF valid, 3 = dikunci password,
4 = PDF hasil scan (tanpa teks), 5 = terlalu banyak halaman, lainnya = gagal.
Progres dicetak ke stdout sebagai baris "PROGRESS <selesai>/<total>".
"""
import logging
import re
import sys


def main():
    src, dst, maxp = sys.argv[1], sys.argv[2], int(sys.argv[3])
    import fitz  # PyMuPDF, ikut terpasang bersama pdf2docx

    try:
        doc = fitz.open(src)
    except Exception:
        return 2
    try:
        if doc.needs_pass:
            return 3
        n = doc.page_count
        if n < 1:
            return 2
        if n > maxp:
            return 5
        chars = 0
        for page in doc:  # berhenti begitu ketemu cukup teks
            chars += len(page.get_text().strip())
            if chars > 40:
                break
        if chars <= 40:
            return 4
    finally:
        doc.close()

    from pdf2docx import Converter

    class Prog(logging.Handler):
        """pdf2docx mencatat '(i/n) Page i' di tiap tahap (analisis lalu pembuatan), jadi total = 2 x halaman."""

        def __init__(self):
            super().__init__()
            self.k = 0

        def emit(self, rec):
            try:
                if re.search(r"\((\d+)/(\d+)\)", rec.getMessage()):
                    self.k += 1
                    print(f"PROGRESS {min(self.k, 2 * n)}/{2 * n}", flush=True)
            except Exception:
                pass

    root = logging.getLogger()
    root.addHandler(Prog())
    root.setLevel(logging.INFO)

    cv = Converter(src)
    try:
        cv.convert(dst)
    finally:
        cv.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
