<template>
  <q-page padding>
    <div class="fit row justify-center">
      <div class="col-12">
        <div class="row">
          <div class="col-12 text-center">
            <img
              src="../assets/logo.png"
              alt=""
              style="width: 40vw; height: 20vw"
            />
          </div>
        </div>
        <q-card flat>
          <q-card-section>
            <div class="row">
              <div class="col-6 col-md-4" v-if="this.numero_factura != null">
                Factura N°: {{ this.numero_factura }}
              </div>
              <div class="col-6 col-md-4" v-else>
                Orden de trabajo N°: {{ this.orden_trabajo }}
              </div>
              <div class="col-6 col-md-5">
                Condicion: {{ this.tipo_factura }}
              </div>
              <div class="col-12 col-md-3" v-if="this.numero_factura != null">
                Fecha emisión: {{ this.fecha_factura }}
              </div>
              <div class="col-12 col-md-3" v-else>
                Fecha emisión: {{ this.fecha_orden_trabajo }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-8">
                Nombre y apellido o razón social: {{ this.cliente }}
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-9">
                RIF, cédula de identidad o pasaporte N°: {{ this.cedula }}
              </div>
              <div class="col-12 col-md-3">Télefono: {{ this.telefono }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-mt-xs">
              <div class="col-12">
                <q-table
                  :rows="rows_tabla"
                  :columns="columns_tabla"
                  row-key="nombre"
                  :hide-pagination="true"
                  class="tabla-factura"
                  dense
                  :pagination="initialPagination"
                >
                </q-table>
              </div>
            </div>
            <div class="row q-mt-xs">
              <div class="col-12">
                <q-table
                  :rows="rows_pacientes"
                  :columns="columns_pacientes"
                  row-key="cedula"
                  :hide-pagination="true"
                  class="tabla-factura"
                  dense
                  :pagination="initialPagination"
                >
                </q-table>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-3" style="border: 1px solid #000">
                Total examenes: {{ this.cantidad }}
              </div>
              <div class="col-12 col-md-3" style="border: 1px solid #000">
                <div class="row">
                  <div class="col-1 q-mr-xs">NI:</div>
                  <div
                    class="col-1 q-mr-md"
                    v-for="orden in ordenes"
                    :key="orden.orden_numero"
                  >
                    {{ orden.orden_numero }}
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6" style="border: 1px solid #000">
                <div class="row">
                  <div class="col" v-for="pago in pagos" :key="pago.nombre">
                    {{ pago.nombre }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 col-md-4 q-mb-md q-mb-md-none">
                <div class="row">
                  <div class="col-12">
                    Subtotal $: {{ this.subtotal_dolares }}
                  </div>
                  <div class="col-12">
                    Descuento $: {{ this.descuento_dolares }}
                  </div>
                  <div class="col-12">
                    Valor total de la venta $:
                    {{ this.valor_total_venta_dolares }}
                  </div>
                  <div class="col-12" v-if="this.numero_factura != null">
                    IGTF percibido 3% $: {{ this.igtf_dolares }}
                  </div>
                  <div class="col-12" v-if="this.numero_factura != null">
                    Total a pagar $: {{ this.total_pagar_dolares }}
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 q-mb-md q-mb-md-none">
                <div class="col-12">
                  Subtotal COP: {{ this.subtotal_pesos }}
                </div>
                <div class="col-12">
                  Descuento COP: {{ this.descuento_pesos }}
                </div>
                <div class="col-12">
                  Valor total de la venta COP:
                  {{ this.valor_total_venta_pesos }}
                </div>
                <div class="col-12" v-if="this.numero_factura != null">
                  IGTF percibido 3% COP: {{ this.igtf_pesos }}
                </div>
                <div class="col-12" v-if="this.numero_factura != null">
                  Total a pagar COP: {{ this.total_pagar_pesos }}
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="col-12">Subtotal Bs: {{ this.subtotal_bs }}</div>
                <div class="col-12">
                  Descuento Bs: {{ this.descuento_bolivares }}
                </div>
                <div class="col-12">
                  Valor total de la venta Bs:
                  {{ this.valor_total_venta_bolivares }}
                </div>
                <div class="col-12" v-if="this.numero_factura != null">
                  IGTF percibido 3% Bs: {{ this.igtf_bs }}
                </div>
                <div class="col-12" v-if="this.numero_factura != null">
                  Total a pagar Bs: {{ this.total_pagar_bs }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  props: ["id"],

  data() {
    let enviar = {
      qr: "https://provida2qr-vue.herokuapp.com/factura/" + this.id,
    };

    let rows_tabla = ref([]);
    let rows_pacientes=ref([]);
    let igtf_bs;
    let igtf_dolares;
    let igtf_pesos;
    let cantidad;
    let cedula;
    let cliente;
    let descuento_bolivares;
    let descuento_dolares;
    let descuento_pesos;
    let fecha_factura;
    let fecha_orden_trabajo;
    let numero_factura;
    let orden_trabajo;
    let ordenes;
    let pagos;
    let telefono;
    let tipo_factura;
    let subtotal_bs;
    let subtotal_dolares;
    let subtotal_pesos;
    let valor_total_venta_bolivares;
    let valor_total_venta_pesos;
    let valor_total_venta_dolares;
    let total_pagar_bs;
    let total_pagar_dolares;
    let total_pagar_pesos;
    let cambio_bs;

    const ip = "https://provida2-qr.herokuapp.com/";

    const columns_tabla = [
      {
        name: "contador",
        required: true,
        label: "Cantidad",
        align: "left",
        field: (row) => row.item.contador,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "nombre",
        align: "left",
        label: "Descripción de la venta o prestación de servicio",
        field: (row) => row.item.nombre,
        sortable: true,
      },
      {
        name: "precio",
        align: "right",
        label: "Precio unitario Bs.",
        field: (row) =>
          Number(Math.round(row.item.precio * this.cambio_bs + "e+2") + "e-2"),
        sortable: true,
      },
      {
        name: "subtotal",
        align: "right",
        label: "Monto",
        field: (row) =>
          Number(
            Math.round(row.item.subtotal * this.cambio_bs + "e+2") + "e-2"
          ),
        sortable: true,
      },
    ];

    const columns_pacientes = [
      {
        name: "cedula",
        align: "left",
        label: "Cedula",
        field: (row) => row.paciente_cedula,
        sortable: true,
      },
      {
        name: "nombre",
        align: "left",
        label: "Nombre",
        field: (row) =>{
          return row.paciente_nombre + ' ' + row.paciente_apellido
        },
        sortable: true,
      },
    ];

    // BUSCA TODOS LOS DATOS DE LA FACTURA
    axios
      .post(ip + "buscarFactura", enviar)
      .then((response) => {
        console.log("el response", response.data, enviar);

        this.igtf_bs = response.data.IGTF_bolivares;
        this.igtf_dolares = response.data.IGTF_dolares;
        this.igtf_pesos = response.data.IGTF_pesos;
        this.cantidad = response.data.cantidad_items;
        this.cedula = response.data.cedula_RIF;
        this.cambio_bs = response.data.tasa_bolivar_dia;

        if (
          response.data.cliente_apellido == null ||
          response.data.cliente_apellido == "null"
        ) {
          this.cliente = response.data.cliente_nombre;
        } else {
          this.cliente =
            response.data.cliente_nombre + " " + response.data.cliente_apellido;
        }

        this.descuento_bolivares = response.data.descuento_bolivares;
        this.descuento_dolares = response.data.descuento_dolares;
        this.descuento_pesos = response.data.descuento_pesos;
        this.fecha_factura = response.data.fecha_creacion;
        this.fecha_orden_trabajo = response.data.fecha_creacion_orden_trabajo;
        this.rows_tabla = response.data.items;
        this.rows_pacientes= response.data.pacientes;
        this.numero_factura = response.data.numero_factura;
        this.orden_trabajo = response.data.orden_trabajo;
        this.ordenes = response.data.ordenes;
        this.pagos = response.data.pagos;
        this.telefono = response.data.telefono;
        this.tipo_factura = response.data.tipo_factura_nombre;
        if (this.tipo_factura == "ORDEN DE TRABAJO") {
          this.tipo_factura = "CONTADO";
        }
        this.total_bs = response.data.total_bolivares;
        this.total_dolares = response.data.total_dolares;
        this.total_pesos = response.data.total_pesos;
        this.subtotal_bs =
          response.data.descuento_bolivares +
          response.data.valor_total_venta_bolivares;
        this.subtotal_dolares =
          response.data.descuento_dolares +
          response.data.valor_total_venta_dolares;
        this.subtotal_pesos = response.data.descuento_pesos =
          response.data.valor_total_venta_pesos;
        this.valor_total_venta_bolivares =
          response.data.valor_total_venta_bolivares;
        this.valor_total_venta_pesos = response.data.valor_total_venta_pesos;
        this.valor_total_venta_dolares =
          response.data.valor_total_venta_dolares;
        this.total_pagar_bs = response.data.total_pagar_bolivares;
        this.total_pagar_dolares = response.data.total_pagar_dolares;
        this.total_pagar_pesos = response.data.total_pagar_pesos;
      })
      .finally(() => {});

    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0,
      },
      ip,
      enviar,
      rows_tabla,
      rows_pacientes,
      columns_tabla,
      columns_pacientes,
      igtf_bs,
      igtf_dolares,
      igtf_pesos,
      cantidad,
      cedula,
      cliente,
      descuento_bolivares,
      descuento_dolares,
      descuento_pesos,
      fecha_factura,
      fecha_orden_trabajo,
      numero_factura,
      orden_trabajo,
      ordenes,
      pagos,
      telefono,
      tipo_factura,
      subtotal_bs,
      subtotal_dolares,
      subtotal_pesos,
      valor_total_venta_bolivares,
      valor_total_venta_pesos,
      valor_total_venta_dolares,
      total_pagar_bs,
      total_pagar_dolares,
      total_pagar_pesos,
      cambio_bs,
    };
  },

  methods: {},
};
</script>
