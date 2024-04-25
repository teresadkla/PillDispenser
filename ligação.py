import serial as s  # Importing the serial library and aliasing it as 's'
import schedule  # Importing the schedule library for task scheduling
import time  # Importing the time library for time-related functions

# Initializing the serial connection with Arduino
ser = s.Serial(
        port='COM5',  # Specify the COM port, change it according to your setup
        baudrate=9600,  # Specify the baud rate
        timeout=0.1  # Specify the timeout
    )

# Class representing a meal with scheduled pill dispensing
class Meal:
    def __init__(self, name, hours, minutes, pills):
        self.name = name  # Name of the meal
        self.hours = hours  # Hour of the meal
        self.minutes = minutes  # Minutes of the meal
        self.pills = pills  # List of pills to be dispensed with the meal
        
        # Scheduling the meal to dispense pills at specified time
        schedule.every().day.at(f'{self.hours}:{self.minutes}').do(dispense, pills=self.pills)

# Class representing a pill
class Pill:
    def __init__(self, name, container):
        self.name = name  # Name of the pill
        # Determining the container angle based on input container number
        if container == "1":
            self.container_angle = 36
        elif container == "2":
            self.container_angle = 72
        elif container == "3":
            self.container_angle = 108
        elif container == "4":
            self.container_angle = 144
        elif container == "5":
            self.container_angle = 180
        else:
            print("Error")  # Print error message if container number is invalid

# Function to dispense pills
def dispense(pills):
    print("Sending data to Arduino...")  # Printing message
    # Extracting container angles for each pill and joining them into a string
    angles = [str(pill.container_angle) for pill in pills]
    angles = (',').join(angles)
    write(angles)  # Sending angles to Arduino for dispensing

# Function to read data from serial connection
def read():
    data = ser.readline()  # Reading data from serial connection
    return data.decode().strip()  # Decoding bytes to string and stripping whitespace

# Function to write data to serial connection
def write(msg):
    ser.write(bytes(msg, 'utf-8'))  # Writing message to serial connection
    time.sleep(2)  # Delay to allow Arduino to process the message

# Main function
def main():
    # Getting input for first pill
    name = input("Set name for pill: ")
    container = input("Set container: ")
    pill1 = Pill(name, container)
    # Getting input for second pill
    name = input("Set name for pill: ")
    container = input("Set container: ")
    pill2 = Pill(name, container)
    
    # Getting input for meal
    name = input("Set name for meal: ")
    hour = input("Set hour: ")
    min = input("Set minutes: ")
    pills = [pill1, pill2]  # Creating a list of pills for the meal
    meal1 = Meal(name, hour, min, pills)  # Creating a meal object
    
    # Main loop to run scheduled tasks
    while True:
        schedule.run_pending()  # Running pending scheduled tasks
        time.sleep(1)  # Adding a short delay to reduce CPU usage

# Entry point of the program
if __name__ == "__main__":
    main()  # Calling the main function when the script is executed
