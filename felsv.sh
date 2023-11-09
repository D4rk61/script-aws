#!/bin/bash

# Despliegue de Aplicacion backend y frontend consiti-felsv
#
# Author: Jose Reynoso
# Uso:
#
# El script por si solo al ejecutarse usara la bandera
#
# --dev     : esto hara que nuestra app entre en modo developer, no apta para
# produccion
#
# Por otro lado si queremos usar este script en un servidor real ya desplegar
# como tal la aplicacion, usaremos:
#
# --prod    : esto hara que nuestra app entre en modo despliegue
#
# Se inicializaria de la siguiente manera:
#
# $ chmod 774 felsv.sh
# $ ./felsv.sh --prod   : para produccion
# $ ./felsv.sh --dev    : para desarrollo
#

# Declaracion de variables
#
export DEBIAN_FRONTEND=noninteractive

back_s="backend_session"
front_s="frontend_session"
consiti_felsv_back_url="https://felsv.s3.us-east-2.amazonaws.com/consiti-felsv-new.zip"
env_template_url="https://felsv.s3.us-east-2.amazonaws.com/env-template"
# Declaracion de funciones
function control-errores() {
    if [ $? -ne 0 ]; then
        touch log-error.txt
        echo "Error de ejecucion! en la linea $LINENO" >> log-error.txt
        echo "Comando que falló: $BASH_COMMAND" >> log-error.txt
        echo "Código de salida: $?" >> log-error.txt
    fi
}

function front-dev() {
    echo -e "\e[32mActivando front dev\e[0m"
    tmux send-keys -t $front_s "git clone https://github.com/D4rk61/ReactJS-login.git" C-m
    tmux send-keys -t $front_s "mv ReactJS-login consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "sleep 2" C-m
    tmux send-keys -t $front_s "cd consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "npm install ; npm run dev" C-m
    control-errores

}

function front-prod() {
    echo -e "\e[32mActivando front prod\e[0m"
    tmux send-keys -t $front_s "git clone https://github.com/D4rk61/ReactJS-login.git" C-m
    tmux send-keys -t $front_s "mv ReactJS-login consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "sleep 2" C-m
    tmux send-keys -t $front_s "cd consiti-felsv-frontend" C-m
    tmux send-keys -t $front_s "docker build -t consiti-felsv-consiti-fe ." C-m
    tmux send-keys -t $front_s "docker run -pd 80:80 consiti-felsv-consiti-fe:latest" C-m
    control-errores
}

function back-dev() {
    echo -e "\e[32mActivando back dev\e[0m"
    tmux send-keys -t $back_s "mv consiti-felsv consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "sleep 2" C-m
    tmux send-keys -t $back_s "mv env-template consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "chmod 777 -R consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "cd consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "mv env-template .env" C-m
    # Ejecucion de make
    tmux send-keys -t $back_s "sudo make start ; sudo make ssh-nest" C-m
    # dentro de la terminal ssh-nest
    tmux send-keys -t $back_s "sleep 10" C-m
    tmux send-keys -t $back_s "docker exec -it nest-consiti bash -c 'npm install ; npm run start:dev'" C-m
    control-errores
}

function back-prod() {
    echo -e "\e[32mActivando back prod\e[0m"
    tmux send-keys -t $back_s "mv consiti-felsv consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "mv env-template consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "chmod 777 -R consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "cd consiti-felsv-backend" C-m
    tmux send-keys -t $back_s "mv env-template .env" C-m
    # Ejecucion de make
    tmux send-keys -t $back_s "sudo make start ; sudo make ssh-nest" C-m
    # dentro de la terminal ssh-nest
    tmux send-keys -t $back_s "sleep 10" C-m
    tmux send-keys -t $back_s"docker exec -it nest-consiti bash -c 'npm install ; npm run start:prod'" C-m
    control-errores
}

function create-tmux-sessions() {
    echo -e "\e[32mCreando sessiones tmux\e[0m"
    tmux start-server
    tmux new-session -d -s $back_s
    tmux new-session -d -s $front_s
    echo -e "\e[32mSessiones creadas!\e[0m"

}

function prepair_env() {
    echo -e "\e[32mPreparando entorno y wget\e[0m"

    mkdir felsv-project
    cd felsv-project
    wget $env_template_url
    wget $consiti_felsv_back_url
    unzip consiti-felsv-new.zip
}


function tool-install() {
    echo -e "\e[32mInstalando lo necesario\e[0m"

    # Instalacion de herramientas
    DEBIAN_FRONTEND=noninteractive apt update -y ; apt install -y git unzip ca-certificates curl gnupg npm make tmux xz-utils aptitude || control-errores
    DEBIAN_FRONTEND=noninteractive sudo install -m 0755 -d /etc/apt/keyrings || control-errores

    # Instalacion de nodejs
    node-install-funct
    echo -e "\e[32mInstalacion completa de nodejs\e[0m"
    # Llamada a la instalacion de docker
    docker-install-funct
    echo -e "\e[32mInstalacion completa de docker-compose\e[0m"

}

function docker-install-funct() {
    echo -e "\e[32mInstalando docker\e[0m"

    # Instalacion de docker
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg || control-errores

    echo \
      "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null || control-errores

    DEBIAN_FRONTEND=noninteractive apt update -y || control-errores

    DEBIAN_FRONTEND=noninteractive apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin || control-errores

    # Llamada a la instalacion de docker-compose
    docker-compose-install-funct

    # Llamada a la post-instalacion de docker
    echo -e "\e[32mInstalacion de docker exitosa\e[0m"

    docker-post-install-funct
}


function docker-compose-install-funct() {
    DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
    mkdir -p $DOCKER_CONFIG/cli-plugins
    curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
    echo -e "\e[32mFinalizacion de instalacion de docker-compose\e[0m"
}


function docker-post-install-funct() {
    echo -e "\e[32mComenzando post-instalacion de docker\e[0m"

    # Post-instalacion de docker

    echo -e "\e[32mCreando grupo docker\e[0m"
    if ! getent group docker >/dev/null; then
        sudo groupadd docker
    fi
    echo -e "\e[32mFinalizacion de creacion grupo docker y asignando el grupo docker\e[0m"
    usermod -aG docker $USER
    #echo -e "\e[31ejecutando newgrp\e[0m"
    #newgrp docker
    #echo -e "\e[31finalizando newgrp\e[0m"
    echo -e "\e[32mFinalizacion de post-instalacion de docker\e[0m"


    # Cargar la configuración en el shell actual
    #source /etc/environment
}

function node-install-funct() {
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    . ~/.bashrc
    nvm install 20
    curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    DEBIAN_FRONTEND=noninteractive apt install nodejs -y
}

function activate-dev-profile() {
    echo -e "\e[32mActivando perfil dev\e[0m"

    # Llamada al backend
    back-dev
    sleep 5
    # Llamada al frontend
    front-dev
}
function activate-prod-profile() {
    echo -e "\e[32mActivando perfil prod\e[0m"

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
    prepair_env

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
