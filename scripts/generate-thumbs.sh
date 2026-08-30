#!/bin/bash
# One-off script to generate small, compressed index-page image variants.
# Run manually with: bash scripts/generate-thumbs.sh
# Originals in images/ are left untouched (still used at full quality on project detail pages).
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p images/thumbs

MAX_DIM=1000
PRIMARY_QUALITY=82
HOVER_QUALITY=60

# name:targetExt:role — targetExt differs from source ext when converting
# alpha-less PNGs to JPEG for better compression. role is "primary" (always
# fully visible, gets higher quality) or "hover" (only peeks out rotated
# behind the primary image, can stay leaner).
FILES=(
  "vattenlilja-mikael-westman-01.jpg:jpg:primary"
  "vattenlilja-mikael-westman-03.jpg:jpg:hover"
  "goblin-lamp-mikael-westman-02.jpg:jpg:primary"
  "goblin-lamp-mikael-westman-01.jpg:jpg:hover"
  "stool-thumb.jpg:jpg:primary"
  "stool-mikael-westman-03.jpg:jpg:hover"
  "hallway-bench-mikael-westman-05.jpg:jpg:primary"
  "hallway-bench-mikael-westman-15.jpg:jpg:hover"
  "pelican-spoon-mikael-westman-02.jpg:jpg:primary"
  "pelican-spoon-mikael-westman-01.jpg:jpg:hover"
  "rolo-radio_mikael-westman_thumbnail.jpg:jpg:primary"
  "rolo-radio_mikael-westman_01.png:jpg:hover"
  "3d-lighter-mikael-westman.jpg:jpg:primary"
  "3d-pingpong-mikael-westman.jpg:jpg:hover"
  "variable-font-thumb.png:png:primary"
  "variable-font-01.png:png:hover"
  "flag-eurasia-mikael-westman.jpg:jpg:primary"
  "flag-hellas-mikael-westman.jpg:jpg:hover"
  "square-mikael-westman-04.png:jpg:primary"
  "sq-rst-3.jpg:jpg:hover"
  "pos-mikael-westman-01.png:jpg:primary"
  "pos-mikael-westman-02.png:jpg:hover"
  "Epidemic-Sound-Artist.jpg:jpg:primary"
  "Epidemic-Sound-Feed.jpg:jpg:hover"
)

for entry in "${FILES[@]}"; do
  src="${entry%%:*}"
  rest="${entry#*:}"
  ext="${rest%%:*}"
  role="${rest#*:}"
  base="${src%.*}"
  out="images/thumbs/${base}.${ext}"

  quality="$HOVER_QUALITY"
  if [ "$role" = "primary" ]; then
    quality="$PRIMARY_QUALITY"
  fi

  cp "images/$src" "$out"

  if [ "$ext" = "jpg" ]; then
    sips -s format jpeg -s formatOptions "$quality" -Z "$MAX_DIM" "$out" >/dev/null
  else
    sips -s format png -Z "$MAX_DIM" "$out" >/dev/null
  fi

  before=$(stat -f%z "images/$src")
  after=$(stat -f%z "$out")
  dims=$(sips -g pixelWidth -g pixelHeight "$out" | awk '/pixelWidth|pixelHeight/{printf "%s ", $2}')
  echo "[$role, q=$quality] $src: ${before} -> ${after} bytes (${dims})"
done
