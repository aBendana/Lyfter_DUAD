import random
from exercise_3_list_sum import list_sum


def test_list_sum_returns_result_with_short_list():
    # Arrange
    short_list = [15, 50, -3 , 9, -15] 
    
    # Act
    result = list_sum(short_list)
    
    # Assert
    assert result == 56


def test_list_sum_returns_result_with_long_list():
    # Arrange

    long_list = []
    counter = 0
    while counter <= 150:
        element = random.randint(1, 100)
        long_list.append(element)
        counter += 1

    expected_sum = sum(long_list)

    # Act
    result = list_sum(long_list)
    
    # Assert
    assert result == expected_sum


def test_list_sum_returns_result_with_empty_list():
    # Arrange

    empty_list = []

    # Act
    result = list_sum(empty_list)
    
    # Assert
    assert result == 0