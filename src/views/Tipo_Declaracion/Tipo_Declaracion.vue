<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Tipo_Declaracion'" :tituloBoton="'Crear Tipo_Declaracion'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Tipo de Declaracion'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormTipo_Declaracion v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                          nombre="nombre":dataValue="dataTipo_DeclaracionById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Tipo_Declaracion" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
                              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarTipo_Declaracion(registro.row.id)"></el-button>
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
import FormTipo_Declaracion from './components/formTipo_Declaracion.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataTipo_DeclaracionById = ref()
const Tipo_Declaracion = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataTipo_DeclaracionById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearTipo_Declaracion()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarTipo_Declaracion()
  }
}

const crearTipo_Declaracion = async () => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDeclaracion/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
          }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Tipo de Declaracion se creo con exito    .',
                  type: 'success',
              })
              datosTipo_Declaracion()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Declaracion ', error)
  }
}

const actualizarTipo_Declaracion = async () => {


  const url = 'http://127.0.0.1:8000/api/TipoDeDeclaracion/update'

  const dataFormulario = {
      id:dataTipo_DeclaracionById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Tipo de Declaracion se actualizo con exito    .',
                  type: 'success',
              })
              datosTipo_Declaracion()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Declaracion', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDeclaracion/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.data

  } catch (error) {
      console.error('error crear Tipo de Declaracion ', error)
  }

}
const eliminarTipo_Declaracion = async (id) => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDeclaracion/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el Tipo de Declaracion ',
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
                      datosTipo_Declaracion()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear Tipo de Declaracion ', error)
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
const datosTipo_Declaracion = async () => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDeclaracion/datos'

  try {
      axios.get(url)
          .then(function (response) {
            Tipo_Declaracion.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Declaracion ', error)
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
      console.error('error crear Tipo de Declaracion ', error)
  }


onMounted(() => {
     datosTipo_Declaracion()
})

</script>