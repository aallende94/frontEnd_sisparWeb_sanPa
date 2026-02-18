# templateAngular



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin http://gitlab.consolidada.com.py/root/templateangular.git
git branch -M master
git push -uf origin master
```

## Pasos para desplegar Angular en GitHub Pages
# Instala la dependencia en tu proyecto:

## bash
npm install -g angular-cli-ghpages
## Configura tu proyecto Angular para producción:

## bash
ng build --configuration production --base-href "https://TU_USUARIO.github.io/TU_REPOSITORIO/"
## Reemplaza TU_USUARIO por tu usuario de GitHub.

## Reemplaza TU_REPOSITORIO por el nombre del repositorio donde está tu proyecto.

## Publica en GitHub Pages:

## bash
npx angular-cli-ghpages --dir=dist/TU_PROYECTO
## dist/TU_PROYECTO es la carpeta que se genera al hacer el build.

## Verifica la URL pública

## Tu aplicación quedará disponible en:

## Código
https://TU_USUARIO.github.io/TU_REPOSITORIO/
## Consideraciones importantes
## Tu repositorio debe estar en GitHub y ser público.

## GitHub Pages solo sirve contenido estático, por lo que Angular debe estar compilado en modo producción.

## Si usas rutas (RouterModule), asegúrate de configurar correctamente el base-href y considerar un 404.html para redirecciones.

