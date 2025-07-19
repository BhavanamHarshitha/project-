let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.link) {
      const link = document.createElement("a");
      link.href = task.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = task.text;
      li.appendChild(link);
    } else {
      li.textContent = task.text;
    }

    li.onclick = () => toggleTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const type = document.getElementById("taskType").value;
  const customLink = document.getElementById("customLink").value.trim();
  const taskText = input.value.trim();

  if (taskText === "") return;

  // Prevent duplicates
  const duplicate = taskList.some(task => task.text.toLowerCase() === taskText.toLowerCase());
  if (duplicate) {
    alert("Task already exists!");
    return;
  }

  let link = null;

  switch (type) {
    case "resume":
      link = "C:/Users/harsh/OneDrive/Desktop/final project/Harshitha resume.pdf"; // Make sure resume.pdf is in the same folder
      break;
    case "apply":
      link = "https://www.vaultofcodes.in/";
      break;
    case "portfolio":
      link = "https://bhavanamharshitha.github.io/protfolio-1/";
      break;
    case "custom":
      if (customLink !== "") {
        link = customLink;
      }
      break;
  }

  taskList.push({ text: taskText, completed: false, link: link });
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();

  // Clear inputs
  input.value = "";
  document.getElementById("customLink").value = "";

  // ✅ Auto open the link in new tab if available
  if (link) {
    window.open(link, "_blank");
  }
}

function toggleTask(index) {
  const task = taskList[index];
  const confirmDelete = confirm(`Are you sure you want to mark "${task.text}" as completed and remove it?`);

  if (confirmDelete) {
    taskList.splice(index, 1);
    displayTasks();
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  displayTasks();
}

document.getElementById("taskType").addEventListener("change", () => {
  const type = document.getElementById("taskType").value;
  document.getElementById("customLink").style.display = type === "custom" ? "block" : "none";
});

displayTasks();
