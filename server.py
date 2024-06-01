from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

'''import serial as s'''
import schedule
import time
import json
import threading
# import multiprocessing
import os
'''
ser = s.Serial(
    port='COM5',
    baudrate=9600,
    timeout=1
            )
time.sleep(2)'''


all_meals = []
#################### CLASSES
class Meal:
    def __init__(self, name, hours, minutes, pills):
        self.name = name
        if(hours < 10):
            self.hours = f'0{hours}'
        else:
            self.hours = hours
        
        if(minutes < 10):
            self.minutes = f'0{minutes}'
        else:
            self.minutes = minutes

        self.pills = pills


        schedule.every().day.at(f'{self.hours}:{self.minutes}').do(dispense, pills=self.pills)

class Pill:
    def __init__(self, name, container):
        self.name = name
        self.container = container
        match container:
            case "1":
                self.container_angle = 36
            case "2":
                self.container_angle = 72
            case "3":
                self.container_angle = 108
            case "4":
                self.container_angle = 144
            case "5":
                self.container_angle = 180
            case _:
                print("Error")

#################### AUXILIAR

def dispense(pills):
    print("Sending data to Arduino...")
    angles = [str(pill.container_angle) for pill in pills]
    angles = (',').join(angles)
    print(angles)
    #write(angles)


def list():
    i = 1
    for meal in all_meals:
        print(f'{i}. {meal.name}')
        print(f'\tTime: {meal.hours}:{meal.minutes}')
        print(f'\tPills')
        [print(f'\t  Name: {pill.name}\tContainer: {pill.container}\tAngle: {pill.container_angle}') for pill in meal.pills]
        i+=1

#################### READ WRITE TO ARDUINO
def read():
    #data = ser.readline()
    return data.decode().strip()

def write(msg):
    #ser.write(bytes(msg, 'utf-8'))
    time.sleep(2)

#################### READ WRITE TO FILE
### CREATE FILE
def create_file():
    data = {
        "meals":[

        ]
    }
    with open("meals.json", "w") as json_file:
        json.dump(data, json_file, indent=4)

### LOAD FROM FILE TO STORE AS OBJECTS
def load_to_class():
    mealData = load_file()
    for meal in mealData["meals"]:
        pillsData = [Pill(pill_data["name"], pill_data["container"]) for pill_data in meal["pills"]]
        mealObj = Meal(meal["name"],int(meal["hours"]),int(meal["minutes"]),pillsData)
        all_meals.append(mealObj)

### LOAD FROM FILE
def load_file():
    with open("meals.json", "r") as json_file:
        return json.load(json_file)

def save_file(data):
    with open("meals.json", "w") as json_file:
        json.dump(data, json_file, indent=4)

### SAVE MEAL TO FILE
def save_meal(meal):
    all_meals.append(meal)
    new_data = {
        "name": meal.name,
        "hours": meal.hours,
        "minutes": meal.minutes,
        "pills":
        [
            {
                "name": pill.name,
                "container": pill.container,
                "container_angle": pill.container_angle,
            }
            for pill in meal.pills
        ]
    }

    data = load_file()
    data["meals"].append(new_data)

    save_file(data)

def add_pills_to_meal(meal_index, pills):
    for pill in pills:
        all_meals[meal_index].pills.append(pill)

    data = load_file()
    data["meals"][meal_index]["pills"].append(
        {
            "name": pill.name,
            "container": pill.container,
            "container_angle": pill.container_angle,
        }
        for pill in pills
    )

    save_file(data)

#################### CREATE MEALS AND PILLS
### PILLS
def create_pills(pills_info):
    pills = []

    for pill in pills_info:
        pill = Pill(pill['name'], pill['container'])
        pills.append(pill)
    return pills

### MEALS
def create_meal(meal_info):
    pills = create_pills(meal_info['pills'])

    meal = Meal(
      meal_info['name'],
      meal_info['hours'],
      meal_info['minutes'],
      pills
    )

    save_meal(meal)

############################ SCHEDULING DISPENSER


def background_task():
    print("Waiting for time to dispense")
    while True:
        schedule.run_pending()
        time.sleep(1)

############################ MENU
def main():
    
    if(os.path.exists("meals.json")):
        load_to_class()
    else:
        create_file()
        

    t = threading.Thread(target=background_task)
    t.daemon = True
    t.start()

    app.run()
    
@app.route('/meals', methods=['GET'])
def get_meals():
    return load_file()

@app.route('/meals', methods=['POST'])
def add_meal():
  new_meal = request.json
  for meal in all_meals:
    if meal.name == new_meal['name']:
      return jsonify({'message': 'Meal already exists'}), 400

  create_meal(new_meal)
  return jsonify({'message': 'Meal added successfully'}), 201

@app.route('/pills', methods=['POST'])
def add_pills():
  new_pills = request.json

  for i, meal in all_meals:
    if meal.name == new_pills['meal']:
      add_pills_to_meal(i, create_pills(new_pills['pills']))
      return jsonify({'message': 'Pills added successfully'}), 201
  return jsonify({'message': 'Pills added successfully'}), 201

if __name__ == '__main__':
    
    main()