# user_profile.py

class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserProfile:
    def __init__(self, user, avatar, bio):
        """
        Хэрэглэгчийн профайл үүсгэх.

        Args:
            user (User): Хэрэглэгч объект
            avatar (str): Хэрэглэгчийн зураг
            bio (str): Товч танилцуулга
        """
        self.user = user
        self.avatar = avatar
        self.bio = bio

    def update_bio(self, new_bio):
        """
        Хэрэглэгчийн bio-г шинэчлэх.

        Args:
            new_bio (str): Шинэ bio текст

        Raises:
            ValueError: Хэт урт bio бичсэн тохиолдолд
        """
        if len(new_bio) > 500:
            raise ValueError("Тайлбар хэт урт байна")
        self.bio = new_bio
