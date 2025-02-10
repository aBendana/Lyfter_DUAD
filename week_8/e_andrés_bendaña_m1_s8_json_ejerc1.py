import json


def create_pokemon_list():
# Open and read pokemons JSON file
    with open('pokemons_json.json', 'r') as file:
        pokemons_python_list =  json.load(file)
        #print(pokemons_python_list)
        
    return pokemons_python_list


def adding_to_pokemons_list():
    pokemons_python_list = create_pokemon_list()
    new_video_game = {}
    validation = False
    valid = False
    counter = 1

    while (validation == False):
        try:
            number_of_new_pokemons = int(input("How many pokemons do you want add to the list? "))
            while (counter <= number_of_new_pokemons):
                print("")
                print(f"Pokemon {counter}:")
                name = input("Name (english): ")
                pokemon_type = input("Type: ")
                
                print("Base:")
                
                valid = False
                while (valid == False):
                    try:
                        hp = int(input("    HP: "))
                        attack = int(input("    Attack: "))    
                        defense = int(input("    Defense: "))
                        sp_attack = int(input("    Sp. Attack: "))
                        sp_defense = int(input("    Sp. Defense: "))
                        speed = int(input("    Speed: "))
                        valid = True

                    except ValueError as error:
                        print("Please ONLY numbers")
                        #valid = False

                new_pokemon = {
                    'name': {'english': name}, 
                    'type': [pokemon_type], 
                    'base': {'HP': hp, 'Attack': attack, 'Defense': defense, 'Sp. Attack': sp_attack, 'Sp. Defense': sp_defense, 'Speed': speed}
                    }                
                pokemons_python_list.append(new_pokemon)
                counter += 1
            
            validation = True

        except ValueError as error:
            print("Please type a number")
            validation = False

    print("")
    print("Python's pokemons list:")
    print(pokemons_python_list)
    return pokemons_python_list


def create_json_file():
    pokemon_python_list = adding_to_pokemons_list()
    pokemons_json = json.dumps(pokemon_python_list, indent=4)
    print("")
    print("json pokemons object:")
    print(pokemons_json)
    with open("pokemons_json.json", "w") as file:
        file.write(pokemons_json)


def main():
    create_json_file()


main()    