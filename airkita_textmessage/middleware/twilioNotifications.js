var twilioClient = require('../twilioClient');
var fs = require('fs');
var admins = require('../config/administrators.json');

function formatMessage(airToReport) {
  return '\n🐕 Bark! Bark! 🐕 \nAirkita says: Danger! Air quality is reaching dangerous levels!';
   // + 'ppm: ' + airToReport; // TODO add ppm: level from app
};

exports.notifyOnHighVtoc = function(vtocMeasurement, request, response, next) {
  admins.forEach(function(admin) {
    var messageToSend = formatMessage(vtocMeasurement.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(vtocMeasurement);
};
