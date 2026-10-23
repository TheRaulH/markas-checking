const h = (min) => new Date(Date.now() - min * 60000).toISOString()

export const DEMO = [
  ['María Fernanda Suárez Roca', 2, '76543210'],
  ['Carlos Eduardo Vaca Díez', 1, '71234567'],
  ['Lucía Montaño Pereira', 2, '70011223'],
  ['Jorge Luis Antelo', 3, '69988776'],
  ['Ana Paola Justiniano', 1, '77889900'],
  ['Roberto Chávez Terrazas', 2, '72345678'],
  ['Daniela Salvatierra', 2, '73456789'],
  ['Miguel Ángel Parada', 1, '74567890'],
  ['Silvia Rojas Cuéllar', 2, '75678901'],
  ['Héctor Flores Banzer', 1, '76789012'],
].map(([nombre, cantidad, telefono], i) => ({
  row: i + 2,
  marca: h(3000 - i * 40),
  nombre,
  cantidad,
  telefono,
  estado: 'Pendiente',
  asesor: '',
  acompanantes: '',
  regaloTitular: '',
  regaloAcomp: '',
  horaIngreso: '',
  horaSalida: '',
}))
