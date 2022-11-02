#!/bin/zsh

function runCommand() {
    for d in ../../microservices/*/ ; do /bin/zsh -c "(cd "$d" && "$@")"; done
}

runCommand "npm i && (docker-compose up -d || docker compose up -d)"