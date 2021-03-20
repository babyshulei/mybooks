# Docker

## 简介

 [Docker](https://www.docker.com/)

### 背景

软件运行需要在相应的环境下才能正常运行，软件开发第一步就是进行环境配置。如何为软件提供相应的环境？目前有两种方案：虚拟机和Linux容器。

#### 虚拟机

虚拟机（virtual machine）就是带环境安装的一种解决方案。它可以在一种操作系统里面运行另一种操作系统，比如在 Windows 系统里面运行 Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。

虽然用户可以通过虚拟机还原软件的原始环境。但是，这个方案有几个缺点。

- 资源占用多
- 冗余步骤多
- 启动慢

#### Linux 容器

由于虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。

**Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。**或者说，在正常进程的外面套了一个[保护层](https://opensource.com/article/18/1/history-low-level-container-runtimes)。对于容器里面的进程来说，它接触到的各种资源都是虚拟的，从而实现与底层系统的隔离。

由于容器是进程级别的，相比虚拟机有很多优势。

- 启动快
- 资源占用少
- 体积小

### Docker 是什么？

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。**它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。



### Docker 的用途

目前主要有：

- **提供一次性的环境。**比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。
- **提供弹性的云服务。**因为 Docker 容器可以随开随关，很适合动态扩容和缩容。
- **组建微服务架构。**通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

## 实践

### Docker 的安装

Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。

Docker CE 的安装可参考官方文档：[Windows](https://docs.docker.com/docker-for-windows/install/)。

安装完成后，运行下面的命令，验证是否安装成功。

```bash
$ docker version
# 或者
$ docker info
```

### 常用命令

1、将 image 文件从仓库抓取到本地

```bash
$ docker image pull library/hello-world
```

其中，`library/hello-world`是 image 文件在仓库里面的位置，`library`是 image 文件所在的组，`hello-world`是 image 文件的名字。

由于 Docker 官方提供的 image 文件，都放在[`library`](https://hub.docker.com/r/library/)组里面，所以它的是默认组，可以省略。上面命令可以写成：

```bash
$ docker image pull hello-world
```



2、运行 image 文件

新建容器：

```bash
$ docker container run hello-world
```

有些文件运行会自动停止，容器自动终止；有些容器提供的是服务，不会自动终止，需要调用命令手动终止。

启动已经生成/停止运行的容器文件

```bash
$ docker container start [containerID]
```



3、手动终止容器服务

终止容器运行：

```bash
$ bash container stop [containerID]
```

直接命令终止容器运行，会丢失正在进行中的操作：

```bash
$ docker container kill [containID]
```



4、删除容器文件

终止运行的容器文件，依然会占据硬盘空间，可以通过此命令删除。

```bash
$ docker container rm [containerID]
```



5、查看docker容器的输出

```bash
$ docker container logs [containerID]
```



6、进入一个正在运行的docker容器

```bash
$ docker container exec -it [containerID] /bin/bash
```



7、从正在运行的 Docker 容器里面，将文件拷贝到本机

```bash
# 拷贝到当前目录
$ docker container cp [containID]:[/path/to/file] .
```



### 容器文件

**image 文件生成的容器实例，本身也是一个文件，称为容器文件。**也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。

```bash
# 列出本机正在运行的容器
$ docker container ls

# 列出本机所有容器，包括终止运行的容器
$ docker container ls --all
```

### 制作自己的Docker容器

学会使用 image 文件以后，接下来的问题就是，如何可以生成 image 文件？

这就需要用到 `Dockerfile` 文件。它是一个文本文件，用来配置 image。Docker 根据 该文件生成二进制的 image 文件。

#### 1、编写 Dockerfile 文件。

在项目根目录下，新建 `.dockerignore` 文件，里面写上打包image时要排除的路径。

在项目根目录下，新建 `Dockerfile` 文件，里面写生成image文件的相关代码。

#### 2、创建image文件

有了 Dockerfile 文件以后，就可以使用`docker image build`命令创建 image 文件了。

```bash
$ docker image build -t koa-demo .
# 或者
$ docker image build -t koa-demo:0.0.1 
```

#### 3、生成容器

`docker container run`命令会从 image 文件生成容器。

```bash
$ docker container run -p 8000:3000 -it koa-demo /bin/bash
# 或者
$ docker container run -p 8000:3000 -it koa-demo:0.0.1 /bin/bash
```

### 踩坑

1、报错：

```
failed to solve with frontend dockerfile.v0: failed to create LLB definition: rpc error: code = Unknown desc = error getting credentials - err: exec: "docker-credential-desktop.exe": executable file not found in $PATH, out: ``
```

解决方案，添加软链接：

```
sudo  ln -s /mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-credential-desktop.exe /usr/bin/docker-credential-desktop.exe
```

参见：

[Update to Docker Desktop Community 2.3.0.2 breaks docker-compose](https://github.com/docker/for-win/issues/6652#)

[WSL2 integration breaks docker inside WSL2 after uninstalling Docker Desktop for Windows](https://github.com/docker/for-win/issues/7957#)



## 参考链接

[Docker 入门教程- 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)

