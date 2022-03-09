function Student(name, department,level, cgpa) {
    this.name = name;
    this.department = department;
    this.level = level;
    this.cgpa = cgpa;
}

//UI constructor
function UI() {}

UI.prototype.addStudentToList = function(student){
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
//show alert
UI.prototype.showAlert = function(message,className) {
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


//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('name').value = '';
    document.getElementById('department').value = '';
    document.getElementById('level').value = '';
    document.getElementById('cgpa').value = '';
}
//delete logs
UI.prototype.deleteLog = function(target){

    if(target.className === 'delete'){
        if(confirm('Delete this entry?')){
            target.parentElement.parentElement.remove();
        }
    }
}

//Event listeners

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

           //Validate
           if(name === ''|| department === ''|| level === ''|| cgpa === ''){
            ui.showAlert('Please input all fields','error');
           }

           else{
           //Add student to list
           ui.showAlert('Student successfully added to list','success');
           ui.addStudentToList(student);

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

    //Show alert 
    ui.showAlert('Log deleted','success');    

    e.preventDefault();
})