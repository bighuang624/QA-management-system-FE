import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve) // vue-datasource组件
                },
                {
                    path: '/student',
                    component: resolve => require(['../components/page/student/Home.vue'], resolve),
                    children: [{
                            path: '/',
                            component: resolve => require(['../components/page/student/Index.vue'], resolve)
                        },
                        {
                            path: 'add',
                            component: resolve => require(['../components/page/student/Add.vue'], resolve)
                        },
                        {
                            path: 'edit/:id',
                            component: resolve => require(['../components/page/student/Edit.vue'], resolve),
                            props: true
                        }
                    ]
                },
                {
                    path: '/customfaq',
                    component: resolve => require(['../components/page/customfaq/Home.vue'], resolve),
                    children: [{
                            path: '/',
                            component: resolve => require(['../components/page/customfaq/Index.vue'], resolve)
                        },
                        {
                            path: 'add',
                            component: resolve => require(['../components/page/customfaq/Add.vue'], resolve)
                        },
                        {
                            path: 'edit/:id',
                            component: resolve => require(['../components/page/customfaq/Edit.vue'], resolve),
                            props: true
                        }
                    ]
                },
                {
                    path: '/patternrecognition',
                    component: resolve => require(['../components/page/patternrecognition/Home.vue'], resolve),
                    children: [{
                            path: '/',
                            component: resolve => require(['../components/page/patternrecognition/Index.vue'], resolve)
                        },
                        {
                            path: 'add',
                            component: resolve => require(['../components/page/patternrecognition/Add.vue'], resolve)
                        },
                        {
                            path: 'edit/:id',
                            component: resolve => require(['../components/page/patternrecognition/Edit.vue'], resolve),
                            props: true
                        }
                    ]
                },
                {
                    path: '/classifiereffect',
                    component: resolve => require(['../components/page/showeffect/ClassifierEffect.vue'], resolve)
                },
                {
                    path: '/classifiereffect',
                    component: resolve => require(['../components/page/showeffect/ClassifierEffect.vue'], resolve)
                },
                {
                    path: '/similarityeffect',
                    component: resolve => require(['../components/page/showeffect/SimilarityEffect.vue'], resolve)
                },
                {
                    path: '/questionclustereffect',
                    component: resolve => require(['../components/page/showeffect/QuestionClusterEffect.vue'], resolve)
                },
                {
                    path: '/baikeknowledgeeffect',
                    component: resolve => require(['../components/page/showeffect/BaikeKnowledgeEffect.vue'], resolve)
                },
                {
                    path: '/searchengineeffect',
                    component: resolve => require(['../components/page/showeffect/SearchEngineEffect.vue'], resolve)
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve) // vue-schart组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})