class Person:

    def __init__(self):
        pass


    def vital_functions(self):
        print("Breath")
        print("Eat")
        print("Can relate to the environment")
        print("Can reproduce")


class GraduateStudent:

    def __init__(self):
        pass


    def student_degrees(self):
        print("Degree in general studies, with a minor in political science")
        print("Bachelor of Arts")
        print("Master in Business Administration")
        print("Ed.D. degree in Human Resource Development")


class ProfessionalAthlete:

    def __init__(self):
        pass


    def basketball_player(self, position, tittles, awards, recognitions):
        print(f"As a basketball player, played in the {position} position")
        print(f"Won {tittles} NBA Championships")
        print(f"Won various awards including {awards}")
        print(f"Is a {recognitions}")


    def figther(self):
        print("Practice MMA")
        print("Professional wrestling in WE")


class MediaPersonality:

    def __init__(self):
        pass


    def musician(self):
        print("Rapper")
        print("DJ")


    def television_movies(self):
        print("Movie actor")
        print("Appearances in TV shows and documentaries")
        print("TNT sports commentator")
        print("Appearances in commercials")


class MultiFaceted(Person, GraduateStudent, ProfessionalAthlete, MediaPersonality):

    def __init__(self):
        print("\nA multi-faceted personality")


def main():
    shaquille_oneal = MultiFaceted()
    
    print("\nLike any other person")
    shaquille_oneal.vital_functions()
    
    print("\nAs a college student he has achieved:")
    shaquille_oneal.student_degrees()

    position = "center"
    tittles = 5
    awards = "NBA League MVPs, NBA Finals MVPs, NBA All Star Player, NBA Rookie of the Year"
    recognitions = "NBA Hall of Famer"
    print("\nAs a professional athlete he has achieved:")
    shaquille_oneal.basketball_player(position, tittles, awards, recognitions)
    print("\nAs a fighter:")
    shaquille_oneal.figther()


    print("\nAs a media personality, has worked like:")
    shaquille_oneal.musician()
    shaquille_oneal.television_movies()

    print("\nHis name Shaquille O'neal\n")


main()        