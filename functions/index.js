const path = require('path');
const fs = require('fs');
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const publicPath = path.join(__dirname, 'public');
const app = express();

const firebaseApp = firebase.initializeApp( functions.config().firebase );

function getDetails(idEjercicio, idVersion, data) {
    let versionEjercicio = idVersion === 'vt' ? 
        firebaseApp.database().ref(`variables/${idEjercicio}`).once('value') :
        firebaseApp.database().ref(`versiones/${idEjercicio}/${idVersion}`).once('value');
    Promise.all([
        versionEjercicio,
        firebaseApp.database().ref(`enunciados/${idEjercicio}`).once('value')
    ]).then(([versionSnapshot, enunciadosSnapshot]) => {
        let version, fnsEnunciados = [];
        enunciadosSnapshot.forEach(childSnapshot => {
            fnsEnunciados.push(Object.assign({}, { id: childSnapshot.key }, childSnapshot.val()));
        });
        if(idVersion !== 'vt') {
            version = versionSnapshot.val();
        } else {
            version = {
                id: 'vt'
            };
            versionSnapshot.forEach(childSnapshot => {
                version[childSnapshot.val().nombre] = childSnapshot.val().vt;
            });
            /*for(let variable of versionSnapshot.val()) {
                version[variable.nombre] = variable.vt;
            }
            Object.keys(childSnapshot.val()).map(key => ({
                id: key,
                ...childSnapshot.val()[key]
            }))*/
        }
        const datos = {
            version,
            fnsEnunciados
        }
        let datosJSON = JSON.stringify(datos);
        data(`<script>window._datos_=${datosJSON};console.log(window._datos_);</script>`);
    }).catch(error => {
        console.log(error);
    });
}

app.use(express.static(publicPath));

app.get('/api/ejercicio/:idejercicio/:idversion', (req, res) => {
    fs.readFile('./public/iframe.html', 'utf8', function (err, data) {
        if (err) {
            res.send();
        }
        const idEjercicio = req.params.idejercicio;
        const idVersion = req.params.idversion;
        getDetails(idEjercicio, idVersion, function(script){
            let html = data.replace('{_DATOS_}', script);
            res.send(html);
        });
    });
});

exports.app = functions.https.onRequest(app);
