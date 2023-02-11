<template>
  <q-page>
    <!-- ---------LOS RESULTADOS------------ -->
    <q-card class="text-caption">
      <q-card-section class="q-pb-none">
        <div class="row">
          <div class="col-12 text-center">
            <img
              src="../assets/logo.png"
              style="width: 40vw; height: 20vw"
              alt=""
            />
          </div>
          <div class="col-12 col-md-8">
            <div class="row text-subtitle1">
              <div class="col-12">
                Laboratorio Clinico PROVIDA C.A. |
                <span class="text-bold"
                  >Orden {{ this.paciente.numero_orden }}</span
                >
              </div>
              <div class="col-12">
                Fecha: {{ this.paciente.fecha }} | Procedencia: particular
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row text-subtitle1">
          <div class="col-12">
            Paciente: {{ this.paciente.paciente_nombre }}
            {{ this.paciente.paciente_apellido }} | Edad:
            {{ this.paciente.edad }}
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!--!!!!!!! EXAMENES !!!!!!!-->
      <q-card-section>
        <div class="row" v-if="this.examenes != null">
          <div class="col-12 text-center text-body1 text-weight-bold">
            EXAMENES
          </div>
        </div>

        <!-- EL FOR DE LOS DEPARTAMENTOS -->
        <div
          class="row text-body2"
          v-for="departamento in examenes"
          :key="departamento.departamento_nombre"
        >
          <div
            class="col-5"
            v-if="departamento.departamento_nombre != 'COPROANALISIS'"
          >
            {{ departamento.departamento_nombre }}
          </div>
          <!-- LOS DEL DEPARTAMENTO DE COPROANALISIS NO TIENEN VALOR DE REFERENCIA-->
          <div
            class="col-3"
            v-if="departamento.departamento_nombre != 'COPROANALISIS'"
          >
            Resultado
          </div>
          <div
            class="col-4"
            v-if="departamento.departamento_nombre != 'COPROANALISIS'"
          >
            Valor de referencia
          </div>

          <div class="col-12">
            <!-- EL FOR DE EXAMENES POR DEPARTAMENTO -->
            <div
              class="row q-mb-md"
              v-for="examenes in departamento.examenes"
              :key="examenes.examen.id_examen"
            >
              <div class="col-12 text-weight-bold">
                {{ examenes.examen.examen_nombre }}
              </div>

              <!--!!! SI ESTAN FIRMADOS APARECEN !!!!-->
              <template
                v-if="
                  examenes.examen.id_usuario != null &&
                  examenes.examen.id_usuario != null
                "
              >
                <!-- PARA EL EXAMEN WIDAL-->
                <div class="row" v-if="examenes.examen.id_examen == 416">
                  <div class="col-12 text-bold"><u>POSITIVO PARA</u></div>
                  <div
                    class="col-12"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <template v-if="pruebas.resultado != 0">
                        <div class="row q-ml-md">
                          <div class="col-6">
                            {{ pruebas.prueba_nombre }}
                          </div>
                          <div class="col-6 text-bold">
                            {{ pruebas.resultado }}
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                  <div class="col-12 text-bold q-mt-md">
                    <u>NEGATIVO PARA</u>
                  </div>
                  <div
                    class="col-12"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <template v-if="pruebas.resultado == 0">
                        <div class="row q-ml-md">
                          <div class="col-12">
                            {{ pruebas.prueba_nombre }}
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>

                <!-- EL FORMATO POSITIVO NEGATIVO-->
                <div
                  class="row"
                  v-if="
                    examenes.examen.id_examen == 39 ||
                    examenes.examen.id_examen == 319
                  "
                >
                  <div class="col-12 text-bold"><u>POSITIVO PARA</u></div>
                  <div
                    class="col-12"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <template
                        v-if="
                          pruebas.resultado == 'P' || pruebas.resultado == 'p'
                        "
                      >
                        <div class="row q-ml-md">
                          <div class="col-6">
                            {{ pruebas.prueba_nombre }}
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                  <div class="col-12 text-bold q-mt-md">
                    <u>NEGATIVO PARA</u>
                  </div>
                  <div
                    class="col-12"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <template
                        v-if="
                          pruebas.resultado == 'N' || pruebas.resultado == 'n'
                        "
                      >
                        <div class="row q-ml-md">
                          <div class="col-12">
                            {{ pruebas.prueba_nombre }}
                          </div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>

                <!-- PARA EL EXAMEN UROANALISIS -->
                <div class="row" v-else-if="examenes.examen.id_examen == 426">
                  <!-- COLUMNA DE FISICO/QUIMICOS -->
                  <div class="col-6">
                    <div class="row">
                      <div class="col-12"><u>FISICO/QUIMICOS</u></div>
                      <template
                        v-for="pruebas in examenes.examen.pruebas"
                        :key="pruebas.id_detalle_examen_prueba"
                      >
                        <div
                          class="col-12"
                          v-if="
                            pruebas.id_prueba != 780 &&
                            pruebas.id_prueba != 760 &&
                            pruebas.id_prueba != 684 &&
                            pruebas.id_prueba != 1181 &&
                            pruebas.id_prueba != 1182 &&
                            pruebas.id_prueba != 1183 &&
                            pruebas.id_prueba != 1178 &&
                            pruebas.id_prueba != 1156
                          "
                        >
                          <div class="row">
                            <div class="col-6">
                              {{ pruebas.prueba_nombre }}
                            </div>
                            <div class="col-6 text-bold">
                              {{ pruebas.resultado }}
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row">
                      <div class="col-12 q-mt-md"><u>SEDIMENTO</u></div>
                      <template
                        v-for="pruebas in examenes.examen.pruebas"
                        :key="pruebas.id_detalle_examen_prueba"
                      >
                        <div
                          class="col-12"
                          v-if="
                            pruebas.id_prueba == 780 ||
                            pruebas.id_prueba == 760 ||
                            pruebas.id_prueba == 684 ||
                            pruebas.id_prueba == 1181 ||
                            pruebas.id_prueba == 1182 ||
                            pruebas.id_prueba == 1183 ||
                            pruebas.id_prueba == 1178 ||
                            pruebas.id_prueba == 1156
                          "
                        >
                          <div class="row">
                            <div class="col-6">
                              {{ pruebas.prueba_nombre }}
                            </div>
                            <div class="col-6 text-bold">
                              {{ pruebas.resultado }}
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>

                <!-- PARA EL EXAMEN COPROANALISIS -->
                <div
                  class="col-12"
                  v-else-if="examenes.examen.id_examen == 143"
                >
                  <div class="row">
                    <template
                      v-for="pruebas in examenes.examen.pruebas"
                      :key="pruebas.id_detalle_examen_prueba"
                    >
                      <template
                        v-if="
                          pruebas.id_prueba != 780 &&
                          pruebas.id_prueba != 686 &&
                          pruebas.id_prueba != 687 &&
                          pruebas.id_prueba != 792
                        "
                      >
                        <div class="col-6">
                          <div class="row">
                            <div class="col-6">
                              {{ pruebas.prueba_nombre }}
                            </div>
                            <div class="col-6 text-bold">
                              {{ pruebas.resultado }}
                            </div>
                          </div>
                        </div>
                      </template>
                    </template>
                    <div class="col-12">
                      <div class="row">
                        <div class="col-6">
                          <div class="row">
                            <template
                              v-for="pruebas in examenes.examen.pruebas"
                              :key="pruebas.id_detalle_examen_prueba"
                            >
                              <template
                                v-if="
                                  pruebas.id_prueba == 780 &&
                                  pruebas.id_prueba != 792
                                "
                              >
                                <div class="col-6">
                                  {{ pruebas.prueba_nombre }}
                                </div>
                                <div class="col-6 text-bold">
                                  {{ pruebas.resultado }}
                                </div>
                              </template>
                            </template>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row">
                            <template
                              v-for="pruebas in examenes.examen.pruebas"
                              :key="pruebas.id_detalle_examen_prueba"
                            >
                              <template
                                v-if="
                                  (pruebas.id_prueba == 686 ||
                                    pruebas.id_prueba == 687) &&
                                  pruebas.id_prueba != 792
                                "
                              >
                                <div class="col-2">
                                  {{ pruebas.prueba_nombre }}
                                </div>
                                <div class="col-2 text-bold">
                                  {{ pruebas.resultado }}
                                </div>
                              </template>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="row">
                        <template
                          v-for="pruebas in examenes.examen.pruebas"
                          :key="pruebas.id_detalle_examen_prueba"
                        >
                          <template v-if="pruebas.id_prueba == 792">
                            <div class="col-2">
                              {{ pruebas.prueba_nombre }}
                            </div>
                            <div class="col-10 text-bold">
                              {{ pruebas.resultado }}
                            </div>
                          </template>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- PARA LOS EXAMENES DESCRIPTIVOS SIN VALOR DE REFERENCIA -->
                <div
                  class="col-12"
                  v-else-if="
                    examenes.examen.id_examen == 201 ||
                    examenes.examen.id_examen == 341 ||
                    examenes.examen.id_examen == 170 ||
                    examenes.examen.id_examen == 63 ||
                    examenes.examen.id_examen == 83 ||
                    examenes.examen.id_examen == 123 ||
                    examenes.examen.id_examen == 510 ||
                    examenes.examen.id_examen == 116 ||
                    examenes.examen.id_examen == 415 ||
                    examenes.examen.id_examen == 214 ||
                    examenes.examen.id_examen == 146 ||
                    examenes.examen.id_examen == 147 ||
                    examenes.examen.id_examen == 212 ||
                    examenes.examen.id_examen == 93 ||
                    examenes.examen.id_examen == 118 ||
                    examenes.examen.id_examen == 119 ||
                    examenes.examen.id_examen == 120 ||
                    examenes.examen.id_examen == 125 ||
                    examenes.examen.id_examen == 126 ||
                    examenes.examen.id_examen == 127 ||
                    examenes.examen.id_examen == 150 ||
                    examenes.examen.id_examen == 289 ||
                    examenes.examen.id_examen == 121 ||
                    examenes.examen.id_examen == 83
                  "
                >
                  <div
                    class="row"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <!-- EXAMENES DE FORMATO COMUN-->
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <div class="col-5">
                        {{ pruebas.prueba_nombre }}
                      </div>
                      <div class="col-7">
                        {{ pruebas.resultado }}
                      </div>
                    </template>
                  </div>
                </div>

                <!-- PARA LOS EXAMENES DE FORMATO COMUN-->
                <div class="col-12" v-else>
                  <div
                    class="row"
                    v-for="pruebas in examenes.examen.pruebas"
                    :key="pruebas.id_detalle_examen_prueba"
                  >
                    <!-- EXAMENES DE FORMATO COMUN-->
                    <template
                      v-if="
                        pruebas.resultado != null &&
                        pruebas.resultado != '' &&
                        pruebas.resultado != 'NaN'
                      "
                    >
                      <div class="col-5">
                        {{ pruebas.prueba_nombre }}
                      </div>
                      <div class="col-3">
                        {{ pruebas.resultado }}
                        <span
                          v-html="pruebas.unidad"
                          v-if="pruebas.unidad != '-'"
                        ></span>
                      </div>
                      <div class="col-4">
                        <p
                          class="q-mb-none"
                          v-html="pruebas.valor_de_referencia"
                        ></p>
                      </div>
                    </template>
                  </div>
                </div>

                <!-- REFERENCIA DEL EXAMEN -->
                <div
                  class="col-12 q-mt-sm text-italic"
                  v-if="
                    examenes.examen.examen_referencia != null &&
                    examenes.examen.examen_referencia != 'null' &&
                    examenes.examen.examen_referencia != ''
                  "
                >
                  {{ examenes.examen.examen_referencia }}
                </div>

                <!-- OBSERVACION DEL EXAMEN -->
                <div
                  class="col-12 q-mt-sm"
                  v-if="
                    examenes.examen.comentario != null &&
                    examenes.examen.comentario != 'null' &&
                    examenes.examen.comentario != ''
                  "
                >
                  <span class="text-weight-bold">Observacion:</span>
                  {{ examenes.examen.comentario }}
                </div>
              </template>

              <template v-else>
                <div class="row">
                  <div class="col-12">En proceso...</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator v-if="this.cultivos.length != 0 && this.examenes != null" />

      <!-- !!!!!!!! CULTIVOS !!!!!!!!!-->
      <q-card-section>
        <div class="row" v-if="this.cultivos.length != 0">
          <div class="col-12 text-center text-body1 text-weight-bold">
            CULTIVOS
          </div>
        </div>

        <template v-for="cultivo in cultivos" :key="cultivo.id_detalle_orden">
          <div class="row">
            <div class="col-12 text-subtitle1 text-bold">
              {{ cultivo.cultivo_nombre }}
            </div>
          </div>

          <template
            v-if="cultivo.id_usuario != null && cultivo.id_usuario != 'null'"
          >
            <template
              v-for="bacteria in cultivo.bacterias"
              :key="bacteria.bacteriaItem.id_bacteria"
            >
              <div
                class="row text-body2 q-mb-md"
                v-if="Object.keys(bacteria).toString() != 'nulo'"
              >
                <div class="col-12">
                  <div class="row">
                    <div class="col-12"><u>Microorganismo aislado:</u></div>
                    <div class="col-12 text-bold">
                      {{ bacteria.bacteriaItem.bacteria_nombre }}
                    </div>

                    <div class="col-12 text-bold">SENSIBLE</div>
                    <div
                      class="col-6"
                      v-for="antibiotico in bacteria.bacteriaItem.sensible"
                      :key="antibiotico.id_antibiotico"
                    >
                      - {{ antibiotico.antibiotico_nombre }}
                    </div>
                    <div
                      class="col-12"
                      v-if="bacteria.bacteriaItem.sensible.length == 0"
                    >
                      No se observo sensibilidad a ninguno de los antibioticos
                      ensayados
                    </div>

                    <div
                      class="col-12 text-bold"
                      v-if="bacteria.bacteriaItem.intermedio.length != 0"
                    >
                      INTERMEDIO
                    </div>
                    <div
                      class="col-6"
                      v-for="antibiotico in bacteria.bacteriaItem.intermedio"
                      :key="antibiotico.id_antibiotico"
                    >
                      - {{ antibiotico.antibiotico_nombre }}
                    </div>

                    <div class="col-12 text-bold">RESISTENTE</div>
                    <div
                      class="col-6"
                      v-for="antibiotico in bacteria.bacteriaItem.resistente"
                      :key="antibiotico.id_antibiotico"
                    >
                      - {{ antibiotico.antibiotico_nombre }}
                    </div>
                    <div
                      class="col-12"
                      v-if="bacteria.bacteriaItem.resistente.length == 0"
                    >
                      No se observo resistencia a ninguno de los antibioticos
                      ensayados
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <div
              class="row"
              v-if="cultivo.comentario != null && cultivo.comentario != 'null'"
            >
              <div class="col-12 text-body2">
                {{ cultivo.comentario }}
              </div>
            </div>
          </template>

          <template v-else>
            <div class="row text-body2">
              <div class="col-12">
                En proceso...
              </div>
            </div>
          </template>
        </template>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row text-body2">
          <div class="col-12">
            Provida 1: Av. Lucio Oquendo, Qta. Saimi N° 5-60, La Concordia. Tel:
            0276-3465389
            <br />
            Provida 2: Calle Albarico con Av. Francisco Cardenas, Barrio Obrero
            sector El Cafetal. Tel: 0414-0757356
          </div>
          <!----<div class="col-12 text-subtitle1">
            <div class="row justify-end">
              <div class="col-1">Lcdo.</div>
              <template v-for="firma in firmas" :key="firma.id_usuario">
                <div class="col-2" v-if="firma.id_usuario == 19">
                  <img
                    src="../assets/firma-ana.jpeg"
                    style="width: 120px; height: 70px"
                    alt=""
                  />
                </div>
                <div class="col-2" v-if="firma.id_usuario == 16">
                  <img
                    src="../assets/firma-astrid.jpeg"
                    style="width: 120px; height: 70px"
                    alt=""
                  />
                </div>
              </template>
            </div>
          </div>-->
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  props: ["id"],

  data() {
    let paciente = ref({});
    let examenes = ref(null);
    let cultivos = ref([]);
    let enviar = {
      qr: "https://provida2qr-vue.herokuapp.com/resultado/" + this.id,
    };

    const ip = "https://provida2-qr.herokuapp.com/";

    const columns_pagos = [
      {
        name: "monto",
        required: true,
        label: "Monto",
        align: "left",
        field: (row) => row.monto,
        sortable: true,
      },
      {
        name: "divisa_nombre",
        align: "left",
        label: "Divisa",
        field: "divisa_nombre",
        sortable: true,
      },
      {
        name: "tipo_pago_nombre",
        align: "left",
        label: "Modo de pago",
        field: "tipo_pago_nombre",
        sortable: true,
      },
      {
        name: "banco_nombre",
        align: "left",
        label: "Banco",
        field: "banco_nombre",
        sortable: true,
      },
      {
        name: "numero_referencia",
        align: "left",
        label: "Numero de referencia",
        field: "numero_referencia",
        sortable: true,
      },
      {
        name: "igtf_pago",
        align: "left",
        label: "Tipo de pago",
        field: (row) => {
          if (row.igtf_pago == "0") {
            if (row.tipo_registro == "1") {
              return "VUELTOS";
            } else {
              return "PAGO";
            }
          } else {
            return "IGTF";
          }
        },
        sortable: true,
      },
    ];

    // BUSCA TODOS LOS DATOS DE LA FACTURA
    axios
      .post(ip + "buscarResultado", enviar)
      .then((response) => {
        console.log("el response", response.data, enviar);
        paciente.value = response.data[0].datosPaciente[0];
        console.log(response.data.length);

        for (let i = 0; i < response.data.length; i++) {
          console.log("ENTRO!!!");
          if (response.data[i].tipo == 1) {
            console.log("ES TIPO 1");
            examenes.value = response.data[i].resultados;
          } else if (response.data[i].tipo == 2) {
            console.log("ES TIPO 2");
            cultivos.value = [
              ...cultivos.value,
              response.data[i].resultados[0],
            ];
          }
        }

        console.log("LOS EXAMENES", examenes.value);
        console.log("LOS CULTIVOS", cultivos.value);
        console.log("EL PACIENTE", paciente.value);
      })
      .finally(() => {});

    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5,
      },
      ip,
      enviar,
      examenes,
      cultivos,
      paciente,
    };
  },

  methods: {},
};
</script>
