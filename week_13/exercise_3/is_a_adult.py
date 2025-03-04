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
    def wrapper(user, *args, **kwargs):
        print("\nPerforming the decorated function...")
        print(f"{user.name} you are {user.age}")
        
        try:
            if user.age < 18:
                raise ValueError("You can't have adult benefits yet")
        
        except ValueError as error:
            print(f"Warning: {error}")
            print("Interrupting the decorated function.")
            return

        result = func(user, *args, **kwargs)
        print("Finishing execution of the decorated function.")
        return result
    return wrapper


@age_validation
def can_drink_alcohol(user):
    print("Yes, you can have alcoholic beverages")
    #instructions to get id


@age_validation
def can_drive(user):
    print("Yes, you can have a vehicle license")
    # instructions to get vehicle license


def main():
    my_user_2 = User(date(2000, 11, 28), "Rodrigo Benitez")
    can_drink_alcohol(my_user_2)
    can_drive(my_user_2)

    my_user_2 = User(date(2007, 10, 17), "Carlos Fonseca")
    can_drink_alcohol(my_user_2)
    can_drive(my_user_2)


main()