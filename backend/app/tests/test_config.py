from app.core.config import settings


def test_secret_key_is_loaded():
    print(f"\n[DEBUG] 内存中的 Secret Key: {settings.secret_key}")

    assert settings.secret_key is not None
    assert settings.secret_key != "nothing"
