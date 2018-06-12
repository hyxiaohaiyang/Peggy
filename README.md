# 项目介绍

## 产品名

PEGGY日程

## 应用场景

你有没有听说过这样一种理论：人们眼中的天才之所以卓越非凡，并非天资超人一等，而是付出了持续不断的努力。1万小时的锤炼是任何人从平凡变成世界级大师的必要条件。
我们每天给自己制定计划，安排计划，不是被计划安排！还可以把个人的计划评估分享给你的好友喔，让大家一起努力和进步！

## 核心功能

制定多种类型的日程计划、通过日历的方式管理每日计划、按照年月生成日程计划的总结报表

## 功能点列表

> * 创建不同重要程度以及不同种类（单日或者多日）或者非当日的日程
> * 删除日程
> *	对某个日程设置完成状态（已完成或未完成）
> * 首页今日日程可按照三种排序方式排序（重要程度，类型，完成状态）
> *	日程评估可对当月，上月，今年的所有日程进行分析评估并生成汇总图表
> *	可分享个人的日程汇总图表给自己的微信好友
> *	首页显示当日当地的天气信息以及每天的心灵鸡汤短句
> *	通过日历的方式管理日程

## 演示视频以及线上代码库
[演示视频](https://v.qq.com/x/page/l0683fp3i69.html)

[后端代码 Project Mikey](https://github.com/Lurance/Mikey)

[前端代码 Project Peggy](https://github.com/Lurance/Peggy)


# 核心页面展示

## 首页

![首页](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0296.PNG)

最上方显示每日心灵鸡汤短句以及当日当地的天气状况（需要定位权限）

往下的导航栏两个按钮分别进入日程评估页面以及历史日程管理页面

下方内容区域显示了当天的所有日程，用户可对日程进行诸如删除，设置完成状态以及按某种方式排序的操作

值得一提的是，首次使用该产品的用户将会有默认的5个日程用来指导用户如何使用：

![首页](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/n.png)

## 历史日程评估页面

![历史日程评估页面](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0297.PNG)

首页点击历史日程评估按钮即可进入该页面

页面中分析同统计了该用户的所有日程，以环状图的形式给出了当月以及上月的日程的完成率；以折线图的形式给出了当年的日程情况

点击右上方的按钮即可将该页面分享给微信好友

## 微信好友的历史日程评估页面

![微信好友的历史日程评估页面](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0299.PNG)

点击好友的分享时的页面。

此页面并无分享按钮

可点击右上按钮“…”来回到首页


## 历史日程汇总页面

![历史日程汇总页面](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0300.PNG)

首页点击历史日程汇总按钮进入该页面

用户可以通过点击具体的日期来查看某天的日程（选择日期）

最上方有两个切换按钮来切换日历的月份，下方的日期有外部黄色圆环的表示当日有日程，底色为蓝色的则是当天的日期

最下方的加号可以用于创建新的日程，默认创建当天的日程，如果选择了日期则会创建选择日期那日的日程


## 历史日程汇总—新建日程页面

![历史日程汇总—新建日程页面](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0301.PNG)

上方可切换日程的类型（是单日还是多日）

下方并排三按钮可选择日程的重要程度

多日示例：

![多日](https://raw.githubusercontent.com/Lurance/Peggy/master/demo/IMG_0302.jpg)

如果创建的是多日类型的日程，则会从开始日期到截止日期这之间的每一天创建相同内容的日程，且这些日程共享状态例如删除某一个则都会删除，设置某一个已完成则都会应用该设置。



# 团队组成以及分工

## 团队名

Team Peggy

## 团队组成

队长：Niang，负责产品的设计（涵盖UI以及逻辑交互），产品技术选型，产品前端开发以及后端开发，后端的运维以及文档部分内容编写。

成员一：Panda，负责产品的设计（涵盖UI以及逻辑交互），产品的前端开发以及文档部分内容的编写。

成员二：HUI，负责产品的设计（涵盖UI以及逻辑交互），产品的前端开发


# 技术开发方案

## 后端

[代码库](https://github.com/Lurance/Mikey)

后端的技术选型为NodeJS + MongoDB

所采用的相关框架为Koa（WebService），mongoose（ORM），Mocha（TEST）

采用的开发语言为TypeScript

详细的目录结构，架构设计可参见代码库中的README.md文件

## 前端

[代码库](https://github.com/Lurance/Peggy)

前端技术选行为MPVUE + Vuex

采用的开发语言为HTML + CSS + JavaScript










