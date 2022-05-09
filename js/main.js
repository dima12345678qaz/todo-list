const title = document.getElementsByClassName('title')[0]
const select = document.getElementById('option')
const block = document.getElementsByClassName("todo_items")[0]

const addToDo = document.getElementById('addTodo');
const input = document.getElementsByClassName('todo-list')[0]


let category = select.value || "default"



function addList() {
    const optValue = document.getElementsByClassName('input-todo')[0]
    if (optValue.value.length < 3) {
        alert('error')
        return;
    } 
    
    let opt = document.createElement('option')
    opt.innerHTML = optValue.value
    document.getElementById('option').append(opt)
    const previousData = JSON.parse(localStorage.getItem('list')) || []
    localStorage.setItem('list', JSON.stringify([...previousData, opt.innerHTML]))
    optValue.value = '';
}


function initialize() {
    title.innerText = category
    let list = JSON.parse(localStorage.getItem('list'))
    if (list) {
        list.forEach(element => {
            let opt = document.createElement('option')
            opt.innerHTML = element
            document.getElementById('option').append(opt)
        });
    } else {
        localStorage.setItem('list', JSON.stringify(["default"]))
        let opt = document.createElement('option')
        opt.innerHTML = "default"
        document.getElementById('option').append(opt)
    }


} 

initialize()

function removeItemWithSlice(arr, index) {
    const firstArr = arr.slice(0, index);
    const secondArr = arr.slice(index + 1);
    return [...firstArr , ...secondArr]
  }

  
function generateTodoList(category) {
    const todos = JSON.parse(localStorage.getItem('todoList')) || []

    const filteredTodo = todos.filter(todo => todo.category === category)
    block.innerHTML = ''

    filteredTodo.forEach(element => {

        const div = document.createElement('div')
        div.classList.add('todo_item')
        
    
        const p = document.createElement('p')
        const span = document.createElement('span')
        
        span.innerText = element.itemText;

        const input = document.createElement('input')
        if(element.isDone) {
            div.classList.add('crossed')
            input.checked = true
        }
        input.classList.add('chbox')
        input.type = 'checkbox'
        p.append(input)
        p.append(span)
        const button = document.createElement('button')
        button.classList.add('btn-green')
        button.innerText = '-'
    
        div.append(p)
        div.append(button)

        block.append(div)


        button.addEventListener('click', (e) => {
            e.preventDefault()
            const index = todos.findIndex(elem => elem.itemText === span.innerText && elem.category === category)
            localStorage.setItem('todoList', JSON.stringify(removeItemWithSlice(todos, index)))
            div.parentNode.removeChild(div)
        })

        input.addEventListener('change', (e) => {
            if(e.target.checked) {
                div.classList.add('crossed')
            } else {
                div.classList.remove('crossed')
            }

            const index = todos.findIndex(elem => elem.itemText === span.innerText  && elem.category === category)
            todos[index].isDone = e.target.checked
            localStorage.setItem('todoList', JSON.stringify(todos))
        })
    })
}

generateTodoList(category)

select.addEventListener('change', function(e) {
    title.innerText = e.target.value
    category = e.target.value
    generateTodoList(category)
})



addToDo.addEventListener('click', function(event) {
    event.preventDefault()

    const todos = JSON.parse(localStorage.getItem('todoList')) || []
    const isFound = todos.findIndex(elem => elem.itemText === input.value && elem.category === category)

    if(isFound !== -1) {
        alert('todo with this title already exists')
        return;
    } 

    localStorage.setItem('todoList', JSON.stringify([...todos, {
        category: category,
        itemText: input.value,
        isDone: false
    }]))

    generateTodoList(category)


    input.value = ''
})
