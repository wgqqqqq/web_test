#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository."
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "Error: rsync is required."
  exit 1
fi

ORIGIN_URL="$(git config --get remote.origin.url || true)"
REPO_NAME=""
if [[ -n "$ORIGIN_URL" ]]; then
  REPO_NAME="$(basename "$ORIGIN_URL")"
  REPO_NAME="${REPO_NAME%.git}"
fi

BASE_PATH="${BASE_PATH:-}"
if [[ -z "$BASE_PATH" ]]; then
  if [[ -z "$REPO_NAME" ]]; then
    echo "Error: cannot infer repo name; set BASE_PATH, e.g. BASE_PATH=/web_test/"
    exit 1
  fi
  if [[ "$REPO_NAME" == *.github.io ]]; then
    BASE_PATH="/"
  else
    BASE_PATH="/${REPO_NAME}/"
  fi
fi

echo "Using BASE_PATH=$BASE_PATH"

echo "Building…"
BASE_PATH="$BASE_PATH" npm -C website run build

WORKTREE_DIR="${WORKTREE_DIR:-/tmp/pages-website-branch}"
if [[ -e "$WORKTREE_DIR" ]]; then
  rm -rf "$WORKTREE_DIR"
fi

echo "Preparing worktree at $WORKTREE_DIR…"
git worktree add "$WORKTREE_DIR" -B website

echo "Syncing dist -> website branch root…"
rsync -a --delete --exclude ".git" website/dist/ "$WORKTREE_DIR/"
touch "$WORKTREE_DIR/.nojekyll"

cd "$WORKTREE_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
else
  git commit -m "Deploy site"
fi

echo
echo "Done. Push the website branch:"
echo "  git push -f origin website"
