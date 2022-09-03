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
                content: content,

            }
        },
        success: successCB,
        error: errorCB
    }

    $.ajax(request);
};

export const deleteTask = (taskid, successCB, errorCB) => {
    let request = {
        type: 'DELETE',
        url: 'api/tasks' + taskid + '?api_key=1',
        success: successCB,
        error: errorCB,
    }

    $.ajax(request);
    location.reload();
};




