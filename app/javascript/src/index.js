import $ from 'jquery';

import { indexTasks, postTask, newTask } from "./requests.js";

indexTasks(response => {
    let htmlString = response.tasks.map(task => {
        return `<div class='col-12 mb-3 p-2 border rounded task' data-id=${task.id}>${task.content}<input class='form-check-input' type='checkbox' data-id='"+ task.id + "'><button class="btn btn-danger">delete</button></div>`;
    })
    $("#tasks").html(htmlString);
});
