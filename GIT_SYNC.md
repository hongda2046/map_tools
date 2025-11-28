# Git 同步管理

## 仓库信息

**GitHub 仓库地址**: https://github.com/hongda2046/map_tools

**当前分支**: main

**初始化时间**: 2025-11-28

## 同步记录

### 当前版本信息
- **提交哈希**: a0e4693
- **提交消息**: Initial commit: 地图格子生成工具 v2.0
- **提交时间**: 2025-11-28 15:07
- **分支状态**: main (最新)

### 同步历史

| 序号 | 日期 | 版本 | 提交信息 | 状态 |
|------|------|------|----------|------|
| 1 | 2025-11-28 | v2.0 | Initial commit: 地图格子生成工具 v2.0 | ✅ 已推送 |

## 常用 Git 命令

### 查看状态
```bash
git status                    # 查看工作区状态
git log --oneline            # 查看提交历史（简洁版）
git log                      # 查看详细提交历史
git diff                     # 查看未暂存的更改
git diff --staged           # 查看已暂存未提交的更改
```

### 基本操作
```bash
git add .                    # 添加所有文件到暂存区
git add <filename>           # 添加指定文件到暂存区
git commit -m "提交信息"     # 提交暂存区的文件
git push                     # 推送到远程仓库
git pull                     # 拉取远程仓库更新
```

### 分支管理
```bash
git branch                   # 查看所有分支
git branch <branch-name>     # 创建新分支
git checkout <branch-name>   # 切换分支
git merge <branch-name>      # 合并分支
git branch -d <branch-name>  # 删除本地分支
```

## 版本控制约定

### 提交消息格式
```
<类型>: <简要描述>

详细描述（可选）
```

**类型说明**:
- `feat`: 新功能
- `fix`: 问题修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例**:
```
feat: 添加新的格子导出格式
fix: 修复缩放后坐标偏移问题
docs: 更新README使用说明
```

### 版本号规则
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订版本号**: 向下兼容的问题修正

## 待同步任务

### 当前状态检查清单
- [ ] 检查工作区是否有未提交的更改
- [ ] 确认所有重要文件已添加到暂存区
- [ ] 验证提交消息格式正确
- [ ] 确认远程仓库连接正常

## 备份和恢复

### 本地备份
```bash
# 打包项目文件
tar -czf map_tools_backup_$(date +%Y%m%d).tar.gz --exclude='.git' .

# 或者使用Git创建备份标签
git tag backup_$(date +%Y%m%d)
git push origin backup_$(date +%Y%m%d)
```

### 恢复操作
```bash
# 恢复到指定提交
git reset --hard <commit-hash>

# 恢复到指定标签
git reset --hard backup_YYYYMMDD
```

## 常见问题解决

### 推送失败
1. **网络问题**: 检查网络连接
2. **认证问题**: 检查SSH密钥或访问令牌
3. **权限问题**: 确认对仓库有写入权限
4. **冲突问题**: 先执行 `git pull` 解决冲突

### 合并冲突
```bash
git pull origin main
# 解决冲突文件
git add .
git commit -m "解决合并冲突"
git push origin main
```

## 联系信息

**开发者**: hongda2046
**GitHub**: https://github.com/hongda2046
**项目**: map_tools

---

**使用说明**: 当需要同步代码到GitHub时，直接说"推送到git"，我会检查当前状态并执行同步操作。