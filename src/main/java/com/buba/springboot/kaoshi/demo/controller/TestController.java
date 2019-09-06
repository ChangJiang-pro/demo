package com.buba.springboot.kaoshi.demo.controller;

import com.buba.springboot.kaoshi.demo.bean.Test;
import com.buba.springboot.kaoshi.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("tests")
public class TestController {
    @Autowired
private TestService testService;
    private String realPath = "D:" + File.separator + "temp";


    @ResponseBody
    @RequestMapping("but")
    public Map<String,Object> getall(){
        Map<String,Object> map=new HashMap<>();
        boolean flag=false;
        // 创建file
        File tempFile = new File(realPath);// realPath文件存储路径
        if (!tempFile.isDirectory()) {// 文件是否存在
            tempFile.mkdir();
        }

        // 得到文件路径
        String newName ="user" + "." + "txt";
        String filePath = realPath + File.separator + newName;
        try {
            List<Test> testList = testService.getall();
            //创建输出流
            BufferedWriter bufferedWriter=new BufferedWriter(new FileWriter(new File(filePath)));
            //高级for遍历
            for (Test u:testList) {
                Date birthday = u.getBirthday();
                SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
                String format = simpleDateFormat.format(birthday);
                bufferedWriter.write(u.getUserName()+","+format);
                //自动换行
                bufferedWriter.newLine();
            }
            bufferedWriter.close();
            flag=true;
            map.put("flag",flag);
        }catch (Exception e){
            e.printStackTrace();
        }

        return map;
    }
}
