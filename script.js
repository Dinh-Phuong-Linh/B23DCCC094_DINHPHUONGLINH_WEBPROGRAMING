

class Student {
    constructor(code, name, gender, birthdate, hometown) {
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.birthdate = birthdate;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
        this.loadStudents();
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents();
        this.loadStudents();
    }

    editStudent(index, student) {
        this.students[index] = student;
        this.saveStudents();
        this.loadStudents();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.saveStudents();
        this.loadStudents();
    }

    loadStudents() {
        const tableBody = document.querySelector('#student-table tbody');
        tableBody.innerHTML = '';
        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.birthdate}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="studentManager.editRow(${index})">Sửa</button>
                    <button onclick="studentManager.deleteStudent(${index})">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    editRow(index) {
        const student = this.students[index];
        document.querySelector('#student-id').value = index;
        document.querySelector('#student-code').value = student.code;
        document.querySelector('#full-name').value = student.name;
        document.querySelector('#gender').value = student.gender;
        document.querySelector('#birthdate').value = student.birthdate;
        document.querySelector('#hometown').value = student.hometown;
    }
}

const studentManager = new StudentManager();

document.querySelector('#student-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const code = document.querySelector('#student-code').value;
    const name = document.querySelector('#full-name').value;
    const gender = document.querySelector('#gender').value;
    const birthdate = document.querySelector('#birthdate').value;
    const hometown = document.querySelector('#hometown').value;

    const id = document.querySelector('#student-id').value;
    if (id) {
        studentManager.editStudent(id, new Student(code, name, gender, birthdate, hometown));
    } else {
        studentManager.addStudent(new Student(code, name, gender, birthdate, hometown));
    }

    document.querySelector('#student-form').reset();
    document.querySelector('#student-id').value = '';
});
