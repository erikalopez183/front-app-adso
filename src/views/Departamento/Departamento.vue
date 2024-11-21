<template>
  <LayoutMain>
      <template #slotLayout>
        <Header :titulo="'Departamento'" :tituloBoton="'Crear Departamento'" :abrir="abrirFormulario" />


      <Formulario :titulo="'Gestion de Departamento'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
              @save="guardarDatos" @update="actualizarDatos">
              <template #slotForm>
                  <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                          <FormDepartamento v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                              :paises="paises" :dataValue="dataDepartamentoById" />
                      </el-col>
                  </el-row>
              </template>

          </Formulario>

          <el-table :data="Departamento" stripe style="width: 100%">
              <el-table-column prop="nombre" label="nombre" />
               <el-table-column prop="id_pais" label="Pais" />
              <el-table-column fixed="right" label="Acciones" min-width="120">
                  <template #default="registro">
                      <el-button link type="primary" size="large" :icon="Edit"
                          @click="editarFormulario(registro.row.id)">
                      </el-button>
                      <el-button link type="danger" :icon="Delete"
                          @click="eliminarDepartamento(registro.row.id)"></el-button>
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
import FormDepartamento from './components/formDepartamento.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';


const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataDepartamentoById = ref()
const paises = ref([])
const Departamento = ref([])


const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataDepartamentoById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await crearDepartamento()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
      await actualizarDepartamento()
  }
}

const crearDepartamento = async () => {

  const url = 'http://127.0.0.1:8000/api/Departamento/save'

  const dataFormulario = {
      nombre: formRef.value.formulario.nombre,
      id_pais: formRef.value.formulario.idPais
  }
  try {
      axios.post(url, dataFormulario)
          .then(function (response) {
           //   console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Departamento se creo con exito    .',
                  type: 'success',
              })
              datosDepartamento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Departamento ', error)
  }
}

const actualizarDepartamento = async () => {

  const url = 'http://127.0.0.1:8000/api/Departamento/update'

  const dataFormulario = {
      id:dataDepartamentoById.value[0].id,
      nombre: formRef.value.formulario.nombre,
      id_pais: formRef.value.formulario.idPais
  }
  try {
      axios.put(url, dataFormulario)
          .then(function (response) {
              console.log(response);
              formRef.value?.limpiarFormulario()
              ElMessage({
                  message: 'El Departamento se actualizo con exito    .',
                  type: 'success',
              })
              datosDepartamento()
              mostrarFormulario.value = false

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Departamento ', error)
  }

}

const datosById = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Departamento/datosById'

  try {
      const response = axios.get(url, {
          params: {
              id: id
          }
      })
      return (await response).data.data

  } catch (error) {
      console.error('error crear Departamento ', error)
  }

}
const eliminarDepartamento = async (id) => {

  const url = 'http://127.0.0.1:8000/api/Departamento/delete'

  ElMessageBox.confirm(
      'Esta seguro de eliminar el Departamento ',
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
                      datosDepartamento()

                  })
                  .catch(function (error) {
                      console.log(error);
                  });

          } catch (error) {
              console.error('error crear Departamento ', error)
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
const datosDepartamento = async () => {

  const url = 'http://127.0.0.1:8000/api/Departamento/datos'

  try {
      axios.get(url)
          .then(function (response) {
            Departamento.value = response.data.result
             // console.log(response);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Departamento ', error)
  }


}
const getPais = async () => {

  const url = 'http://127.0.0.1:8000/api/Pais/datos'

  try {
      axios.get(url)
          .then(function (response) {
              paises.value = response.data.result
              console.log(paises.value);

          })
          .catch(function (error) {
              console.log(error);
          });

  } catch (error) {
      console.error('error crear Departamento ', error)
  }




}

onMounted(() => {
  getPais()
  datosDepartamento()
})

</script>