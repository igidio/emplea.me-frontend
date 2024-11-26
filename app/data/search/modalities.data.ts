import type {ModalitiesInterface} from "~/interfaces/search-model.interface";

export default [
  {
    id: 1,
    name: "Día completo",
    active: false,
  },
  {
    id: 2,
    name: "Día por medio",
    active: false,
  },

  {
    id: 3,
    name: "Medio tiempo",
    active: false,
  },
  {
    id: 4,
    name: "Cama adentro",
    active: false,
  },
  {
    id: 5,
    name: "Por horas",
    active: false,
  },
  {
    id: 6,
    name: "Fines de semana",
    active: false,
  },
] satisfies ModalitiesInterface[];
