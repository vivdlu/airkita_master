// Adafruit IO Environmental Data Logger 
// Tutorial Link: https://learn.adafruit.com/adafruit-io-air-quality-monitor
//
// Adafruit invests time and resources providing this open source code.
// Please support Adafruit and open source hardware by purchasing
// products from Adafruit!
//
// Written by Brent Rubell for Adafruit Industries
// Copyright (c) 2018 Adafruit Industries
// Licensed under the MIT license.
//
// All text above must be included in any redistribution.

/************************** Adafruit IO Configuration ***********************************/

// edit the config.h tab and enter your Adafruit IO credentials
// and any additional configuration needed for WiFi, cellular,
// or ethernet clients.
#include "config.h"

/**************************** Sensor Configuration ***************************************/
#include <Wire.h>
#include <Adafruit_Sensor.h>

/**************************** Main Code ***************************************/
// Delay between sensor reads, in seconds
#define READ_DELAY 2

// Sensor Data
int tvocReading = 0;

AdafruitIO_Feed *tvocFeed = io.feed("tvoc");

void setup() {
  Serial.begin(115200);
  Serial.println("Go Team 10!");
 
  pinMode(LED_BUILTIN, OUTPUT);
 
  // connect to io.adafruit.com
  Serial.print("Connecting to Adafruit IO");
  io.connect();

  // wait for a connection
  while (io.status() < AIO_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(io.statusText());
}

void loop() {
  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  io.run();

  Serial.println("Reading Sensors...");

  // Read TVOC Data
  int sensorValue = analogRead(A0);

  Serial.print("TVOC: "); Serial.print(sensorValue); Serial.print(" ppb\t");

  // send data to Adafruit IO feeds
  tvocFeed->save(sensorValue);

  // delay the polled loop
  delay(READ_DELAY * 1000);
}
