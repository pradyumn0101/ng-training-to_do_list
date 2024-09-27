package com.cherry.todo.app.repo;

import com.cherry.todo.app.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.nio.file.LinkOption;
public interface TaskRepo extends JpaRepository<Task, Long> {
}
