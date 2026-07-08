package com.app.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.demo.model.Table3;

@Repository
public interface Table3Repository
    extends JpaRepository<Table3, Long> {

    Table3 findTopByOrderByIdDesc();
}
