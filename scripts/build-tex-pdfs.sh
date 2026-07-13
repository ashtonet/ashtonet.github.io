#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/public"
OUTPUT_DIR="$ROOT_DIR/public/generated-pdfs"
DOCS=("cv" "resume")

if command -v latexmk >/dev/null 2>&1; then
  COMPILER="latexmk"
elif command -v pdflatex >/dev/null 2>&1; then
  COMPILER="pdflatex"
else
  cat >&2 <<'EOF'
Could not find a LaTeX compiler.

Install either latexmk or pdflatex, then run:
  npm run build:pdfs

On macOS, MacTeX or TinyTeX are common options.
EOF
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
BUILD_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/ashtonet-tex-build.XXXXXX")"
trap 'rm -rf "$BUILD_ROOT"' EXIT

for DOC in "${DOCS[@]}"; do
  TEX_FILE="$SOURCE_DIR/$DOC.tex"
  BUILD_DIR="$BUILD_ROOT/$DOC"
  mkdir -p "$BUILD_DIR"

  if [[ ! -f "$TEX_FILE" ]]; then
    echo "Missing TeX source: $TEX_FILE" >&2
    exit 1
  fi

  case "$COMPILER" in
    latexmk)
      (
        cd "$SOURCE_DIR"
        latexmk -pdf -interaction=nonstopmode -halt-on-error -outdir="$BUILD_DIR" "$DOC.tex"
      )
      ;;
    pdflatex)
      (
        cd "$SOURCE_DIR"
        pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$BUILD_DIR" "$DOC.tex"
        pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$BUILD_DIR" "$DOC.tex"
      )
      ;;
  esac

  cp -f "$BUILD_DIR/$DOC.pdf" "$OUTPUT_DIR/$DOC.pdf"
  echo "Wrote $OUTPUT_DIR/$DOC.pdf"
done
