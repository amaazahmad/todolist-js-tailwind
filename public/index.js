class Task {
	constructor(title, dateTime, isComplete) {
		this.title = title;
		this.dateTime = dateTime;
		this.isComplete = isComplete;
	}
}

const titleInputField = document.querySelector("#title_input");
const addTaskButton = document.querySelector("#add_task_btn");
const outerContainer = document.querySelector("#tasks_container");
const taskList = [];
const emptyListHeading = document.querySelector("#empty_list_heading");

function displayTask(taskObj) {
	taskList.push(taskObj);

	if (taskList.length) {
		emptyListHeading.textContent = null;
	}

	const htmlTask = `
	<div class="p-4" id="task">
	<div class="flex flex-col md:flex-row md:justify-between">
		<p class=" pr-3 break-all" id="task_title">${taskObj.title}</p>
		<p id="task_dateTime">${taskObj.dateTime}</p>
	</div>

	<div class="flex justify-end mt-2">
		<button class=" w-4 p-4" id="task_complete_checkbox">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>
		<button class="w-4 p-4" id="task_edit_btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
			</svg>
		</button>
		<button class="w-4 p-4" id="task_delete_btn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
			</svg>
		</button>
	</div>
</div>`;

	outerContainer.insertAdjacentHTML("afterbegin", htmlTask);
	const taskContainer = document.querySelector(`#task`);
	taskObj.isComplete && (taskContainer.style.backgroundColor = "gray");
	!taskObj.isComplete && (taskContainer.style.backgroundColor = "white");

	taskContainer.addEventListener("click", (e) => {
		if (e.target.parentElement.id === "task_delete_btn") {
			taskList.splice(taskList.indexOf(taskObj), 1);
			taskContainer.parentNode.removeChild(taskContainer);

			if (!taskList.length) {
				emptyListHeading.textContent = "Empty List";
			}
		} else if (e.target.parentElement.id === "task_edit_btn") {
			const newTitle = prompt("Write the new title");
			taskObj.title = newTitle;
			taskContainer.firstElementChild.firstElementChild.textContent = newTitle;
		} else if (e.target.parentElement.id === "task_complete_checkbox") {
			taskObj.isComplete = !taskObj.isComplete;

			taskObj.isComplete && (taskContainer.style.backgroundColor = "gray");
			!taskObj.isComplete && (taskContainer.style.backgroundColor = "white");
		}
	});
}

addTaskButton.addEventListener("click", (e) => {
	e.preventDefault();
	const taskTitle = titleInputField.value;
	titleInputField.value = "";

	if (!taskTitle) {
		alert("Empty Task Title");
		return;
	}

	const date = new Date();
	const dateTime = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
	const taskObj = new Task(taskTitle, dateTime, false);
	displayTask(taskObj);
});

window.addEventListener("beforeunload", (e) => {
	e.preventDefault();
	e.returnValue = "";

	localStorage.setItem("task-list", JSON.stringify(taskList));
});

window.addEventListener("load", (e) => {
	tasksListFromStorage = JSON.parse(localStorage.getItem("task-list"));
	tasksListFromStorage.forEach((e) => displayTask(e));
});
