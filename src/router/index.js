import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Ejemplo from '../views/ejemplo.vue'
import Pais from '../views/Pais.vue'

const routes =[

{
path:'/Cargos',
name:'Cargos',
component:Ejemplo,

},
{
    path:'/Pais',
    name:'Pais',
    component:Pais,
}

]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;
//esta enlazado a otro repositrio no entiendo profe