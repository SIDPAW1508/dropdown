package com.app.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.demo.model.Table1;

@Repository
public interface Table1Repository
    extends JpaRepository<Table1, Long> {
}