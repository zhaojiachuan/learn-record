import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Descriptions, Input, Button } from 'antd'


export default function SingleMessage(props) {
    const [userData, setUserData] = useState('')
    const [usernameInput, setusernameInput] = useState(false)
    const [phoneInput, setphoneInput] = useState(false)
    const [ageInput, setageInput] = useState(false)
    const [realnameInput, setrealnameInput] = useState(false)
    const [emailInput, setemailInput] = useState(false)
    const [username, setusername] = useState('')
    const [realname, setrealname] = useState('')
    const [phone, setphone] = useState('')
    const [age, setage] = useState('')
    const [email, setemail] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        let list
        let needList
        const needName = props.username
        axios.get("http://localhost:80/api/getUserData").then((res) => {
            list = res.data.data
            list.forEach((item) => {
                if (item.username === needName) {
                    needList = item;
                    setUserData(needList)
                    const action = {
                        type: "getUserInfo",
                        value: item,
                    };
                    dispatch(action);
                }
            })
        });
    }, [])
    

    useEffect(() => {
        const username = document.getElementById('username')
        if (username) {
            username.addEventListener('dblclick', () => {
                 
                setusernameInput(true)
            })
        }
        const realname = document.getElementById('realname')
        if (realname) {
            realname.addEventListener('dblclick', () => {
                setrealnameInput(true)
            })
        }
        const age = document.getElementById('age')
        if (age) {
            age.addEventListener('dblclick', () => {
                setageInput(true)
            })
        }
        const phone = document.getElementById('phone')
        if (phone) {
            phone.addEventListener('dblclick', () => {
                setphoneInput(true)
            })
        }
        const email = document.getElementById('email')
        if (email) {
            email.addEventListener('dblclick', () => {
                setemailInput(true)
            })
        }
    })

    const BeSureEdit = () => {
        setusernameInput(true)
        setrealnameInput(true)
        setageInput(true)
        setphoneInput(true)
        setemailInput(true)
    }

    const NotEdit = () => {
        setusernameInput(false)
        setrealnameInput(false)
        setageInput(false)
        setphoneInput(false)
        setemailInput(false)
    }

    const saveUserInfo = () => {
        const obj = {
            id:userData.id ,
            username: username === '' ? userData.username : username,
            realname: realname === '' ? userData.realname : realname,
            age: age === '' ? userData.age : age,
            phone: phone === '' ? userData.phone : phone,
            email: email === '' ? userData.email : email,
        }
        const action = {
            type: "putUserInfo",
            value: obj,
        };
        dispatch(action);
    }

    const renderButton = () => {
        if (emailInput === false
            && realnameInput === false
            && ageInput === false
            && phoneInput === false
            && usernameInput === false) {
            return (
                <div>
                    <Button type='primary' onClick={BeSureEdit}>一键编辑</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button type='primary' onClick={NotEdit} >取消编辑</Button>
                    <Button type='primary' style={{ marginLeft: "1vw" }} onClick={saveUserInfo}>保存</Button>
                </div>
            )
        }
    }


    return (
        <div>
            <Descriptions title="用户信息" bordered >
                <Descriptions.Item label="用户名">
                {userData.username}
                </Descriptions.Item>
                <Descriptions.Item label="真实姓名">
                    {realnameInput === false ? <div id='realname'>{userData.realname}</div> : <Input style={{ width: '10vw' }} defaultValue={userData.realname} onChange={(e) => setrealname(e.currentTarget.value)} />}
                </Descriptions.Item>
                <Descriptions.Item label="年龄">
                    {ageInput === false ? <div id='age'>{userData.age}</div> : <Input style={{ width: '10vw' }} defaultValue={userData.age} onChange={(e) => setage(e.currentTarget.value)} />}
                </Descriptions.Item>
                <Descriptions.Item label="电话">
                    {phoneInput === false ? <div id='phone'>{userData.phone}</div> : <Input style={{ width: '10vw' }} defaultValue={userData.phone} onChange={(e) => setphone(e.currentTarget.value)} />}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                    {emailInput === false ? <div id='email'>{userData.email}</div> : <Input style={{ width: '10vw' }} defaultValue={userData.email} onChange={(e) => setemail(e.currentTarget.value)} />}
                </Descriptions.Item>
                <Descriptions.Item label="操作" >
                    {renderButton()}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
