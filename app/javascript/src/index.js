import $, { event } from 'jquery';

import { indexTasks, postTask, deleteTask, markComplete, markActive } from "./requests.js";

let loadAllTask = () => {

    indexTasks(response => {
        let htmlString = response.tasks.map(task => {

            if(task.completed) {
                return ("<div class='col-xs-12 d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "' checked></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='removeTask btn btn-dark' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")
            
            } else if (!task.completed) {
                return ("<div class='col-xs-12 d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "'></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='btn btn-dark' id ='removeTask' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")
            }
                      
        });
        $("#tasks").html(htmlString);
    });
}



let allActiveShow = function() {

        indexTasks(function(response) {

            let activeTasks = response.tasks.map(function(task) {
                
                if(!task.completed) {


                    return ("<div class='col-xs-12 d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "'></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='btn btn-dark' id ='removeTask' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")

                }           
                
                
            });

            $('#tasks').html(activeTasks); 

    });
   
}


let completeTasksShow = function() {

        indexTasks(function(response) {

            let completedTasks = response.tasks.map(task => {

                if(task.completed) {

                    return ("<div class='col-xs-12 d-flex justify-content-between'>" + "<tr id='taskRow'> <td><input class='form-check-input' type='checkbox' title='check the box if the task is done' data-id='"+ task.id + "' checked></td> <td id='task-content' data-id='" + task.id + "' class='task'>" + task.content + "</td> <td><button class='removeTask btn btn-dark' data-id ='" + task.id + "' title='click to remove task'>❌</button></td></tr></div><br>")
                }
            
            });
        
            $('#tasks').html(completedTasks); 
    });
}

// load all task
$(document).on('click', '#allTasksShow', function(event) {
    event.preventDefault();
    loadAllTask();
})

// load only active tasks
$(document).on('click', '#showActiveOnly', function(event) {
    event.preventDefault();
    allActiveShow();
})

//load only completed tasks
$(document).on('click', '#showCompletedOnly', function(event) {
    event.preventDefault();
    completeTasksShow();
})


// post task
$(document).ready(() => {
    $('#addTask').on('submit', function(event) {
        event.preventDefault();
        postTask($('#taskInput').val(), loadAllTask());
        $('#taskInput').val('');
    })

// delete task
$(document).on('click', '#removeTask', function() {
    let taskItem = $(this).attr('data-id');
    deleteTask(taskItem)
    location.reload();
});
    
// task mark active event handler
$(document).on('click', '.form-check-input', function(){
      let checkbox = $(this).data('id');
      
      if($(this).is(':checked')) {
          markComplete(checkbox);
          console.log('task number ' + $(this).data('id') + ' is completed')
      } else {
          markActive(checkbox);
          console.log('task number ' + $(this).data('id') + ' is active')

      }
   })

   loadAllTask();

})









