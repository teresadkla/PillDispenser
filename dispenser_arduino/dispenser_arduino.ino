#include <Servo.h>
#include "StringSplitter.h"

// sensor
#define echoPin 10
#define trigPin 11

//led
#define led 3

Servo up;
Servo down;
Servo doseador;
Servo gaveta;

int dispCounter = 0;
int itemCount = 0;
bool comprimidos = false;

int duration = 0;
int distance = 0;

int angle[6];
int i = 0;
String item;

void setup() {
  // SERVOS
  up.attach(5);
  down.attach(6);
  doseador.attach(7);
  gaveta.attach(8);

  //sensor
  pinMode(echoPin, INPUT);
  pinMode(trigPin, INPUT);
  
  //led
  pinMode(led, OUTPUT);

  Serial.begin(9600);
  Serial.setTimeout(2);
}

void loop() {
  // Receber quais os comprimidos a dispensar
  while(!Serial.available());
  item = Serial.readString();
  Serial.println(item);
  
  StringSplitter *splitter = new StringSplitter(item, ',', 6);
  itemCount = splitter->getItemCount();
  angle[itemCount];
  for(int i = 0; i < itemCount; i++){
    String num = splitter->getItemAtIndex(i);
    angle[i] = num.toInt();
    Serial.println(angle[i]);
  }

  while(itemCount > dispCounter){
    digitalWrite(led, HIGH);
    //Virar servo UP para o angulo do tubo
    up.write(angle[dispCounter]);
    delay(1000);
    
    //Virar doseador para o angulo do tubo
    doseador.write(angle[dispCounter]);
    delay(1000);

    //Virar servo UP para o angulo do tubo
    up.write(0);
    delay(1000);

    //Virar servo DOWN para o angulo do tubo
    down.write(angle[dispCounter]);
    delay(1000);

    // voltar todos as posiçoes iniciais
    doseador.write(0);
    down.write(0);
    
    //DEBUG
    Serial.println("Tou a dispensar");
    Serial.print("Angulo: ");
    Serial.println(angle[dispCounter]);
    
    dispCounter++;
  }


  if(dispCounter == itemCount){
    Serial.println("Comprimidos Dispensados\n");
    
    dispCounter = 0;
    comprimidos = true;
    digitalWrite(led, LOW);
  }

  // verificar se comprimidos foram dispensados
  if(comprimidos){
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH, 30000);
    //Calculate the distance (in cm) based on the speed of sound.
    distance = duration / 58.2;
    
    //verificar se e detetado movimento
    if(distance <= 10){
      // abrir porta
      gaveta.write(180);
      delay(10000);
      gaveta.write(0);
    }
  }
}