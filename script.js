let studentsArray = [];
let lastId = 0;
const addStudentBtn = document.getElementById("button");

function displayFilteredStudents(filteredStudents) {
  const tBody = document.getElementById("tBody");
  tBody.innerHTML = ""; // Clear existing table rows

  filteredStudents.forEach((e) => {
    let data = `<tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.age}</td>
        <td>${e.gpa}</td>
        <td>
            ${e.degree}
            <div class="edit-btns">
            <i id="edit" class="ri-edit-box-line" onclick="editStudent(${e.id})"></i>
            <i id="delete" class="ri-delete-bin-line" onClick="deleteStudent(${e.id})"></i>
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
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.age}</td>
            <td>${e.gpa}</td>
            <td>
                ${e.degree}
                <div class="edit-btns">
                <i id="edit" class="ri-edit-box-line" onclick="editStudent(${e.id})"></i>
                <i id="delete" class="ri-delete-bin-line" onClick="deleteStudent(${e.id})"></i>
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
  const gpa = document.getElementById("gpa").value;
  const degree = document.getElementById("degree").value;
  const email = document.getElementById("email").value;

  const student = {
    id: lastId + 1,
    name: name,
    age: age,
    gpa: gpa,
    degree: degree,
    email: email,
  };

  studentsArray.push(student);
  lastId++;

  // Clear the form fields after adding a student
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gpa").value = "";
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
  studentsArray = studentsArray.filter((student) => student.id !== id);
  displayFilteredStudents(studentsArray);
}

// -----> delete student functionality start ------>
let currentEditingStudentId = null;

function editStudent(id) {
  let student = studentsArray.find((e) => e.id === id);

  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("gpa").value = student.gpa;
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
  const newGpa = document.getElementById("gpa").value;
  const newDegree = document.getElementById("degree").value;
  const newEmail = document.getElementById("email").value;

  let student = studentsArray.find((e) => e.id === id);
  student.name = newName;
  student.age = newAge;
  student.gpa = newGpa;
  student.email = newEmail;
  student.degree = newDegree;

  // Clear the form fields after adding a student
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gpa").value = "";
  document.getElementById("degree").value = "";
  document.getElementById("email").value = "";

  currentEditingStudentId = null;

  addStudentBtn.innerText = "Add Student";
  addStudentBtn.style.backgroundColor = "white";
  addStudentBtn.style.color = "black";

  displayStudents();
}
// -----> delete student functionality start ------>

document.addEventListener("DOMContentLoaded", function () {
  applyStartingAnimation();
});

function applyStartingAnimation() {
  // Add the 'animate-start' class to the body to trigger the starting animation
  document.body.classList.add("animate-start");
}
