const btnAdd = document.querySelector('#btnAdd')
const list = document.querySelector('ul.list')
const task = document.querySelector('#task')

let listTask = [
    {
        content : '1',
        status : 'doing'
    },
    {
        content : '2',
        status : 'complete'
    }
]

if(localStorage.getItem('listTask') != null){
    listTask = JSON.parse(localStorage.getItem('listTask'))
} 

btnAdd.addEventListener('click' , (event) => {
    event.preventDefault()

    if(task.value != ''){
        listTask.push({
            content : task.value,
            status : 'doing'
        })
        addTaskToHTML()
        task.innerHTML = ''
    }
    saveLocalStorage()

})



const saveLocalStorage = () => {
    localStorage.setItem('listTask' , JSON.stringify(listTask))
}


const completeTask = (index) => {
    listTask[index].status = 'complete'

    addTaskToHTML()
    saveLocalStorage()
}

const closeTask = (index) => {
    listTask.splice(index,1)
    addTaskToHTML()
   saveLocalStorage()
} 

const addTaskToHTML = () => {
    list.innerHTML = ''
    listTask.forEach((task,index) => {
        const newTask = document.createElement('li')
        newTask.classList.add(task.status)
        newTask.innerHTML = 
        `
                <div class="complete-icon" >
                    <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
                    </svg>
                      
                </div>
                <div class="content">${task.content}</div>
                <div class="close-icon">
                    <svg  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                    </svg>
                      
                </div>
        `;

        newTask.querySelector('.complete-icon').addEventListener('click' ,(event) => {
            completeTask(index)
        })

        newTask.querySelector('.close-icon').addEventListener('click' , (event) => {
            closeTask(index)
        })
        list.appendChild(newTask)
    })
    
}
addTaskToHTML()
