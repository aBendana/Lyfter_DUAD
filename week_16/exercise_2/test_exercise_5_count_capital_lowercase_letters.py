import re
from exercise_5_count_capital_lowercase_letters import *


def test_count_capital_letters_returns_result_with_short_phrase():
    
    # Arrange
    short_phrase = "Using PYTEST for test Functions"
    
    # Act
    result_capitals = count_capital_letter(short_phrase)

    # Assert
    assert result_capitals == 8


def test_count_lowercase_letters_returns_result_with_short_phrase():
    
    # Arrange
    short_phrase = "Using PYTEST for test Functions"
    
    # Act
    result_lowercase = count_lowercase_letter(short_phrase)

    # Assert
    assert result_lowercase == 19


def test_count_capital_letters_returns_result_with_long_phrase():
    
    # Arrange
    long_phrase = "String is a collection of alphabets, words or other characters. " \
    "It is one of the primitive data structures and are the building blocks for data manipulation. " \
    "Python has a built-in string class named str. " \
    "Python strings are immutable which means they cannot be changed after they are created."
    
    expected_capitals = len(re.findall(r'[A-Z]', long_phrase))

    # Act
    result_capitals = count_capital_letter(long_phrase)
    
    # Assert
    assert result_capitals == expected_capitals


def test_count_capital_lowercase_letters_returns_result_with_long_phrase():
    
    # Arrange
    long_phrase = "String is a collection of alphabets, words or other characters. " \
    "It is one of the primitive data structures and are the building blocks for data manipulation. " \
    "Python has a built-in string class named str. " \
    "Python strings are immutable which means they cannot be changed after they are created."
    
    expected_lowercases = len(re.findall(r'[a-z]', long_phrase))

    # Act
    result_lowercases = count_lowercase_letter(long_phrase)
    
    # Assert
    assert result_lowercases == expected_lowercases


def test_count_capital_letters_returns_result_with_numbers_symbols_phrase():
    
    # Arrange
    numbers_symbols_phrase = "5664,:*#)()$841516"

    # Act
    result = count_capital_letter(numbers_symbols_phrase)
    
    # Assert
    assert result == 0


def test_count_lowercase_letters_returns_result_with_numbers_symbols_phrase():
    
    # Arrange
    numbers_symbols_phrase = "5664,:*#)()$841516"

    # Act
    result = count_lowercase_letter(numbers_symbols_phrase)
    
    # Assert
    assert result == 0

