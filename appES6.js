class Student{
    constructor(name,department,level,cgpa){

        this.name = name;
        this.department = department;
        this.level = level;
        this.cgpa = cgpa;
    }
}

class UI{
    addStudentToList(student) {

        const list = document.getElementById('student-list');
        //Create tr element;
        const row = document.createElement('tr');
        //Insert cols
        row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.department}</td>
        <td>${student.level}</td>
        <td>${student.cgpa}</td>
        <td><a href="#" class="delete">x</a></td>
        `;

        list.appendChild(row);

    }
    showAlert(message,className) {
        
        //create error div
        const div = document.createElement('div');
        //append classes
        div.className = `alert ${className}`;
        //add text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#student-form');

        container.insertBefore(div,form);

        //timeout after 3 secs
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },2000);
    }
    deleteLog(target) {

        if(target.className === 'delete'){
            if(confirm('Delete this entry?')){
                target.parentElement.parentElement.remove();
            }
        }
    }
    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('department').value = '';
        document.getElementById('level').value = '';
        document.getElementById('cgpa').value = '';
    }
}

//local storage class
class Store {
    static getStudents() {
        let students;
        if(localStorage.getItem('students') === null) {
        students = [];
        } else {
            students = JSON.parse(localStorage.getItem('students'));
        }
    return students;
    }


    static displayStudents() {
        const students = Store.getStudents();

        students.forEach(function(student){
            const ui = new UI;

            //ADD STUDENT
            ui.addStudentToList(student);
        })
    }

    static addStudent(student) {
        const students = Store.getStudents();
        students.push(student);

        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(cgpa) {
        const students = Store.getStudents();

        students.forEach(function(student,index){
           if(student.cgpa === cgpa) {
               students.splice(index,1);
           }
        });
        localStorage.setItem('students', JSON.stringify(students));
    }
}


//Event listeners
//DOM load event
document.addEventListener('DOMContentLoaded',Store.displayStudents);


//Event listener for adding a student
document.getElementById('student-form').addEventListener('submit', function(e) {

    //Get form values
    const name = document.getElementById('name').value,
            department = document.getElementById('department').value,
            level = document.getElementById('level').value,
            cgpa = document.getElementById('cgpa').value;

            //Instantiate a student
           const student = new Student(name, department, level, cgpa);

           //instantiate UI 
           const ui = new UI();
           console.log(ui); //

           //Validate
           if(name === ''|| department === ''|| level === ''|| cgpa === ''){
            ui.showAlert('Please input all fields','error');
           }

           else{
           //Add student to list
           ui.addStudentToList(student);

           //add to local storage
           Store.addStudent(student);

          
           //show success message
           ui.showAlert('Student successfully added to list','success');


           //clear fields
           ui.clearFields();
           }
           
            e.preventDefault();
});

//event listener to remove student from list
document.getElementById('student-list').addEventListener('click',function(e){

    //instantiate UI 
    const ui = new UI();

    ui.deleteLog(e.target);  

    //remove from localStorage
    Store.removeStudent(e.target.parentElement.previousElementSibling.textContent);


    //Show alert 
    ui.showAlert('Log deleted','success');    

    e.preventDefault();
})