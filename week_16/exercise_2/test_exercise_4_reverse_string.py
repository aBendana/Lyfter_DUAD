from exercise_4_reverse_string import reverse_string


def test_reverse_string_returns_result_with_short_string():
    
    # Arrange
    short_string = ("Have a nice day") 
    
    # Act
    result = reverse_string(short_string)
    
    # Assert
    assert result == "yad ecin a evaH"


def test_reverse_string_returns_result_with_long_string():
    
    # Arrange
    long_string = "String is a collection of alphabets, words or other characters. " \
    "It is one of the primitive data structures and are the building blocks for data manipulation. " \
    "Python has a built-in string class named str. " \
    "Python strings are immutable which means they cannot be changed after they are created."
    
    expected_string = ''.join(reversed(long_string))

    # Act
    result = reverse_string(long_string)
    
    # Assert
    assert result == expected_string


def test_reverse_string_returns_result_with_empty_string():

    # Arrange
    empty_string = ""

    # Act
    result = reverse_string(empty_string)
    
    # Assert
    assert result == ""