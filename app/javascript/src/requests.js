import $ from 'jquery';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

export const indexTasks = (successCB, errorCB) => {
    let request = {
        type: 'GET',
        url: "api/tasks?api_key=1",
        success: successCB,
        error: errorCB
    }
    
    $.ajax(request);
};

export const postTask = (content, successCB, errorCB)  => {
    let request = {
        type: 'POST',
        url: 'api/tasks?api_key=1',
        data: {
            task: {
                content: content

            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export const deleteTask = function (taskid, successCB, errorCB) {
    var request = {
      type: 'DELETE',
      url: 'api/tasks/' + taskid + '?api_key=1',
      success: successCB,
      error: errorCB
    }
    
    $.ajax(request);
    location.reload();
  };
  

export const markComplete = (taskid, successCB, errorCB) => {
    let request = {
        type: 'PUT',
        url: 'api/tasks' + taskid + 'mark_complete?api_key=1',
        data: {
            task: {
                completed: true,
            }
        },
        success: successCB,
        error: errorCB,
    }

    $.ajax(request);
};

export const markActive = (taskid, successCB, errorCB) => {
    let request = {
        type: 'PUT',
        url: 'api/tasks' + taskid + 'mark_active?api_key=1',
        data: {
            task: {
                completed: false,
            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);    
}



