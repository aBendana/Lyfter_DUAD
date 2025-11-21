import sys
import os
# add the root directory to the sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from unittest.mock import Mock, MagicMock, patch
from pytest_mock import mocker
from sqlalchemy.exc import ProgrammingError
from app.infrastructure.database.db_model import Schema, Products, schema_name, SpeciesType
from sqlalchemy import Integer, String, SmallInteger, Numeric, Enum


class TestSchema:

    def setup_method(self):
        self.mock_engine = MagicMock()
        self.mock_conn = MagicMock()
        self.mock_engine.begin.return_value.__enter__.return_value = self.mock_conn
        self.mock_engine.begin.return_value.__exit__.return_value = None

        self.schema_name = "Lyfter_Ecommerce_Pets"
        self.schema = Schema(self.mock_engine, self.schema_name)
        

    # tests for schema_creation
    # success case: schema created successfully
    def test_schema_creation_success(self, mocker):
        # Arrange: 
        mock_create_schema = mocker.patch('app.infrastructure.database.db_model.CreateSchema')
        # Act
        self.schema.schema_creation()
        # Assert
        self.mock_conn.execute.assert_called_once_with(mock_create_schema.return_value)
        mock_create_schema.assert_called_once_with(self.schema_name)


    # failure case: schema already exists (ProgrammingError)
    def test_schema_creation_already_exists(self, mocker):
        # Arrange (sqlalchemy.schema.CreateSchema)
        self.mock_conn.execute.side_effect = ProgrammingError("statement", "params", "Schema already exists")
        mocker.patch('app.infrastructure.database.db_model.CreateSchema')
        # Act
        self.schema.schema_creation()
        # Assert
        self.mock_conn.execute.assert_called_once()



class TestProductsModel:

    # tests different aspects of products table
    def test_table_metadata(self):
        # Assert: table name and schema name
        assert Products.__tablename__ == "products"
        assert Products.__table_args__ == {"schema": schema_name}


    def test_products_columns_definition(self):
        # Arrange
        columns = Products.__table__.columns

        # Act & Assert
        expected_columns = {
            "id", "SKU", "name", "description",
            "target_species", "supplier", "stock", "cost", "price"
            }
        assert set(columns.keys()) == expected_columns

        # Validate data types
        assert isinstance(columns["id"].type, Integer)
        assert isinstance(columns["SKU"].type, String)
        assert isinstance(columns["name"].type, String)
        assert isinstance(columns["description"].type, String)
        assert isinstance(columns["target_species"].type, Enum)
        assert isinstance(columns["supplier"].type, String)
        assert isinstance(columns["stock"].type, SmallInteger)
        assert isinstance(columns["cost"].type, Numeric)
        assert isinstance(columns["price"].type, Numeric)


    # test restrictions
    def test_products_constraints(self):
        columns = Products.__table__.columns

        # id: primary key, autoincrement
        assert columns["id"].primary_key
        assert columns["id"].autoincrement is True

        # SKU and name: unique and not nulls
        assert columns["SKU"].nullable is False
        assert columns["SKU"].unique is True

        assert columns["name"].nullable is False
        assert columns["name"].unique is True

        # other columns not nulls
        for field in ["description", "target_species", "supplier", "stock", "cost", "price"]:
            assert columns[field].nullable is False


    # test enum types
    def test_enum_species_type(self):
        enum_col = Products.__table__.columns["target_species"]
        assert isinstance(enum_col.type, Enum)
        assert enum_col.type.name == "species_type"
        assert enum_col.type.enum_class == SpeciesType
        # SpeciesType: dog, cat, bird, fish, reptile, small_mammal, rodent
        expected_names = [e.name for e in SpeciesType] 
        assert set(enum_col.type.enums) == set(expected_names)

