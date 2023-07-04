let studentsArray = [
  {
    ID: 1,
    name: "Alice",
    age: 21,
    grade: "A",
    degree: "Btech",
    email: "alice@example.com",
  },
  {
    ID: 2,
    name: "Bob",
    age: 22,
    grade: "B",
    degree: "MBA",
    email: "bob@example.com",
  },
  {
    ID: 3,
    name: "Charlie",
    age: 20,
    grade: "C",
    degree: "Arts",
    email: "charlie@example.com",
  },
];
let lastId = 4;
const addStudentBtn = document.getElementById("button");

function displayFilteredStudents(filteredStudents) {
  const tBody = document.getElementById("tBody");
  tBody.innerHTML = ""; // Clear existing table rows

  filteredStudents.forEach((e) => {
    let data = `<tr>
        <td>${e.ID}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.age}</td>
        <td>${e.grade}</td>
        <td>
            ${e.degree}
            <div class="edit-btns">
            <i id="edit" class="ri-edit-box-line" onclick="editStudent(${e.ID})"></i>
            <i id="delete" class="ri-delete-bin-line" onClick="deleteStudent(${e.ID})"></i>
            </div>
        </td>
      </tr>`;
    tBody.insertAdjacentHTML("beforeend", data);
  });
}

function displayStudents() {
  const tBody = document.getElementById("tBody");
  tBody.innerHTML = ""; // Clear existing table rows

  studentsArray.forEach((e) => {
    let data = `<tr>
            <td>${e.ID}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.age}</td>
            <td>${e.grade}</td>
            <td>
                ${e.degree}
                <div class="edit-btns">
                <i id="edit" class="ri-edit-box-line" onclick="editStudent(${e.ID})"></i>
                <i ID="delete" class="ri-delete-bin-line" onClick="deleteStudent(${e.ID})"></i>
                </div>
            </td>
          </tr>`;
    tBody.insertAdjacentHTML("beforeend", data);
  });
}

// -----> add student functionality start ------>

function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value;
  const degree = document.getElementById("degree").value;
  const email = document.getElementById("email").value;

  const student = {
    ID: lastId + 1,
    name: name,
    age: age,
    grade: grade,
    degree: degree,
    email: email,
  };

  studentsArray.push(student);
  lastId++;

  // Clear the form fields after adding a student
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("degree").value = "";
  document.getElementById("email").value = "";

  // Refresh the table with the updated student data
  displayStudents();
}
addStudentBtn.addEventListener("click", addStudent);

// -----> add student functionality start ------>

// -----> Search functionality start ------>
const searchInput = document.querySelector('input[name="search"]');
searchInput.addEventListener("input", filterStudents);

function filterStudents() {
  const searchText = searchInput.value.toLowerCase();
  const filteredStudents = studentsArray.filter(
    (student) =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
  );

  displayFilteredStudents(filteredStudents);
}

// -----> Search functionality end ------>

// -----> delete student functionality start ------>

function deleteStudent(id) {
  studentsArray = studentsArray.filter((student) => student.ID !== id);
  displayFilteredStudents(studentsArray);
}

// -----> delete student functionality end ------>

// -----> editing student functionality start ------>

let currentEditingStudentId = null;

function editStudent(id) {
  let student = studentsArray.find((e) => e.ID === id);

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grade").value = student.grade;
  document.getElementById("degree").value = student.degree;
  document.getElementById("email").value = student.email;

  addStudentBtn.textContent = "Edit Student";
  addStudentBtn.style.backgroundColor = "black";
  addStudentBtn.style.color = "white";
  addStudentBtn.style.border = "1px solid #747474";

  currentEditingStudentId = id;

  //removing the previous addStudent functionality.
  addStudentBtn.removeEventListener("click", addStudent);

  addStudentBtn.addEventListener("click", updateCurrentStudent);
}

function updateCurrentStudent() {
  // Check if there is a current editing student ID
  if (currentEditingStudentId !== null) {
    updateStudentDetails(currentEditingStudentId);
  } else {
    addStudent();
  }
}

function updateStudentDetails(id) {
  const newName = document.getElementById("name").value;
  const newAge = document.getElementById("age").value;
  const newgrade = document.getElementById("grade").value;
  const newDegree = document.getElementById("degree").value;
  const newEmail = document.getElementById("email").value;

  let student = studentsArray.find((e) => e.ID === id);
  student.name = newName;
  student.age = newAge;
  student.grade = newgrade;
  student.email = newEmail;
  student.degree = newDegree;

  // Clear the form fields after adding a student
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("grade").value = "";
  document.getElementById("degree").value = "";
  document.getElementById("email").value = "";

  currentEditingStudentId = null;

  addStudentBtn.innerText = "Add Student";
  addStudentBtn.style.backgroundColor = "white";
  addStudentBtn.style.color = "black";

  displayStudents();
}
// -----> editing student functionality end ------>

document.addEventListener("DOMContentLoaded", function () {
  applyStartingAnimation();
});

function applyStartingAnimation() {
  // Add the 'animate-start' class to the body to trigger the starting animation
  document.body.classList.add("animate-start");
}

displayStudents();
