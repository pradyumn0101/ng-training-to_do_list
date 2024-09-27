package com.cherry.todo.app.controller;

import com.cherry.todo.app.entity.Task;
import com.cherry.todo.app.service.TaskService;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/task")
@Log
public class TasksController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/getTask/{id}")
    public Task getTaskById(@PathVariable Long id) {

        log.info("This is the get by id task call");
        return this.taskService.getTaskById(id);
    }

    @GetMapping("/getAllTask")
    public List<Task> getAllTasks() {


        log.info("This is the get all task call");
        return this.taskService.getAllTask();
    }

    @PostMapping("/createTask")
    public Task createTask(@RequestBody Task task) {
        log.info("This is the create call");
              return this.taskService.createTask(task);
    }

    @PutMapping("/updateTask/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        log.info("This is the update call");
        return this.taskService.updateTask(id, task);
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {

        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build(); // 204 No Content response
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }
}
