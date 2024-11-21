<template>
  <LayoutMain>
      <template #slotLayout>
          <Header :titulo="'Tipo_Documento'" :tituloBoton="'Crear Tipo_Documento'" :abrir="abrirFormulario" />


          <Formulario :titulo="'Gestion de Tipo de Documento'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormTipo_Documento v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                          nombre="nombre":dataValue="dataTipo_DocumentoById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Tipo_Documento" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
                              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarTipo_Documento(registro.row.id)"></el-button>
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
import FormTipo_Documento from './components/formTipo_Documento.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataTipo_DocumentoById = ref()
const Tipo_Documento = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataTipo_DocumentoById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearTipo_Documento()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarTipo_Documento()
  }
}

const crearTipo_Documento = async () => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDocumento/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
          }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Tipo de Documento se creo con exito    .',
                  type: 'success',
              })
              datosTipo_Documento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Documento ', error)
  }
}

const actualizarTipo_Documento = async () => {


  const url = 'http://127.0.0.1:8000/api/TipoDeDocumento/update'

  const dataFormulario = {
      id:dataTipo_DocumentoById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Tipo de Documento se actualizo con exito    .',
                  type: 'success',
              })
              datosTipo_Documento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Documento ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDocumento/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.data

  } catch (error) {
      console.error('error crear Tipo de Documento ', error)
  }

}
const eliminarTipo_Documento = async (id) => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDocumento/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el Tipo de Documento ',
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
                      datosTipo_Documento()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear Tipo de Documento ', error)
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
const datosTipo_Documento = async () => {

  const url = 'http://127.0.0.1:8000/api/TipoDeDocumento/datos'

  try {
      axios.get(url)
          .then(function (response) {
            Tipo_Documento.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Tipo de Documento ', error)
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
      console.error('error crear Tipo de Documento ', error)
  }


onMounted(() => {
     datosTipo_Documento()
})

</script>