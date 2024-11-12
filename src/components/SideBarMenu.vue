<template>

        <el-menu
        :default-active="$route.path"
        router
          class="el-menu-vertical-demo"
          background-color="#242629"
          text-color="#fff"
          collapse-transition
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Administrador</span>
            </template>
  
            <el-menu-item index="Pais">Pais</el-menu-item>
            <el-menu-item index="Departamento">Departamento</el-menu-item>
            <el-menu-item index="Ciudad">Ciudad</el-menu-item>
            <el-menu-item index="Tercero">Tercero</el-menu-item>
            <el-menu-item index="Usuario">Usuario</el-menu-item>
            <el-menu-item index="Cargo">Cargo</el-menu-item>
            <el-menu-item index="Empresa">Empresa</el-menu-item>
            <el-menu-item index="Clasificacion_Tributaria">Clasificacion Tributaria</el-menu-item>
            <el-menu-item index="Tipo_Declaracion">Tipo Declaracion</el-menu-item>
            <el-menu-item index="Tipo_Documento">Tipo Documento</el-menu-item>
            <el-menu-item index="Periodicidad_Declaracion">Periodicidad Declaracion</el-menu-item>
            <el-menu-item index="Informacion_Impuesto">Informacion Impuesto</el-menu-item>
            <el-menu-item index="Asignacion Empresa">Asignacion Empresa</el-menu-item>
            <el-menu-item index="Usuario">Usuario</el-menu-item>
            <el-menu-item index="Revision_Impuesto">Revision Impuesto</el-menu-item>
            <el-menu-item index="Presentacion_Impuesto">Presentacion Impuesto</el-menu-item>
            <el-menu-item index="Pago_Impuesto">Pago Impuesto</el-menu-item>
            
          </el-sub-menu>

        </el-menu>
  </template>
  
  <script lang="ts" setup>
  import {Location} from '@element-plus/icons-vue';
  </script>
  
  <style scoped>
  html, body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
  }
  

  
  .el-menu-vertical-demo {
    width: 250px;
    min-height: 100%;
  }
  </style>
  