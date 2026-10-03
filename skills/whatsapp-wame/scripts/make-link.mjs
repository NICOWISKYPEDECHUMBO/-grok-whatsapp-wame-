import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function makeLink(phone, message) {
  if (typeof phone !== 'string' || !/^\+?[\d\s().-]+$/.test(phone.trim())) throw new Error('Informe telefone com DDI; use apenas dígitos e caracteres de apresentação.');
  const digits = phone.replace(/[\s()+.\-]/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) throw new Error('O telefone deve ter DDI e 8 a 15 dígitos, sem prefixo 00.');
  if (typeof message !== 'string' || !message.trim()) throw new Error('A mensagem não pode estar vazia.');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [phone, flag, file] = process.argv.slice(2);
    if (flag !== '--text-file' || !file || process.argv.length !== 5) throw new Error('Uso: node make-link.mjs "+55..." --text-file "mensagem.txt"');
    const message = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
    process.stdout.write(makeLink(phone, message) + '\n');
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
