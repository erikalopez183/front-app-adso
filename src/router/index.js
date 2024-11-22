import {createRouter, createWebHistory} from 'vue-router'
import Pais from '../views/Pais/Pais.vue'
import Cargo from '../views/Cargo/Cargo.vue'
import Asignacion_Empresa from '../views/Asignacion_Empresa/Asignacion_Empresa.vue'
import Ciudad from '../views/Ciudad/Ciudad.vue'
import Clasificacion_Tributaria from '../views/Clasificacion_Tributaria/Clasificacion_Tributaria.vue'
import Departamento from '../views/Departamento/Departamento.vue'
import Empresa from '../views/Empresa/Empresa.vue'
import Firma_Impuesto from '../views/Firma_Impuesto/Firma_Impuesto.vue'
import Informacion_Impuesto from '../views/Informacion_Impuesto/Informacion_Impuesto.vue'
import Pago_Impuesto from '../views/Pago_Impuesto/Pago_Impuesto.vue'
import Periodicidad_Declaracion from '../views/Periodicidad_Declaracion/Periodicidad_Declaracion.vue'
import Presentacion_Impuesto from '../views/Presentacion_Impuesto/Presentacion_Impuesto.vue'
import Revision_Impuesto from '../views/Revision_Impuesto/Revision_Impuesto.vue'
import Tercero from '../views/Tercero/Tercero.vue'
import Tipo_Declaracion from '../views/Tipo_Declaracion/Tipo_Declaracion.vue'
import Tipo_Documento from '../views/Tipo_Documento/Tipo_Documento.vue'
import Usuario from '../views/Usuario/Usuario.vue'
import LayoutMain from '../components/LayoutMain.vue'
import Login from '../components/login.vue'

const routes =[

{
    path:'/',
    name:'home',
    component:LayoutMain,
},
{
    path:'/login',
    name:'login',
    component:Login,
},

{
    path:'/pais',
    name:'Pais',
    component: Pais,
},
{
    path:'/Cargo',
    name:'Cargo',
    component: Cargo,
},
{
    path:'/Asignacion_Empresa',
    name:'Asignacion_Empresa',
    component: Asignacion_Empresa,
},
{
    path:'/Ciudad',
    name:'Ciudad',
    component: Ciudad,
},
{
    path:'/Clasificacion_Tributaria',
    name:'Clasificacion_Tributaria',
    component: Clasificacion_Tributaria,
},
{
    path:'/Departamento',
    name:'Departamento',
    component: Departamento,
},
{
    path:'/Empresa',
    name:'Empresa',
    component: Empresa,
},
{
    path:'/Firma_Impuesto',
    name:'Firma_Impuesto',
    component: Firma_Impuesto,
},
{
    path:'/Informacion_Impuesto',
    name:'Informacion_Impuesto',
    component: Informacion_Impuesto,
},
{
    path:'/Pago_Impuesto',
    name:'Pago_Impuesto',
    component: Pago_Impuesto,
},
{
    path:'/Periodicidad_Declaracion',
    name:'Periodicidad_Declaracion',
    component: Periodicidad_Declaracion,
},
{
    path:'/Presentacion_Impuesto',
    name:'Presentacion_Impuesto',
    component: Presentacion_Impuesto,
},
{
    path:'/Revision_Impuesto',
    name:'Revision_Impuesto',
    component: Revision_Impuesto,
},
{
    path:'/Tercero',
    name:'Tercero',
    component: Tercero,
},
{
    path:'/Tipo_Declaracion',
    name:'Tipo_Declaracion',
    component: Tipo_Declaracion,
},
{
    path:'/Tipo_Documento',
    name:'Tipo_Documento',
    component: Tipo_Documento,
},
{
    path:'/Usuario',
    name:'Usuario',
    component: Usuario,
},
]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;