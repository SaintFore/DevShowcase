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


async def test_signin_token_can_access_protected_projects(
    async_client, sample_user_data
):
    signup_response = await async_client.post("/api/auth/signup", json=sample_user_data)
    assert signup_response.status_code == 200

    signin_response = await async_client.post(
        "/api/auth/signin",
        data={
            "username": sample_user_data["username"],
            "password": sample_user_data["password"],
        },
    )
    assert signin_response.status_code == 200

    token = signin_response.json()["access_token"]
    projects_response = await async_client.get(
        "/api/projects",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert projects_response.status_code == 200
    assert projects_response.json() == []
