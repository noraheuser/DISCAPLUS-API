export function normalizarRut(rut: string): string {
  if (!rut) return '';

  // 1) sacamos puntos y guiones
  const limpio = rut.replace(/\./g, '').replace(/-/g, '');

  // 2) cuerpo y dígito verificador
  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  // 3) devolvemos sin puntos, con guion
  return `${cuerpo}-${dv}`;
}
