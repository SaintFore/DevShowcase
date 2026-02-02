from sqlmodel import SQLModel, create_engine, Session
from pathlib import Path

sqlite_file_name = "database.db"

BASE_DIR = Path(__file__).resolve().parent

sqlite_url = f"sqlite:///{BASE_DIR / sqlite_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
