#Andrés Bendaña
#Módulo 1, Semana 8, "CSV", Ejercicio 1


import csv


video_games_list = [
    {
    "Name": "Ghost of Tsushima ",
    "Gender": "Action-adventure",
    "Developer": "Sucker Punch Productions",
    "ESRB rating": "M"
    },
    {
    "Name": "Gran Turismo 7",
    "Gender": "Sim racing",
    "Developer": "Polyphony Digital",
    "ESRB rating": "E"
    },
    {
    "Name": "Stellar Blade",
    "Gender": "Action-adventure",
    "Developer": "Shift Up",
    "ESRB rating": "M"
    },
    {
    "Name": "Red Dead Redemtion 2",
    "Gender": "Action-adventure",
    "Developer": "Rockstar Games",
    "ESRB rating": "M"
    },
    {
    "Name": "Street Fighter 6",
    "Gender": "Fighting",
    "Developer": "Capcom",
    "ESRB rating": "T"
    },
    {
    "Name": "Pac-Man",
    "Gender": "Maze chase",
    "Developer": "Namco",
    "ESRB rating": "E"
    }
]


def adding_to_video_games_list(a_list):
    new_video_game = {}
    validation = False
    counter = 1
    while (validation == False):
        try:
            number_of_new_video_games = int(input("How many video games do you want add to the list? "))
            while (counter <= number_of_new_video_games):
                print("")
                print(f"Game {counter}:")
                name = input("Name: ")
                gender = input("Gender: ")
                developer = input("Developer: ")
                print("For ESRB rating write: E for everyone, T for teen (age 13+), M for mature (age 17+) ")
                esrb = input("ESRB rating: ")
                while (esrb != "E" and esrb != "T" and esrb != "M"):
                    print("Enter a correct ESRB rating")
                    esrb = input("ESRB rating: ")

                new_video_game = {"Name": name, "Gender": gender,"Developer": developer, "ESRB rating": esrb}                
                video_games_list.append(new_video_game)
                counter += 1
            
            validation = True

        except ValueError as error:
            print("Please type a number")
            validation = False
    #print(video_games_list)


def write_csv_file(path, data, headers):
    #file_path = "X:\Studies\Lyfter\Module_1\Week_8\Video_games.csv"
    with open("video_games.csv", "x", encoding='utf-8') as file:
        writer = csv.DictWriter(file, headers)
        writer.writeheader()
        writer.writerows(video_games_list)
        
    with open("video_games.csv") as file:
        print("")
        print(file.read())    


def main():
    adding_to_video_games_list(video_games_list)
    write_csv_file("video_games.csv", video_games_list, video_games_list[0].keys())


main()    