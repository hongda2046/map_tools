// 地图资源数据
const MAP_RESOURCES = [
    // 1级鹿资源
    { monsterId: 10001, type: 1, name: "1级鹿", category: "动物", level: 1 },
    { monsterId: 10002, type: 1, name: "2级鹿", category: "动物", level: 2 },
    { monsterId: 10003, type: 1, name: "3级鹿", category: "动物", level: 3 },
    { monsterId: 10004, type: 1, name: "4级鹿", category: "动物", level: 4 },
    { monsterId: 10005, type: 1, name: "5级鹿", category: "动物", level: 5 },
    { monsterId: 10006, type: 1, name: "6级鹿", category: "动物", level: 6 },
    { monsterId: 10007, type: 1, name: "7级鹿", category: "动物", level: 7 },
    { monsterId: 10008, type: 1, name: "8级鹿", category: "动物", level: 8 },
    { monsterId: 10009, type: 1, name: "9级鹿", category: "动物", level: 9 },
    { monsterId: 10010, type: 1, name: "10级鹿", category: "动物", level: 10 },
    { monsterId: 10011, type: 1, name: "11级狼", category: "动物", level: 11 },
    { monsterId: 10012, type: 1, name: "12级狼", category: "动物", level: 12 },
    { monsterId: 10013, type: 1, name: "13级狼", category: "动物", level: 13 },
    { monsterId: 10014, type: 1, name: "14级狼", category: "动物", level: 14 },
    { monsterId: 10015, type: 1, name: "15级狼", category: "动物", level: 15 },
    { monsterId: 10016, type: 1, name: "16级狼", category: "动物", level: 16 },
    { monsterId: 10017, type: 1, name: "17级狼", category: "动物", level: 17 },
    { monsterId: 10018, type: 1, name: "18级狼", category: "动物", level: 18 },
    { monsterId: 10019, type: 1, name: "19级狼", category: "动物", level: 19 },
    { monsterId: 10020, type: 1, name: "20级狼", category: "动物", level: 20 },
    { monsterId: 10021, type: 1, name: "21级熊", category: "动物", level: 21 },
    { monsterId: 10022, type: 1, name: "22级熊", category: "动物", level: 22 },
    { monsterId: 10023, type: 1, name: "23级熊", category: "动物", level: 23 },
    { monsterId: 10024, type: 1, name: "24级熊", category: "动物", level: 24 },
    { monsterId: 10025, type: 1, name: "25级熊", category: "动物", level: 25 },
    { monsterId: 10026, type: 1, name: "26级熊", category: "动物", level: 26 },
    { monsterId: 10027, type: 1, name: "27级熊", category: "动物", level: 27 },
    { monsterId: 10028, type: 1, name: "28级熊", category: "动物", level: 28 },
    { monsterId: 10029, type: 1, name: "29级熊", category: "动物", level: 29 },
    { monsterId: 10030, type: 1, name: "30级熊", category: "动物", level: 30 },
	
    { monsterId: 20001, type: 1, name: "Boss1级", category: "BOSS", level: 20 },
    { monsterId: 20002, type: 1, name: "Boss2级", category: "BOSS", level: 21 },
    { monsterId: 20003, type: 1, name: "Boss3级", category: "BOSS", level: 22 },
    { monsterId: 20004, type: 1, name: "Boss4级", category: "BOSS", level: 23 },
    { monsterId: 20005, type: 1, name: "Boss5级", category: "BOSS", level: 24 },
    { monsterId: 20006, type: 1, name: "Boss6级", category: "BOSS", level: 25 },
    { monsterId: 20007, type: 1, name: "Boss7级", category: "BOSS", level: 26 },
    { monsterId: 20008, type: 1, name: "Boss8级", category: "BOSS", level: 27 },
    { monsterId: 20009, type: 1, name: "Boss9级", category: "BOSS", level: 28 },
    { monsterId: 20010, type: 1, name: "Boss10级", category: "BOSS", level: 29 },
	
    // 废弃种植园资源
    { monsterId: 1001, type: 2, name: "废弃种植园1级", category: "废弃资源", level: 1 },
    { monsterId: 1002, type: 2, name: "废弃种植园2级", category: "废弃资源", level: 2 },
    { monsterId: 1003, type: 2, name: "废弃种植园3级", category: "废弃资源", level: 3 },
    { monsterId: 1004, type: 2, name: "废弃种植园4级", category: "废弃资源", level: 4 },
    { monsterId: 1005, type: 2, name: "废弃种植园5级", category: "废弃资源", level: 5 },
    { monsterId: 1006, type: 2, name: "废弃种植园6级", category: "废弃资源", level: 6 },
    { monsterId: 1007, type: 2, name: "废弃种植园7级", category: "废弃资源", level: 7 },
    { monsterId: 1008, type: 2, name: "废弃种植园8级", category: "废弃资源", level: 8 },
    // 废弃木材场资源
    { monsterId: 2001, type: 2, name: "废弃木材场1级", category: "废弃资源", level: 1 },
    { monsterId: 2002, type: 2, name: "废弃木材场2级", category: "废弃资源", level: 2 },
    { monsterId: 2003, type: 2, name: "废弃木材场3级", category: "废弃资源", level: 3 },
    { monsterId: 2004, type: 2, name: "废弃木材场4级", category: "废弃资源", level: 4 },
    { monsterId: 2005, type: 2, name: "废弃木材场5级", category: "废弃资源", level: 5 },
    { monsterId: 2006, type: 2, name: "废弃木材场6级", category: "废弃资源", level: 6 },
    { monsterId: 2007, type: 2, name: "废弃木材场7级", category: "废弃资源", level: 7 },
    { monsterId: 2008, type: 2, name: "废弃木材场8级", category: "废弃资源", level: 8 },
    // 废弃煤矿场资源
    { monsterId: 3001, type: 2, name: "废弃煤矿场1级", category: "废弃资源", level: 1 },
    { monsterId: 3002, type: 2, name: "废弃煤矿场2级", category: "废弃资源", level: 2 },
    { monsterId: 3003, type: 2, name: "废弃煤矿场3级", category: "废弃资源", level: 3 },
    { monsterId: 3004, type: 2, name: "废弃煤矿场4级", category: "废弃资源", level: 4 },
    { monsterId: 3005, type: 2, name: "废弃煤矿场5级", category: "废弃资源", level: 5 },
    { monsterId: 3006, type: 2, name: "废弃煤矿场6级", category: "废弃资源", level: 6 },
    { monsterId: 3007, type: 2, name: "废弃煤矿场7级", category: "废弃资源", level: 7 },
    { monsterId: 3008, type: 2, name: "废弃煤矿场8级", category: "废弃资源", level: 8 },
    // 废弃炼铁厂资源
    { monsterId: 4001, type: 2, name: "废弃炼铁厂1级", category: "废弃资源", level: 1 },
    { monsterId: 4002, type: 2, name: "废弃炼铁厂2级", category: "废弃资源", level: 2 },
    { monsterId: 4003, type: 2, name: "废弃炼铁厂3级", category: "废弃资源", level: 3 },
    { monsterId: 4004, type: 2, name: "废弃炼铁厂4级", category: "废弃资源", level: 4 },
    { monsterId: 4005, type: 2, name: "废弃炼铁厂5级", category: "废弃资源", level: 5 },
    { monsterId: 4006, type: 2, name: "废弃炼铁厂6级", category: "废弃资源", level: 6 },
    { monsterId: 4007, type: 2, name: "废弃炼铁厂7级", category: "废弃资源", level: 7 },
    { monsterId: 4008, type: 2, name: "废弃炼铁厂8级", category: "废弃资源", level: 8 }
];

// 资源类别配置
const RESOURCE_CONFIG = {
    // 动物资源 - 显示为 🦌
    1: { icon: "🦌", color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.2)" },
    // 废弃资源 - 显示为 🏭
    2: { icon: "🏭", color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.2)" }
};

// 获取资源信息
function getResourceByMonsterId(monsterId) {
    return MAP_RESOURCES.find(resource => resource.monsterId === monsterId);
}

// 获取格子对应的资源
function getResourceForCell(cellId) {
    // 简单的循环分配资源，您可以根据需要修改分配逻辑
    const resourceIndex = (cellId - 1) % MAP_RESOURCES.length;
    return MAP_RESOURCES[resourceIndex];
}

// 筛选资源
function filterResources(category = null, type = null, minLevel = null, maxLevel = null) {
    return MAP_RESOURCES.filter(resource => {
        if (category && resource.category !== category) return false;
        if (type && resource.type !== type) return false;
        if (minLevel && resource.level < minLevel) return false;
        if (maxLevel && resource.level > maxLevel) return false;
        return true;
    });
}

// 搜索资源
function searchResources(keyword) {
    if (!keyword || keyword.trim() === '') {
        return MAP_RESOURCES;
    }
    const lowerKeyword = keyword.toLowerCase().trim();
    return MAP_RESOURCES.filter(resource =>
        resource.name.toLowerCase().includes(lowerKeyword) ||
        resource.category.toLowerCase().includes(lowerKeyword) ||
        resource.monsterId.toString().includes(lowerKeyword)
    );
}

// 获取所有类别
function getCategories() {
    return [...new Set(MAP_RESOURCES.map(resource => resource.category))];
}

// 获取所有类型
function getTypes() {
    return [...new Set(MAP_RESOURCES.map(resource => resource.type))];
}

// 获取等级范围
function getLevelRange() {
    const levels = MAP_RESOURCES.map(resource => resource.level);
    return {
        min: Math.min(...levels),
        max: Math.max(...levels)
    };
}