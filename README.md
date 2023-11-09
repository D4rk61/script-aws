# Despliegue de Aplicación Backend y Frontend Consiti-Felsv

Este script está diseñado para desplegar la aplicación Consiti-Felsv en distribuciones basadas en RHEL.

## Pre-instalación

Antes de ejecutar el script, necesitas instalar git y tmux, clonar el repositorio del script y darle permisos de ejecución al script. Aquí te muestro cómo:

```shell
cd /
yum install -y git tmux
dnf install -y tmux
git clone https://github.com/D4rk61/script-aws.git
cd script-aws
chmod 777 felsv-rhel.sh
```

###### Uso

El script se ejecuta con una de las dos banderas:

    -d: Esto pondrá nuestra aplicación en modo de desarrollo, no apto para producción.
    -p: Esto pondrá nuestra aplicación en modo de despliegue, apto para producción.

Para ejecutar el script, simplemente ejecútalo con la bandera deseada. Aquí te muestro cómo:

shell

./felsv-rhel.sh -p    # para producción
./felsv-rhel.sh -d    # para desarrollo

Funciones

###### El script contiene varias funciones que realizan tareas específicas:

- control-errores: Esta función verifica si el último comando ejecutado fue exitoso. Si no fue así, registra el error en un archivo de log.
- front-dev y front-prod: Estas funciones configuran el frontend para el desarrollo y la producción, respectivamente.
- back-dev y back-prod: Estas funciones configuran el backend para el desarrollo y la producción, respectivamente.
- create-tmux-sessions: Esta función crea sesiones tmux para los despliegues.
- prepair_env: Esta función prepara el entorno para el despliegue.
- tool-install: Esta función instala las herramientas necesarias para el despliegue.
- docker-install-funct, docker-compose-install-funct, docker-post-install-funct: Estas funciones manejan la instalación de Docker y Docker Compose.
- node-install-funct: Esta función maneja la instalación de Node.js.
- activate-dev-profile y activate-prod-profile: Estas funciones activan los perfiles de desarrollo y producción, respectivamente.

###### Variables

El script utiliza varias variables para configurar el despliegue:

- back_s y front_s: Estas variables contienen los nombres de las sesiones tmux para el backend y el frontend, respectivamente.
- consiti_felsv_back_url y env_template_url: Estas variables contienen las URLs para descargar el backend de Consiti-Felsv y la plantilla de entorno, respectivamente.

###### Conexión con Atlas de MongoDB

Para establecer una conexión con una base de datos en MongoDB Atlas, sigue los siguientes pasos:

1. **Autorizar la IP del servidor:** Asegúrate de que la dirección IP del servidor donde se ejecuta la aplicación esté autorizada para acceder a tu clúster en MongoDB Atlas. Puedes configurar esto desde la consola de MongoDB Atlas.

2. **Configurar el enlace en el archivo `env-template-prod`:** Abre el archivo `env-template-prod` y configura la variable `DATABASE_URL` con la URL de conexión a tu clúster en MongoDB Atlas. La URL debe seguir el formato estándar de conexión de MongoDB Atlas, que generalmente se ve así:

   ```shell
   DATABASE_URL=mongodb+srv://<username>:<password>@atlascluster.wr9udtq.mongodb.net/?retryWrites=true&w=majority


Autor

~Jose Reynoso.

