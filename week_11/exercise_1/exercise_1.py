from math import pi

class Circle:
    
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        area = round(pi*(self.radius**2),2)
        return area

circle_area_1 = Circle(5)
print(circle_area_1.get_area())