let input
let btnAdd
let warningInfo
let tasksList
let newTask
let editPanel
let editPanelWarning
let editPanelInput
let btnEditPanelAccept
let btnEditPanelCancel
let taskToEdit

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	input = document.querySelector('.top__input')
	btnAdd = document.querySelector('.top__input-btn')
	warningInfo = document.querySelector('.top__warning')
	tasksList = document.querySelector('.todo-list__list')
	editPanel = document.querySelector('.edit-panel')
	editPanelWarning = document.querySelector('.edit-panel__warning')
	editPanelInput = document.querySelector('.edit-panel__input')
	btnEditPanelAccept = document.querySelector('#edit-accept')
	btnEditPanelCancel = document.querySelector('#edit-cancel')
}

const prepareDOMEvents = () => {
	btnAdd.addEventListener('click', addNewTask)
	tasksList.addEventListener('click', checkClick)
	input.addEventListener('keyup', enterKeyCheck)
    btnEditPanelAccept.addEventListener('click', changeTaskText)
    btnEditPanelCancel.addEventListener('click', closeEditPanel)
}

const addNewTask = () => {
	if (input.value === '') {
		warningInfo.textContent = 'Enter task content'
	} else {
		newTask = document.createElement('li')
		newTask.classList.add('todo-list__list-item')
		newTask.textContent = input.value

		createToolsArea()

		tasksList.append(newTask)

		input.value = ''
		warningInfo.textContent = ''
	}
}

const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('todo-list__list-item-tools')

	const editBtn = document.createElement('button')
	editBtn.classList.add('todo-list__list-item-btn')
	editBtn.setAttribute('id', 'edit')
	editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('todo-list__list-item-btn')
	completeBtn.setAttribute('id', 'complete')
	completeBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('todo-list__list-item-btn')
	deleteBtn.setAttribute('id', 'delete')
	deleteBtn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

	toolsPanel.append(editBtn, completeBtn, deleteBtn)
	newTask.append(toolsPanel)
}

const checkClick = e => {
	if (e.target.matches('#complete')) {
		e.target.closest('li').classList.toggle('completed')
	} else if (e.target.matches('#edit')) {
		editTask(e)
	} else if (e.target.matches('#delete')) {
		deleteTask(e)
	}
}

const deleteTask = e => {
	e.target.closest('li').remove()
	const allTasks = tasksList.querySelectorAll('li')
	if (allTasks.length === 0) {
		warningInfo.textContent = 'No tasks'
	}
}

const editTask = e => {
	editPanel.classList.add('visible')
	editPanel.classList.remove('not-visible')
	taskToEdit = e.target.closest('li')
	editPanelInput.value = taskToEdit.firstChild.textContent.trim()
}

const changeTaskText = () => {
	if (editPanelInput.value !== '') {
		taskToEdit.firstChild.textContent = editPanelInput.value
		closeEditPanel()
	} else {
		editPanelWarning.textContent = 'Enter task content'
	}
}

const closeEditPanel = () => {
	editPanel.classList.add('not-visible')
	editPanel.classList.remove('visible')
	editPanelWarning.textContent = ''
}

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		addNewTask()
	}
}

document.addEventListener('DOMContentLoaded', main)
