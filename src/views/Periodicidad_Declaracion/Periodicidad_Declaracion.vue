<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Periodicidad_Declaracion'" :tituloBoton="'Crear Periodicidad_Declaracion'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Periodicidad de Declaracion'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormPeriodicidad_Declaracion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                          nombre="nombre":dataValue="dataPeriodicidad_DeclaracionById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Periodicidad_Declaracion" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
                              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarPeriodicidad_Declaracion(registro.row.id)"></el-button>
                  </template>
              </el-table-column>
          </el-table>

      </template>


  </LayoutMain>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue';
import Formulario from '../../components/Formulario.vue';
import Header from '../../components/Header.vue';
import { Delete, Edit } from "@element-plus/icons-vue"
import FormPeriodicidad_Declaracion from './components/formPeriodicidad_Declaracion.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataPeriodicidad_DeclaracionById = ref()
const Periodicidad_Declaracion = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataPeriodicidad_DeclaracionById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearPeriodicidad_Declaracion()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarPeriodicidad_Declaracion()
  }
}

const crearPeriodicidad_Declaracion = async () => {

  const url = 'http://127.0.0.1:8000/api/PeriodicidadDeclaracion/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
          }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Periodicidad de la Declaracion se creo con exito    .',
                  type: 'success',
              })
              datosPeriodicidad_Declaracion()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Periodicidad de la Declaracion ', error)
  }
}

const actualizarPeriodicidad_Declaracion = async () => {


  const url = 'http://127.0.0.1:8000/api/PeriodicidadDeclaracion/update'

  const dataFormulario = {
      id:dataPeriodicidad_DeclaracionById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'La Periodicidad de la Declaracion se actualizo con exito    .',
                  type: 'success',
              })
              datosPeriodicidad_Declaracion()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Periodicidad de la Declaracion ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/PeriodicidadDeclaracion/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.data

  } catch (error) {
      console.error('error crear Periodicidad de la Declaracion ', error)
  }

}
const eliminarPeriodicidad_Declaracion = async (id) => {

  const url = 'http://127.0.0.1:8000/api/PeriodicidadDeclaracion/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar la Periodicidad de la Declaracion ',
      'Eliminar Registro',
      {
          confirmButtonText: 'SI',
          cancelButtonText: 'Cancelar',
          type: 'error',
      }
  )
      .then(() => {

          try {
              axios.delete(url, { data: { id } })
                  .then(function (response) {
                      datosPeriodicidad_Declaracion()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear Periodicidad de la Declaracion ', error)
          }
          ElMessage({
              type: 'success',
              message: 'Se elimino correctamente el registro',
          })
      })
      .catch(() => {
          ElMessage({
              type: 'info',
              message: 'Eliminacion cancelada',
          })
      })

}
const datosPeriodicidad_Declaracion = async () => {

  const url = 'http://127.0.0.1:8000/api/PeriodicidadDeclaracion/datos'

  try {
      axios.get(url)
          .then(function (response) {
            Periodicidad_Declaracion.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Periodicidad de la Declaracion ', error)
  }


}

  try {
      axios.get(url)
          .then(function (response) {
              // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Periodicidad de la Declaracion ', error)
  }


onMounted(() => {
     datosPeriodicidad_Declaracion()
})

</script>