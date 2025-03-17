from exercise_6_ordering_words import ordering_words


def test_ordering_words_returns_result_with_few_words():
    
    # Arrange
    few_words = "wolf-dog-rabbit-cat-lion"
    
    # Act
    result = ordering_words(few_words)

    # Assert
    assert result == "cat-dog-lion-rabbit-wolf"


def test_ordering_words_returns_result_with_many_words():
    
    # Arrange
    many_words = "lion-tiger-elephant-giraffe-zebra-cheetah-leopard-bear-wolf-fox-"\
        "deer-rabbit-kangaroo-koala-panda-monkey-gorilla-chimpanzee-hippopotamus-"\
        "rhinoceros-crocodile-alligator-snake-python-cobra-frog-toad-turtle-tortoise-"\
        "dolphin-whale-shark-octopus-squid-crab-lobster-seal-walrus-eagle-hawk-owl-"\
        "parrot-pigeon-peacock-rooster-hen-duck-swan-goose-penguin-bat"\
    
    # Act
    result = ordering_words(many_words)

    # Assert
    assert result == "alligator-bat-bear-cheetah-chimpanzee-cobra-crab-crocodile-deer-"\
    "dolphin-duck-eagle-elephant-fox-frog-giraffe-goose-gorilla-hawk-hen-hippopotamus-"\
    "kangaroo-koala-leopard-lion-lobster-monkey-octopus-owl-panda-parrot-peacock-penguin-"\
    "pigeon-python-rabbit-rhinoceros-rooster-seal-shark-snake-squid-swan-tiger-toad-tortoise-"\
    "turtle-walrus-whale-wolf-zebra"


#the symbols get order according ASCII decimal value
def test_ordering_words_returns_result_with_symbols():
    
    # Arrange
    symbols = "[-&-$-@-)-*-#-!-}-{"
    
    # Act
    result = ordering_words(symbols)

    # Assert
    assert result == "!-#-$-&-)-*-@-[-{-}"

