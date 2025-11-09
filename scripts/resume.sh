#!/usr/bin/env bash
set -euo pipefail

# Build LaTeX resume into a dedicated build directory
pdflatex -output-directory build --jobname=PontheaZahraii docs/resume.tex
