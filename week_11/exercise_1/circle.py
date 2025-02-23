from math import pi

class Circle:
    
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        area = round(pi*(self.radius**2),2)
        return area

circle_area_1 = Circle(5)
print(f"\nThe area of the circle is: {circle_area_1.get_area()}")