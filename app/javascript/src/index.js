import $, { event } from 'jquery';

import { indexTasks, postTask, deleteTask, markComplete, markActive } from "./requests.js";

indexTasks(response => {
    let htmlString = response.tasks.map(task => {
        return '<div id="taskList" class="d-flex col-12 justify-content-between">' + '<input class="p-2 mark-complete"type="checkbox"  title="Check the box if task is done" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>' + '<div class="mr-auto p-2" id="li-text">' + task.content + '</div>' + "<button class='btn btn-danger' id='taskButton' data-id='" + task.id + "'title='click to remove task'>" + 'remove' + '</button>' + '</div>' + '</br>' + '<hr>';
    })
    $("#tasks").html(htmlString);
});


/* old task component incase you want it back

`<div class='col-12 mb-3 p-2 border rounded task' data-id=${task.id}>${task.content}<input class='form-check-input' type='checkbox' data-id='"+ task.id + "'><button class="btn btn-danger">delete</button></div>`

*/

// post task
$(document).on('click', '#addTask', event => {
    let input = $('#newRequest').val();
    postTask(input);
});

// delete task
$(document).on('click', '#taskButton', event => {
    let taskid = $(this).attr('data-id');
    deleteTask(taskid);
});

