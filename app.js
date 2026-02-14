const cl = console.log;

const todoForm = document.getElementById('todoForm')
const todoItemControl = document.getElementById('todoItem') 
const addTodoBtn = document.getElementById('addTodoBtn')
const updateTodoBtn = document.getElementById('updateTodoBtn')


let todosArr
if(localStorage.getItem('todosArr')) {
    todosArr = JSON.parse(localStorage.getItem('todosArr'))
}else {
    todosArr = [

    ]
}

function snackbar(msg, iconValue){
  Swal.fire({
    title : msg,
    timer : 3000,
    icon : iconValue
  })
}

 





function createlist(arr) {

  let result = `<ul class="list-group">`;

  arr.forEach(ele => {
    result += `
      <li id="${ele.todoId}"
          class="list-group-item d-flex justify-content-between">

        <strong>${ele.todoItem}</strong>

        <div>
          <i onclick="onEdit(this)"
             role="button"
             class="fa-solid fa-pen-to-square fa-2x text-success"></i>

          <i onclick="onRemove(this)"
             role="button"
             class="fa-solid fa-trash-can fa-2x text-danger"></i>
        </div>

      </li>
    `;
  });

  result += `</ul>`;
  const todoContainer = document.getElementById('todoContainer')
  todoContainer.innerHTML = result;
}

createlist(todosArr);


function onTodoSubmit(eve){
    eve.preventDefault();

    let todoObj = {
        todoItem : todoItemControl.value,
        todoId : Date.now().toString()
    }

    todoForm.reset()

    todosArr.push(todoObj)
    localStorage.setItem('todosArr',JSON.stringify(todosArr))

    let li = document.createElement('li');
    li.id = todoObj.todoId;
    li.className = `list-group-item d-flex justify-content-between align-items-center`;

    li.innerHTML = `<strong>
                        ${todoObj.todoItem}
                    </strong>

                    <div>
                        <i onclick="onEdit(this)" role="button"
                        class="fa-solid fa-pen-to-square fa-2x text-success"></i>

                        <i onclick="onRemove(this)" role="button"
                        class="fa-solid fa-trash-can fa-2x text-danger"></i>
                    </div>`

    let ul = document.querySelector('#todoContainer ul')
    ul.append(li)
    snackbar(`The new todo ${todoObj.todoItem} added successfully !!!` , 'success')
}

function onEdit(ele){
  let EDIT_ID = ele.closest('li').id;
  localStorage.setItem('EDIT_ID', EDIT_ID)
  let EDIT_OBJ = todosArr.find(t => t.todoId === EDIT_ID)
  todoItemControl.value = EDIT_OBJ.todoItem
  addTodoBtn.classList.add('d-none')
  updateTodoBtn.classList.remove('d-none')
}

function onTodoUpdate(){
  let UPDATE_ID = localStorage.getItem('EDIT_ID');
  localStorage.removeItem('EDIT_ID')
  let UPDATED_OBJ = {
    todoId : UPDATE_ID,
    todoItem : todoItemControl.value
  }
  todoForm.reset()
  let getIndex = todosArr.findIndex(t => t.todoId === UPDATE_ID)
  todosArr[getIndex] = UPDATED_OBJ;
  localStorage.setItem('todosArr',JSON.stringify(todosArr))
  updateTodoBtn.classList.add('d-none')
  addTodoBtn.classList.remove('d-none')
  let li = document.getElementById(UPDATE_ID).firstElementChild
  li.innerText = UPDATED_OBJ.todoItem
  snackbar(`The todo item with id ${UPDATE_ID} is updated successfully!!!`, 'success')
}









function onRemove(ele){
  let REMOVE_ID = ele.closest('li').id;

  let isConfirm = confirm("Are you sure?");
  if(!isConfirm) return;

  let getIndex = todosArr.findIndex( t => t.todoId === REMOVE_ID);

  todosArr.splice(getIndex, 1)
  localStorage.setItem('todosArr',JSON.stringify(todosArr))
  ele.closest('li').remove()
  snackbar(`The todo with id ${REMOVE_ID} is removed successfully !!!`, 'success')
}
 
todoForm.addEventListener('submit',onTodoSubmit)
updateTodoBtn.addEventListener('click',onTodoUpdate)










