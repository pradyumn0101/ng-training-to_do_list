package com.cherry.todo.app.impl;

import com.cherry.todo.app.entity.Task;
import com.cherry.todo.app.execptions.ResourceNotFoundException;
import com.cherry.todo.app.repo.TaskRepo;
import com.cherry.todo.app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepo taskRepo;

    @Override
    public Task getTaskById(Long id) {
        Task task = this.taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "Id", id));
        return task;
    }

    @Override
    public List<Task> getAllTask() {
        return this.taskRepo.findAll();
    }

    @Override
    public Task createTask(Task task) {
        return this.taskRepo.save(task);
    }

    @Override
    public Task updateTask(Long id, Task taskToUpdate) {
        Task task = this.taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "Id", id));
        taskToUpdate.setId(task.getId());
        return this.taskRepo.save(taskToUpdate);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = this.taskRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "Id", id));
        this.taskRepo.deleteById(id);

    }
}
