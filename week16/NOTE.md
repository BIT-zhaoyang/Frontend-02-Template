学习笔记
# Yeoman
Yeoman is a generator of generator.根据目前的视频看下来，Yeoman的是用作创造一个类似于vue-cli一样的命令行工具的工具。vue-cli本身是一个generator，用来生成新项目所需要的一些模板。Yeoman则是生成一个这样的generator的generator。

# Webpack
Webpack的作用：收集，整理，重新打包。收集过程当中，会分析文件，建立依赖关系图(收集)。然后合并这些不同的文件到同一个文件中(整理)。最后按文件类型重新打包。Webpack的几个重点概念：
- Entry
  - 类似于单个文件里的main函数。Entry文件是整个项目的入口。Webpack由此文件开始进行依赖解析。
- Output
  - As the name suggests, it indicates where the generated files should be placed at.
- Loaders
  - 最重要的一部分。Webpack原本是为了解决js的依赖而出现的。所以Webpack本身只能处理js文件。但是有许多别的文件需要处理。那么就可以通过Loaders来解决这个问题了。Loaders可以处理别的格式的文件。然后根据这些文件创建module，再让webpack集成这些module。
- Plugins
  - 比Loaders应用的范围更广一些。还可以做一些copy，模板生成之类的工作。
- Mode
  - production, develop, default

# Babel
