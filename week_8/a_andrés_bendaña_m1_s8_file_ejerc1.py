#Andrés Bendaña
#Módulo 1, Semana 8, "File", Ejercicio 1


def reading_and_writing_songs(path):
	songs_list = []
	songs_text = ""
	
	print("\033[34mThis is the read of the file line by line\033[0m")
	with open("songs.txt") as file:
		for line in file.readlines():
			songs_list.append(line)
			print(line)

	songs_list.sort()
	print("\033[34mThis is the list of the songs\033[0m")
	print(songs_list)
	for index, song in enumerate(songs_list):
		songs_text = songs_text + song
	print()
	print("\033[34mThis is the song list converted to string\033[0m")
	print(songs_text)
		
	with open("songs_in_order.txt", "x") as file:	
		file.write(songs_text)

	print("\033[34mThis is the new text file in alphabetical order\033[0m")
	with open("songs_in_order.txt") as file:
		print(file.read())


def main():
	reading_and_writing_songs("songs.txt")


main()	
