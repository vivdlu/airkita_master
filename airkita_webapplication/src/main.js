
// import { Airkita } from './airkita.js';
// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
// import JustGage from 'justgage';
// import * as url from './images/akitamoods.jpeg';
// import * as logo from './images/logo.png';

// let img = new Image();
// img.src = url.default;
// img.onload = function() {
//   init();
// };

// document.getElementById("logo").src = logo;
// let canvas = document.querySelector('canvas');
// let ctx = canvas.getContext('2d');

// function init() {
//   ctx.drawImage(img, 400, 500, 800, 800, 0, 0, 200, 200);
// }


// let airkita = new Airkita();

// var gauge = new JustGage({
//   id: "gauge", // the id of the html element
//   value: 0,
//   min: 0,
//   max: 1000,
//   decimals: 2,
//   gaugeWidthScale: 0.6
// }); 

// $(document).ready(function() { 
//   let promise = airkita.getData();
//   promise.then(function(response) {
//     const body = JSON.parse(response);
//     console.log(body[0]);         
//     gauge.refresh(body[0].value);
//   });  

//   setInterval(function() {
//     let promise = airkita.getData();
//     promise.then(function(response) {
//       const body = JSON.parse(response);
//       gauge.refresh(body[0].value);
//     });
//   },
//   2000); 
// });


import { Airkita } from './airkita.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import JustGage from 'justgage';

import * as barking_akita from '../images/barking_akita.png';
import * as pooping_akita from '../images/pooping_akita.png';
import * as alert_akita from '../images/alert_akita.png';
import * as not_really_alert_akita from '../images/not_really_alert_akita.png';
import * as low_alertness_akita from '../images/low_alertness_akita.png';
import * as lounging_akita from '../images/lounging_akita.png';
import * as sleeping_akita from '../images/sleeping_akita.png';
import * as playing_akita from '../images/playing_akita.png';

import * as logo from './images/logo.png';


document.getElementById("logo").src = logo;

let akita_img = document.getElementById('akita');

function setAkitaImg(reading) {
  if (reading <= 10) {
    // happy akita
    let randdoggo = Math.floor(Math.random()*3);
    if (randdoggo == 0) {
      akita_img.src = lounging_akita.default;
    } else if (randdoggo == 1) {
      akita_img.src = sleeping_akita.default;
    } else if (randdoggo == 2) {
      akita_img.src = playing_akita.default;
    }
  } else if (reading <= 50) {
    let randdoggo = Math.floor(Math.random()*2);
    if (randdoggo == 0) {
      akita_img.src = low_alertness_akita.default;
    } else if (randdoggo == 1) {
      akita_img.src = not_really_alert_akita.default;
    }
  } else if (reading <= 75) {
    akita_img.src = alert_akita.default;
  } else {
    akita_img.src = barking_akita.default;
  }
}

let airkita = new Airkita();

var gauge = new JustGage({
  id: "gauge", // the id of the html element
  value: 0,
  min: 0,
  max: 1000,
  decimals: 2,
  gaugeWidthScale: 0.6,
  label: "ppb TVOC"
}); 

$(document).ready(function() { 
  let promise = airkita.getData();
  promise.then(function(response) {
    const body = JSON.parse(response);
    setAkitaImg(body[0].value);      
    gauge.refresh(body[0].value);
  }, () => {
    akita_img.src = pooping_akita.default;
  }); 

  setInterval(function() {
    let promise = airkita.getData();
    promise.then(function(response) {
      const body = JSON.parse(response);
      setAkitaImg(body[0].value); 
      gauge.refresh(body[0].value);
    }, () => {
      akita_img.src = pooping_akita.default;
    });
  },
  2000); 
});