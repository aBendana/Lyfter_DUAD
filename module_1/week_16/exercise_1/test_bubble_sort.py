import random
import pytest
from bubble_sort import BubbleSort

bubble_sort = BubbleSort()

def test_bubble_sort_returns_result_with_short_list():
    # Arrange
    #bubble_sort = BubbleSort()
    short_list = [100, 20, -3 , 5, 8] 
    
    # Act
    result = bubble_sort.sorting_out(short_list)
    
    # Assert
    assert result == [-3, 5, 8, 20, 100]


def test_bubble_sort_returns_result_with_long_list():
    # Arrange
    #bubble_sort = BubbleSort()

    long_list = []
    counter = 0
    while counter <= 200:
        element = random.randint(1, 1000)
        long_list.append(element)
        counter += 1

    expected_list = long_list
    expected_list.sort()

    # Act
    result = bubble_sort.sorting_out(long_list)
    
    # Assert
    assert result == expected_list


def test_bubble_sort_returns_result_with_empty_list():
    # Arrange

    empty_list = []

    # Act
    result = bubble_sort.sorting_out(empty_list)
    
    # Assert
    assert result == []


def test_bubble_sort_throws_exception_when_try_sort_something_different_a_list():
    # Arrange
    nah_list = (50,30,85,100,45,20,10,5,9,78)
    
    # Act & # Assert
    with pytest.raises(TypeError):
	    bubble_sort.sorting_out(nah_list)