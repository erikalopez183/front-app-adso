<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Pais'" :tituloBoton="'Crear Pais'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Pais'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormPais v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                          nombre="nombre":dataValue="dataPaisById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Pais" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
                              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarPais(registro.row.id)"></el-button>
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
import FormPais from './components/formPais.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataPaisById = ref()
const Pais = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataPaisById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearPais()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarPais()
  }
}

const crearPais = async () => {

  const url = 'http://127.0.0.1:8000/api/Pais/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
          }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Pais se creo con exito    .',
                  type: 'success',
              })
              datosPais()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear pais ', error)
  }
}

const actualizarPais = async () => {


  const url = 'http://127.0.0.1:8000/api/Pais/update'

  const dataFormulario = {
      id:dataPaisById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El pais se actualizo con exito    .',
                  type: 'success',
              })
              datosPais()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear pais ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Pais/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.data

  } catch (error) {
      console.error('error crear pais ', error)
  }

}
const eliminarPais = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Pais/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el pais ',
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
                      datosPais()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear Pais ', error)
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
const datosPais = async () => {

  const url = 'http://127.0.0.1:8000/api/Pais/datos'

  try {
      axios.get(url)
          .then(function (response) {
              Pais.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear pais ', error)
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
      console.error('error crear pais ', error)
  }


onMounted(() => {
     datosPais()
})

</script>