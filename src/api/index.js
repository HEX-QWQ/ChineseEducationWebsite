import http from '../utils/request'

import axios from 'axios';

//请求首页数据
export const getData = () => {
    //返回一个promise对象
    return http.get('/home/getData')
}

export const getUser=(param)=>{
    //返回用户列表
    return http.get ('/user/getUser',param) 

}
export const addUser=(data)=>{
    //返回用户列表
    const params = new URLSearchParams();
    var jsonString = JSON.stringify(data);
    console.log(jsonString);
    params.append('data', jsonString);
    return axios.post('http://localhost/PrimaryChinese/insertStudentServlet',params);

}

export const editUser=(data)=>{
    //返回用户列表
    const params = new URLSearchParams();
    var jsonString = JSON.stringify(data);
    console.log(jsonString);
    params.append('data', jsonString);
    return axios.post('http://localhost/PrimaryChinese/updateStudentServlet',params);

}

export const delUser=(row)=>{
    //返回用户列表
    const params = new URLSearchParams();
    params.append('account', row.account.toString());
    console.log(params.toString());
    /* eslint-disable */
    return axios.post('http://localhost/PrimaryChinese/deleteStudentServlet',params);

}
export const addText=(data)=>{
    return null;
}
export const editText=(data)=>{
    return null;
}
export const delText=(data)=>{
    return null;
}
export const getMenu=(data)=>{
    //返回用户列表
    return http.post('/permission/getMenu',data) 

}
