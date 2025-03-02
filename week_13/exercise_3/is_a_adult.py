from datetime import date


class User:
    date_of_birth: date

    def __init__(self, date_of_birth, name):
        self.date_of_birth = date_of_birth
        self.name = name

    
    @property
    def age(self):
        today = date.today()
        adult_age = today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))
        return adult_age



def age_validation(func):
    def adult_benefits(user, *args):
        print(f"{user.name} you are {user.age}")
        
        if user.age >= 18:
            #this print was used to follow the process
            #print(f"Using: {user}")
            func(user)
        else:
            print("You can't have adult benefits yet\n")
        #return func(user, *args)
    return adult_benefits


@age_validation
def can_drink_alcohol(user):
    #instructions to get id
    return print("Yes, you can have alcoholic beverages\n")


@age_validation
def can_drive(user):
    #instructions to get vehicle license
    return print("Yes, you can have a vehicle license\n")


def main():
    my_user_2 = User(date(2000, 11, 28), "Rodrigo Benetiz")
    can_drink_alcohol(my_user_2)
    can_drive(my_user_2)

    my_user_2 = User(date(2007, 10, 17), "Carlos Fonseca")
    can_drink_alcohol(my_user_2)
    can_drive(my_user_2)


main()