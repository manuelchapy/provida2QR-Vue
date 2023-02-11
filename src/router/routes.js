const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/factura/:id",
        name: "Factura",
        component: () => import("pages/Factura.vue"),
        props: true,
      },
      {
        path: "/resultado/:id",
        name: "Resultados",
        component: () => import("pages/Resultados.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
