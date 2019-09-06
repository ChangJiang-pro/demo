<%--
  Created by IntelliJ IDEA.
  User: 12568
  Date: 2019/6/23
  Time: 20:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
<script src="${pageContext.request.contextPath}/static/maijia_files/jquery-3.2.1.min.js"></script>
    <script>
        function cc() {

            $.ajax({
                url:"${pageContext.request.contextPath}/tests/but",
                dataType:"json",
                type:'post',

                success:function (data) {
                    alert("成功");
                }
            })
        }
    </script>
</head>
<body>
<button id="imp" onclick="cc()">导出</button>
</body>
</html>
