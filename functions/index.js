const path = require('path');
const fs = require('fs');
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const publicPath = path.join(__dirname, 'public');
const app = express();

const firebaseApp = firebase.initializeApp( functions.config().firebase );

function getDetails(idEjercicio, idVersion, data) {
    Promise.all([
        firebaseApp.database().ref(`versiones/${idEjercicio}/${idVersion}`).once('value'),
        firebaseApp.database().ref(`enunciados/${idEjercicio}`).once('value')
    ]).then(([versionSnapshot, enunciadosSnapshot]) => {
        const fnsEnunciados = [];
        enunciadosSnapshot.forEach((childSnapshot) => {
            fnsEnunciados.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        const datos = {
            version: versionSnapshot.val(),
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
