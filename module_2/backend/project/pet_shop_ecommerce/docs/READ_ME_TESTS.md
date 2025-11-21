# Unit Testing Guide

## Prerequisites

Install dependencies:
pytest
pytest-cov


## Running Tests

### Option 1: Run all tests with report
python run_tests.py


This will:
- Execute all unit tests
- Generate coverage report
- Create HTML report in `htmlcov/`
- Create XML report in `test-results.xml`
```

```
### Option 2: Run tests manually

# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_repository_products.py -v

```

```
## Test Coverage report

View coverage report: HTML report open htmlcov/index.html with a browser
```

```
## Test Coverage Summary

- **Repositories**: Success and failure cases for CRUD operations
- **Transactions**: Business logic validation
- **Validations**: Input validation for all fields
- **Cache Manager**: Redis operations
- **Routes**: API endpoints with authentication
- **Security**: JWT token generation and validation
- **DBs connections** Connections to PostgreSQL and Redis
- **DB model** tables and special types
