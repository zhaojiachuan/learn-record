import { Checkbox, Table } from 'antd';
import React, { useState } from 'react';
const CheckboxGroup = Checkbox.Group;
// 初始数据
const plainOptions = [1, 2, 3];
// 由于点击一个就要将它之前的全部选中，定义一个addlist接收选中的数据
let addList = []
// 取消选中的那个元素的下标
let deleteIndex
// 取消选中的list
let deleteList

const App = () => {
    // 被选中数据，初始为空
    const [check, setCheck] = useState([]);
    const [list, setList] = useState([
        {
            check: [],
            useOptions: [1, 2, 3]
        }
    ])
    const columns = [
        {
            title: 'check',
            dataIndex: 'check',
            align: 'center',
            width: 110,
            render: (text, record, index) => {
                return <Checkbox.Group
                            value={text}
                            options={record.useOptions}
                            onChange={(value) => {  
                                const newList = [...list]
                                if (value && value.length < newList[index]['check'].length) {
                                    const deleteNum = newList[index]['check'].filter((v) => !value.find((item) => item === v));
                                    newList[index]['check'].forEach((item, idx) => {
                                        if (item === deleteNum[0]) {
                                            newList[index]['check'].splice(idx, newList[index]['check'].length - idx)
                                        }
                                    });
                                } else {
                                    plainOptions.forEach((item) => {
                                        if (item <= value[value.length - 1] && !newList[index]['check'].includes(item)) {
                                            newList[index]['check'].push(item)
                                        }
                                    });
                                }
                                setList(newList)
                            }}
                        />
            }
        }
    ]

    // 点击选中框的时候调用的函数
    // const onChange = (list) => {

    //     // list指当前被选中的数据，如果点完选中框以后1，2上面显示被勾选，list中就是1，2，如果1，3处于被勾选，list就是1，3
    //     if (list.length < check.length) {
    //          
    //         // 根据当前选中数据list和点击选中框之前的list进行长度比较，变长了就是新增选中，变短了就是取消选中
    //         // 两个list进行对比，获取到被点击取消选中的那个数据
    //         const deleteNum = check.filter(v => !list.find((item) => item === v));
    //         // 根据数据获取到它的当前下标
    //         check.forEach((item, index) => {
    //             if (item === deleteNum[0]) {
    //                 deleteIndex = index
    //             }
    //         })
    //         if (deleteIndex === 0) {
    //         //如果删除的是第一个元素，就代表后面的全部删除， 赋空值
    //              
    //             setCheck([])
    //         } else if (deleteIndex === check.length - 1) {
    //         // 如果是最后一个元素，代表只删除它自己，也就代表现在的list就是正确的
    //              
    //             setCheck(list)
    //         } else {
    //         // 删除中间的元素，就从当前元素下标开始到最后一个下标的值都删除
    //             check.splice(deleteIndex, check.length - 1)
    //             deleteList = check
    //             setCheck([...deleteList])
    //             deleteList = []
    //         }

    //         // deletelist对被选中数据进行删除，从0删除到当前下标，就是将这个数据之前的数据全都取消选中了
    //         // check.splice(0, 3)
    //         // deleteList = check
    //         // setCheck([...deleteList])
    //     }
    //     else {
    //         if (check.length != 0) {
    //              
    //             addList = list
    //             setCheck(addList)
    //             addList = []
    //         } else {
    //             // 由于是第一次点击，list的值肯定是第一次被选中的那个值
    //             plainOptions.forEach((item, index) => {
    //                 // 由于数据是有排序的，所以比当前选中的数据小的元素一定会被选中，将这些元素逐一push到新的数组中
    //                 if (item <= list[0]) {
    //                     addList.push(item)
    //                 }
    //             })
    //             setCheck(addList)
    //             addList = []
    //         }
    //     }
    // };

    const onChange = (list) => {
        const newCheck = [...check]
        if (list && list.length < check.length) {
            const deleteNum = check.filter((v) => !list.find((item) => item === v));
            check.forEach((item, idx) => {
                if (item === deleteNum[0]) {
                    newCheck.splice(idx, check.length - idx)
                }
            });
        } else {
            plainOptions.forEach((item) => {
                if (item <= list[list.length - 1] && !check.includes(item)) {
                    newCheck.push(item)
                }
            });
        }
        setCheck(newCheck)
    }
    return (
        <>
            <CheckboxGroup options={plainOptions} value={check} onChange={onChange} />
            <Table dataSource={list} columns={columns} />
        </>
    );
};
export default App;
