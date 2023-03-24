import { Button, Card } from 'antd';
import React,{useEffect,useState} from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/yonce.css'
//代码高亮
import 'codemirror/addon/selection/active-line';
 
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css'; 
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';  
import 'codemirror/addon/fold/brace-fold.js';  
import 'codemirror/addon/fold/comment-fold.js';
import { getUrlParam } from '../../utils/getUrlParam';
const Index = () => {
    const [id,setId] = useState('')

    const getId = () => {
        const id = getUrlParam('id') 
        setId(id)
    }


    return (
        <Card
            title='获取url的参数'
        >
            <div style={{display:'flex',flexDirection:'row'}}>
                <Button type='primary' onClick={getId}>点击获取url中的id</Button>
                <div style={{marginLeft:'5%',fontWeight:'bold'}}>id : {id}</div>
            </div>
            <div style={{marginTop:'2%'}}>
                <CodeMirror
                    value='export function getUrlParam (name) {
                        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
                        // reg = /(^|&)id=([^&]*)(&|$)/
                        const r = window.location.hash.split("?")
                        // 由于hash路由，则需要.hash方法在？后进行匹配
                        const needurl = r[1].substr(1).match(reg);
                        if (needurl != null) {
                            // 解码操作
                            return decodeURIComponent(needurl[2]);
                        } else {
                            return null;
                        }
                    }' 
                    options={{
                        mode: 'javascript', 
                        theme: "yonce", 
                        lineNumbers: true ,
                        styleActiveLine: true,
                        lineWrapping: true
                    }}
                    // onChange={(code) => {
                    //     console.log(code)
                    // }}
                />
            </div>
        </Card>
    );
}

export default Index;
