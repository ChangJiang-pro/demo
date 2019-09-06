package com.buba.springboot.kaoshi.demo.service.impl;

import com.buba.springboot.kaoshi.demo.bean.Test;
import com.buba.springboot.kaoshi.demo.dao.TestDao;
import com.buba.springboot.kaoshi.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestServiceimpl implements TestService {
@Autowired
    private TestDao testDao;


    @Override
    public List<Test> getall() {
        return testDao.getall();
    }
}
