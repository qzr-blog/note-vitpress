# node镜像
FROM node:16-alpine
# 维护者信息
LABEL maintainer="z5021996@vip.qq.com"

# 拷贝前端项目 当前目录下的所有文件到fontend目录下(./指当前所有的代码路径 .指上一步cd到fontend的路径)
COPY . /app

# 指定接下来的工作路径为/fontend  - 类似于cd命令
WORKDIR /app

# 声明运行容器时提供的服务端口，这只是一个声明，在运行时并不会因为这个声明应用就会开启这个端口的服务
EXPOSE 4173

# CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
# 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
# 例如 CMD cd /app && ./start.sh
CMD npm run docs:serve
