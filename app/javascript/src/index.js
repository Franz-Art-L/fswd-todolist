import $, { event } from 'jquery';

import { indexTasks, postTask, deleteTask, markComplete, markActive } from "./requests.js";

let loadAllTask = () => {

    indexTasks(response => {
        let htmlString = response.tasks.map(task => {

            if(task.completed) {
                return ("<div class='d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "' checked></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='btn btn-dark' id ='removeTask' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")
            
            } else if (!task.completed) {
                return ("<div class='d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "'></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='btn btn-dark' id ='removeTask' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")
            }
                      
        });
        $("#tasks").html(htmlString);
    });

}



/* old task component incase you want it back

`<div class='col-12 mb-3 p-2 border rounded task' data-id=${task.id}>${task.content}<input class='form-check-input' type='checkbox' data-id='"+ task.id + "'><button class="btn btn-danger">delete</button></div>`

*/


// post task
$(document).ready(() => {
    $('#addTask').on('submit', event => {
        event.preventDefault();
        postTask($('#taskInput').val(), loadAllTask());
        $('#taskInput').val('');
    })

    // delete task
$(document).on('click', '#removeTask', () => {
    let taskItem = $('#taskRow').attr('data-id');
    deleteTask(taskItem)
      });
    
  // task mark active event handler
   $(document).on('click', '.form-check-input', () => {
      let checkbox = $(this).attr('data-id');
      if($(this).is(':checked')) {
          markComplete(checkbox);
      } else {
          markActive(checkbox);
      }
   })
  
  loadAllTask();

})

