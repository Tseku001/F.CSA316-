# test_user_profile.py
import pytest
from user_profile import User, UserProfile

def test_user_profile_creation():
    user = User("Бат", "bat@example.com")
    profile = UserProfile(user, "Зураг", "Би веб хөгжүүлэгч")

    assert profile.user.name == "Бат"
    assert profile.user.email == "bat@example.com"
    assert profile.avatar == "Зураг"
    assert profile.bio == "Би веб хөгжүүлэгч"

def test_update_bio():
    user = User("Бат", "bat@example.com")
    profile = UserProfile(user, "Зураг", "Эртний текст")
    
    # Зөв bio
    new_bio = "Шинэ товч танилцуулга"
    profile.update_bio(new_bio)
    assert profile.bio == new_bio

    # Хэт урт bio
    long_bio = "x" * 501
    try:
        profile.update_bio(long_bio)
    except ValueError as e:
        assert str(e) == "Тайлбар хэт урт байна"
