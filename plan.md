 ==== plan ====

  - db persistance
   - tasks
   - task events

  - api
   - create task ( POST -> /api/task )
   - list all tasks ( GET -> /api/task )
   
   - get a task, ( GET -> /api/task/:id )
   - delete task, ( DEL -> /api/task/:id )
   - edit a task, (PUT -> /api/task/:id ) 

   - create taskEvent ( POST -> /api/task/:taskId/event )
   
   - ? detail taskEvent ( GET -> /api/event/:id ) ? retrieved with the task
   - ? delete taskEvent ( DEL -> /api/event/:id )

  frontend
   - display tasks
   - create new task
   - delete task

   - add event to task
   - delete task event?

  display 
   - meeting goals (red, yellow, green)?
   - history trends ( line chart )