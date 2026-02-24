from app.core.security import hash_password, verify_password


def test_hash_and_verify_password():
    pw = "hello-world"
    h = hash_password(pw)
    assert h != pw
    assert verify_password(pw, h)
