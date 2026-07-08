package com.app.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import com.app.demo.model.Table1;
import com.app.demo.model.Table2;
import com.app.demo.model.Table3;
import com.app.demo.repository.Table1Repository;
import com.app.demo.repository.Table2Repository;
import com.app.demo.repository.Table3Repository;
@Service
public class ActionService {

    private final Table1Repository table1Repo;
    private final Table2Repository table2Repo;
    private final Table3Repository table3Repo;

    public ActionService(
            Table1Repository table1Repo,
            Table2Repository table2Repo,
            Table3Repository table3Repo) {

        this.table1Repo = table1Repo;
        this.table2Repo = table2Repo;
        this.table3Repo = table3Repo;
    }

    public void insertIntoTable1() {

        Table1 data = new Table1();
        data.setName("New Record");

        table1Repo.save(data);
    }

    public void updateTable2() {

        Optional<Table2> record =
                table2Repo.findById(1L);

        if(record.isPresent()) {

            Table2 entity = record.get();

            entity.setStatus("UPDATED");

            table2Repo.save(entity);
        }
    }

    public void deleteLastRowTable3() {

        Table3 lastRow =
            table3Repo.findTopByOrderByIdDesc();

        if(lastRow != null) {
            table3Repo.delete(lastRow);
        }
    }
}