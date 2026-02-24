import pytest
from sqlalchemy.pool import StaticPool
from app.main import app
from sqlmodel import create_engine, SQLModel, Session
from app.database import get_session

sqlite_url = "sqlite:///:memory:"
engine = create_engine(
    sqlite_url, connect_args={"check_same_thread": False}, poolclass=StaticPool
)


@pytest.fixture(name="session")
def session_fixture():
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    SQLModel.metadata.drop_all(engine)


@pytest.fixture
async def async_client(session: Session):
    from httpx import AsyncClient, ASGITransport

    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

    app.dependency_overrides.clear()


@pytest.fixture
def sample_user_data():
    return {
        "username": "testuser",
        "email": "hello@gmail.com",
        "password": "testpassword",
    }
