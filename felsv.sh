#!/bin/bash

# Declaracion de variables
back_s="backend_session"
front_s="frontend_session"
consiti_felsv_back_url="https://felsv.s3.us-east-2.amazonaws.com/consiti-felsv.zip"
env_template_url="https://felsv.s3.us-east-2.amazonaws.com/env-template"
# Declaracion de funciones
function control-errores() {
    if [ $? -ne 0 ]; then
        touch log-error.txt
        echo "Error de ejecucion! en la linea $LINENO" >> log-error.txt
    fi
}

function front-dev() {
    echo "Iniciando dev Frontend"
    tmux send-keys -t $front_s "git clone https://github.com/D4rk61/ReactJS-login.git" C-m
    tmux send-keys -t $front_s "mv ReactJS-login consiti-felsv-frontend ; cd consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "npm install ; npm run dev" C-m
    control-errores

}

function front-prod() {
    echo "Iniciando prod Frontend"
    tmux send-keys -t $front_s "git clone https://github.com/D4rk61/ReactJS-login.git" C-m
    tmux send-keys -t $front_s "mv ReactJS-login consiti-felsv-frontend ; cd consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "docker build -t consiti-felsv-consiti-fe ." C-m
    tmux send-keys -t $front_s "docker run -pd 80:80 consiti-felsv-consiti-fe:latest" C-m
    control-errores
}

function back-dev() {
    echo "Iniciando dev Backend"
    tmux send-keys -t $back_s "mv consiti-felsv consiti-felsv-backend ; mv env-template consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "mv env-template .env" C-m
    # Ejecucion de make
    tmux send-keys -t $back_s "sudo make start ; sudo make ssh-nest" C-m
    # dentro de la terminal ssh-nest
    tmux send-keys -t $back_s "docker exec -it nest-consiti bash -c 'npm install ; npm run start:dev'" C-m
    control-errores
}

function back-prod() {
    echo "Iniciando prod Backend"
    tmux send-keys -t $back_s "mv consiti-felsv consiti-felsv-backend ; mv env-template consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "mv env-template .env" C-m
    # Ejecucion de make
    tmux send-keys -t $back_s "sudo make start ; sudo make ssh-nest" C-m
    # dentro de la terminal ssh-nest
    tmux send-keys -t $back_s"docker exec -it nest-consiti bash -c 'npm install ; npm run start:prod'" C-m
    control-errores
}

function create-tmux-sessions() {
    echo "creando sessiones"
    tmux start-server
    tmux new-session -d -s $back_s
    tmux new-session -d -s $front_s
    echo "sessiones creadas"
}

function prepair-env() {
    echo "Instalando herramientas"
    mkdir felsv-project
    cd felsv-project
    wget $env_template_url
    wget $consiti_felsv_back_url
    unzip consiti-felsv.zip
}


function tool-install() {
    echo "Instalando cosas"
    # Instalacion de herramientas
    DEBIAN_FRONTEND=noninteractive apt update -y ; apt install -y git unzip ca-certificates curl gnupg nodejs npm make tmux || control-errores
    sudo install -m 0755 -d /etc/apt/keyrings || control-errores

    # Llamada a la instalacion de docker
    docker-install-funct
}

function docker-install-funct() {
    echo "Instalando docker"
    # Instalacion de docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg || control-errores

    echo \
      "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null || control-errores

    DEBIAN_FRONTEND=noninteractive apt update -y || control-errores

    DEBIAN_FRONTEND=noninteractive apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose || control-errores

    # Llamada a la post-instalacion de docker
    echo "Finalizacion exitosa de instalacion de docker"
    docker-post-install-funct
}

function docker-post-install-funct() {
    echo "postinstalacion de docker"
    # Post-instalacion de docker
    if ! getent group docker >/dev/null; then
        sudo groupadd docker
    fi
    sudo usermod -aG docker $USER
    newgrp docker
    echo "postinstalacion exitosa"
}

function activate-dev-profile() {
    echo "Activando el perfil dev"
    # Llamada al backend
    back-dev
    sleep 5
    # Llamada al frontend
    front-dev
}
function activate-prod-profile() {
    echo "Activando el perfil back"
    # Llamada al backend
    back-prod
    sleep 5
    # Llamada al frontend
    front-prod
}

function main() {
    # Ejecutando llamada a funciones
    tool-install
    sleep 5
    prepair-env

    # Funcion que crea las sessiones para los 2 despliegues
    create-tmux-sessions
    sleep 2
    if [ "$#" -eq 0 ]; then
        # Si no hay argumentos por defecto, instalara el modo dev
        activate-dev-profile

    elif [ "$1" == "--prod" ]; then
        activate-prod-profile

    elif [ "$1" == "--dev" ]; then
        activate-dev-profile

    else
        activate-dev-profile
    fi
}
main
