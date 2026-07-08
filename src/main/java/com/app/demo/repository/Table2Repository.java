package com.app.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.demo.model.Table2;

@Repository
public interface Table2Repository
    extends JpaRepository<Table2, Long> {
}