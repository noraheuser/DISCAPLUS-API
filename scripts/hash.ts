import * as bcrypt from 'bcrypt';

async function main() {
  const plainPassword = '1234'; // 👈 aquí defines la contraseña en texto plano
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log('Hash generado para', plainPassword, '=>');
  console.log(hash);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
