<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/readme',
                        title: '系统介绍'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '问答库管理',
                        subs: [
                            {
                                index: '/student',
                                title: '学生管理'
                            },
                            {
                                index: '/customfaq',
                                title: '自定义问答管理'
                            },
                            {
                                index: '/patternrecognition',
                                title: '模式识别问答库管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: '效果演示',
                        subs: [
                            {
                                index: '/classifiereffect',
                                title: '问题分类效果'
                            },
                            {
                                index: '/similarityeffect',
                                title: '相似度计算'
                            },
                            {
                                index: '/questionclustereffect',
                                title: '聚类效果'
                            },
                            {
                                index: '/baikeknowledgeeffect',
                                title: '百科知识库演示'
                            },
                            {
                                index: '/searchengineeffect',
                                title: '搜索引擎查找演示'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '4',
                        title: '可用组件',
                        subs: [
                            {
                                index: '/upload',
                                title: '文件上传'
                            }
                        ]
                    },
                     {
                        icon: 'el-icon-date',
                        index: '5',
                        title: '其它功能',
                        subs: [
                            {
                                index: '/basetable',
                                title: '基础表格'
                            },
                            {
                                index: '/vuetable',
                                title: 'Vue表格组件'
                            },
                            {
                                icon: 'el-icon-star-on',
                                index: '/basecharts',
                                title: '图表'
                            }
                        ]
                     }
                ]
            }
        },
        computed:{
            onRoutes(){
                var basePath = this.$route.path.split('/')[1];
                return '/'+basePath;
                // return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
