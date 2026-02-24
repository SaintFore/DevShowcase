import pytest

pytestmark = pytest.mark.asyncio


async def test_signup(async_client, sample_user_data):
    response = await async_client.post("/api/auth/signup", json=sample_user_data)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert "password" not in data
    assert data["username"] == sample_user_data["username"]
    assert data["email"] == sample_user_data["email"]
