from abc import ABC, abstractmethod
from math import pi


class Shape(ABC):
    
    def __init__(self):
        pass

    @abstractmethod
    def calculate_perimeter(self):
        pass


    @abstractmethod
    def calculate_area(self):
        pass


class Circle(Shape):

    def __init__(self, diameter, radius):
        self.diameter = diameter
        self.radius = radius
        

    def calculate_perimeter(self):
        perimeter = round(pi*self.diameter, 2)
        return perimeter
    

    def calculate_area(self):
        area = round(pi*(self.radius**2),2)
        return area
    

class Square(Shape):

    def __init__(self, side):
        self.side = side


    def calculate_perimeter(self):
        perimeter = 4 * self.side
        return perimeter
    

    def calculate_area(self):
        area = self.side * self.side
        return area
    

class Rectangle(Shape):

    def __init__(self, length, width):
        self.length = length
        self.width = width


    def calculate_perimeter(self):
        perimeter = 2 * (self.length + self.width)
        return perimeter
    

    def calculate_area(self):
        area = self.length * self.width
        return area
    

def menu():
    print("""
        Choose a shape:
            1. Circle
            2. Square
            3. Rectangle
            4. Exit
        """)
    
    validation = True
    while validation == True:
        try:
            option = int(input("Choose an option: "))
            while((option<=0) or (option>4)):
                print("\033[3;31mOption must be number in the menu\033[0m")
                option = int(input("Choose an option: "))
            validation = False
        except ValueError as error:
            print("\033[3;31mPlease ONLY numbers\033[0m")
    
    return option


def inputs_actions():
    option = menu()

    if option == 1:
        radius_validation = True
        while radius_validation == True:
            try:
                radius = int(input("Digit the radius: "))
                radius_validation = False
            except ValueError as error:
                print("\033[3;31mPlease ONLY numbers\033[0m")
        
        diameter = radius * 2
        print(f"The diameter is: {diameter}")

        circle = Circle(diameter, radius)
        print(f"The perimeter of the circle is: {circle.calculate_perimeter()}")
        print(f"The area of the circle is: {circle.calculate_area()}")

    elif option == 2:
        side_validation = True
        while side_validation == True:
            try:
                side = int(input("Digit the side: "))
                side_validation = False
            except ValueError as error:
                print("\033[3;31mPlease ONLY numbers\033[0m")

        square = Square(side)
        print(f"The perimeter of the square is: {square.calculate_perimeter()}")
        print(f"The area of the square is: {square.calculate_area()}")

    elif option == 3:
        length_validation = True
        while length_validation == True:
            try:
                length = int(input("Digit the length: "))
                length_validation = False
            except ValueError as error:
                print("\033[3;31mPlease ONLY numbers\033[0m")

        width_validation = True
        while width_validation == True:
            try:
                width = int(input("Digit the width: "))
                width_validation = False
            except ValueError as error:
                print("\033[3;31mPlease ONLY numbers\033[0m")

        rectangle = Rectangle(length, width)
        print(f"The perimeter of the rectangle is: {rectangle.calculate_perimeter()}")
        print(f"The area of the rectangle is: {rectangle.calculate_area()}")

    elif option == 4:
            print("Thanks for using Shapes!\n")
            exit()


def main():
    validation = True
    while validation == True:
        inputs_actions()


main()