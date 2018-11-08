$(document).ready(function () {
    $('#xxxName').html(name);
//学生页面
    //选修课程
    //查询已选课程
    $('#select_course').click(function () {
        $('div.all_info').load("check_course.html");
    });
    $('#checkedCourse').click(function () {
        $('div.all_info').load("checkedCourseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem/student/choice'  ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                //alert('请求成功!');
                console.log(data.result);
                $.each(data.result, function(i, n) {
                    let tbBody = "";
                    tbBody += "<tr><td>" + n.choiceId + "</td>" + "<td>" + n.stuId + "</td><td>" + n.couName +
                                "</td><td>" + n.chooseDate + "</td><td>" + n.withdrawDate + "</td><td><a target='_parent' onclick='withdraw("+
                                n.choiceId + ")'>退选</a></td></tr>";
                    $("#check-table").append(tbBody);
                });
            },
            error:function(data){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });

    //查询可选课程
    $('#selectedCourse').click(function () {
        $('div.all_info').load("selectedCourseRollList.html");
        $.ajax({
            //请求方式
            type: 'GET',
            //发送请求的地址
            url: 'http://39.108.57.12:8080/CourseSystem//student/course'  ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                //alert('请求成功!');
                console.log(data.result);
                $.each(data.result, function(i, n) {
                    let tbBody = "";
                    tbBody += "<tr><td>"+ n.couId + "</td>" + "<td>" + n.couName + "</td>" + "<td>" + n.credit + "</td>" +
                                "<td>" + n.type + "</td>" + "<td>" + n.nature + "</td>" + "<td>" + n.necessity + "</td><td>" +
                                "<a target='_parent' onclick='selectedCourse("+ n.couId +")' >选修</a></td></tr>";
                    selectedCourseName[n.couId] = n.couName;
                    $("#select-table").append(tbBody);
                });
            },
            error:function(){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });

    //修改电话号码
    $('.change_info').click(function () {
        $('div.all_info').load("changeInfo.html");
    });
    $('#changeInfo').click(function () {
        $.ajax({
            //请求方式
            type: 'PUT',
            //发送请求的地址
            url: "http://39.108.57.12:8080/CourseSystem/student/self/modifyPhone?phone=" + $('#phone').val() ,
            xhrFields:{
                withCredentials:true
            },
            crossDomain:true,
            //服务器返回的数据类型
            dataType: 'json',
            success:function(data) {
                //请求成功函数内容
                //alert('请求成功!');
                console.log(data.result);
                if(data.result == 'success'){
                    alert('修改成功！');
                    $('div.all_info').load("changeInfo.html");
                }
            },
            error:function(jqXHR){
                //请求失败函数内容
                alert('请求失败!!');
            }
        });
    });

});

//获取id，并写入
var loc = window.location.href;
var n2 = loc.indexOf("=");//取得=号的位置
var n3 = loc.indexOf("&");//取得&号的位置
var name = loc.substr(n2+1, n3-n2-1);//从=号后面且&号之前的内容

//查询学生个人信息
function studentInfo() {
    $('div.all_info').load("stu_info.html");
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: "http://39.108.57.12:8080/CourseSystem/student/self" ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success: function (data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            $.each(data.result, function (i, n) {
                let tbody = '';
                tbody += "<tr><th>学号</th> <td>" + n.stuId + "</td></tr>" +
                    "<tr><th>姓名</th> <td>" + n.stuName + "</td></tr>" +
                    "<tr><th>性别</th> <td>" + n.sex + "</td></tr>" +
                    "<tr><th>年级</th> <td>" + n.graName + "</td></tr>" +
                    "<tr><th>学院</th> <td>" + n.acaName + "</td></tr>" +
                    "<tr><th>专业</th> <td>" + n.proName + "</td></tr>" +
                    "<tr><th>班级</th> <td>" + n.claName + "</td></tr>" +
                    "<tr><th>联系号码</th> <td>" + n.phone + "</td></tr>" +
                    "<tr><th>创建时间</th> <td>" + n.createDate + "</td></tr>";
                $('#table').append(tbody);
            })
        },
        error: function (jqXHR) {
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//选修课程
var selectedCourseName = [];
function selectedCourse(couId) {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/student/choose?couName=' + selectedCourseName[couId] ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            console.log(data.result);
            if(data.result == 'success'){
                alert('选修成功!');
            }

        },
        error:function(jqXHR){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}

//退选课程(未完成)
function withdraw(choiceId) {
    $.ajax({
        //请求方式
        type: 'GET',
        //发送请求的地址
        url: 'http://39.108.57.12:8080/CourseSystem/student/withdraw?choiceId=' + choiceId  ,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        //服务器返回的数据类型
        dataType: 'json',
        success:function(data) {
            //请求成功函数内容
            //alert('请求成功!');
            console.log(data.result);
            if(data.result == 'success'){
                alert("退选成功!");
            }
        },
        error:function(data){
            //请求失败函数内容
            alert('请求失败!!');
        }
    });
}