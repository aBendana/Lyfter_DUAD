import random
from sympy import isprime
from exercise_7_prime_numbers import verify_prime_numbers


def test_verify_prime_numbers_returns_result_with_few_numbers():
    
    # Arrange
    few_numbers = [1, 4, 6, 7, 9, 67, 271, 273, 5, 2, 419]

    expected_few_prime_numbers = []
    for number in few_numbers:
        if isprime(number):
            expected_few_prime_numbers.append(number)    
    
    # Act
    result = verify_prime_numbers(few_numbers)

    # Assert
    assert result == expected_few_prime_numbers
    

def test_verify_prime_numbers_returns_result_with_many_numbers():
    
    # Arrange
    many_numbers = []
    counter = 0
    while counter <= 150:
        element = random.randint(1, 1000)
        many_numbers.append(element)
        counter += 1

    expected_prime_numbers = []
    for number in many_numbers:
        if isprime(number):
            expected_prime_numbers.append(number)

    # Act
    result = verify_prime_numbers(many_numbers)

    # Assert
    assert result == expected_prime_numbers


def test_verify_prime_numbers_returns_result_with_negative_numbers():
    
    # Arrange
    negative_numbers = [-7, -2, -6, -9, -67, -271, -273, -5, -419]
    
    # Act
    result = verify_prime_numbers(negative_numbers)

    # Assert
    assert result == []
