from student import Student  # student.py дотор байгаа Student class-ыг оруулж байна

def test_student_creation():
    s = Student("Tseren", 20)  # Student объектыг үүсгэж байна
    assert s.name == "Tseren"  # name нь зөв үүссэн эсэхийг шалгана
    assert s.age == 20         # age нь зөв үүссэн эсэхийг шалгана
