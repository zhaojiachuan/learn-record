const express = require("express");

const router = express.Router();
const { uploadFiles } = require('../utils/handleImage')

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "zjc19990110",
  database: "test",
});

// 登录部分接口

router.post("/post", (req, res) => {
  db.query("select * from user ", (err, result) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlStr = "select * from user where username = ? and password = ?"
    db.query(sqlStr, [username, password], (err, result) => {
      // console.log(password)
      console.log(result)
      if (result.length > 0) {
        res.send({
          status: 0,
          msg: "登录成功",
          data: req.body,
        });
      } else {
        res.send({
          status: 1,
          msg: "账号或密码错误",
          data: req.body,
        });
      }
      return
    })
  });
});

// 注册部分接口

router.post("/register", (req, res) => {
  const body = req.body;
  const user = {
    username: body.username,
    password: body.password,
  };
  console.log(user)
  const sqlStr =
    "INSERT INTO user(username,password) VALUES (?,?)";
  db.query(
    sqlStr,
    [user.username, user.password],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
})

// createForm新建

router.post("/postRevenue", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    name: body.name,
    source: body.source,
    amount: body.amount,
    remark: body.remark,
    date: body.date,
  };
  const sqlStr =
    "INSERT INTO zjc(name,source,amount,remark,date) VALUES (?,?,?,?,?)";
  db.query(
    sqlStr,
    [user.name, user.source, user.amount, user.remark, user.date],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});

// createForm查询
router.get("/getRevenue", (req, res) => {
  db.query("select * from zjc ", (err, result) => {
    if (err) {
      console.log(err + "err");
    } else {
      res.send({
        status: 0,
        msg: "success",
        data: result,
      });
    }
  });
});

// createForm修改

router.put("/putRevenue", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    name: body.name,
    source: body.source,
    amount: body.amount,
    remark: body.remark,
    date: body.date,
    id: body.id,
  };
  const sqlStr =
    "update zjc set name=?,source=?,amount=? ,remark=? ,date=? where id=? ";
  db.query(
    sqlStr,
    [user.name, user.source, user.amount, user.remark, user.date, user.id],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});

// createForm删除

router.delete("/deleteRevenue/:id", (req, res) => {
  const body = req.params.id;
  console.log(body);
  const sqlStr = "delete from zjc where id = ?";
  db.query(sqlStr, [body], (err, result) => {
    if (err) {
      console.log(err + "err");
    }
    if (result.affectedRows === 1) {
      console.log("success");
      res.send({
        status: 0,
        msg: "success",
      });
    }
  });
});

// 上传头像（暂时废弃）

router.post("/postUpload", (req, res, next) => {
  const upload = uploadFiles({
    path: './public/images',  //设置上传成功后的路径
    key: "file",
    size: 1000
  });
  upload(req, res, (err) => {
    let { file } = req.body
    console.log(req.body)
    console.log(JSON.parse(file))
    if (err) {
      res.send({
        status: 0,
        msg: "failed",
        data: req.body.files
      });
    } else {
      res.send({
        status: 0,
        msg: "success",
        data: req.body.files
      });
    }
  })
});

// 查找用户信息

router.get("/getUserData", (req, res) => {
  db.query("select * from user ", (err, result) => {
    if (err) {
      console.log(err + "err");
    } else {
      res.send({
        status: 0,
        msg: "success",
        data: result,
      });
    }
  });
});

// 修改用户信息操作
router.put("/putUserInfo", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    username: body.username,
    realname: body.realname,
    age: body.age,
    phone: body.phone,
    email: body.email,
    id: body.id,
  };
  const sqlStr =
    "update user set username=?,realname=?,age=? ,phone=? ,email=? where id=? ";
  db.query(
    sqlStr,
    [user.username, user.realname, user.age, user.phone, user.email, user.id],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});






// 地图路径查询

router.get("/getLocation", (req, res) => {
  db.query("select * from location ", (err, result) => {
    if (err) {
      console.log(err + "err");
    } else {
      res.send({
        status: 0,
        msg: "success",
        data: result,
      });
    }
  });
});

// 新增地图路径

router.post("/postLocation", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    province: body.province,
    city: body.city,
  };
  const sqlStr =
    "INSERT INTO location(province,city) VALUES (?,?)";
  db.query(
    sqlStr,
    [user.province, user.city],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );

  // 清除路径
  router.delete("/deleteLocation", (req, res) => {
    const sqlStr = "delete from location";
    console.log(body);
    db.query(sqlStr, (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      else{
        res.send({
          status: 0,
          msg: "success",
        })
      }
    });
  });

});


router.put("/putEditList", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = {
    name: body.name,
    age: body.age,
    address: body.address,
    id: body.id,
  };
  const sqlStr =
    "update editTable set name=?,age=?,address=? where id=? ";
  db.query(
    sqlStr,
    [user.name, user.age, user.address, user.id],
    (err, result) => {
      if (err) {
        console.log(err + "err");
      }
      if (result.affectedRows === 1) {
        console.log("success");
        res.send({
          status: 0,
          msg: "success",
          data: body,
        });
      }
    }
  );
});


module.exports = router;
