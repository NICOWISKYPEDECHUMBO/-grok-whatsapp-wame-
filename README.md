# WhatsApp por wa.me no Grok Bot

Esta é a versão **wa.me**, para você colocar no GitHub e fornecer ao **Grok Bot do PC**. Não usa WAME API, chave Meta ou um MCP próprio.

## Como funciona

Você pede a mensagem → a skill prepara o link wa.me → o Bot abre o WhatsApp → confere o telefone e o texto → envia pela interface, conforme sua autorização.

O link wa.me apenas abre uma conversa com texto preenchido. Para concluir o envio, o Bot precisa ter controle de navegador/computador e uma sessão autenticada do WhatsApp. Se esse acesso não estiver disponível, a skill entrega o link para você enviar manualmente.

## 1. Subir no GitHub

1. Extraia o ZIP.
2. No GitHub, crie um repositório chamado `grok-whatsapp-wame`.
3. Use **Add file → Upload files** e envie o conteúdo da pasta extraída. Preserve a estrutura abaixo. Você também pode fazer isso com GitHub Desktop.
4. Confira que `skills/whatsapp-wame/SKILL.md` está acessível no repositório e conclua o commit.

```text
grok-whatsapp-wame/
├── README.md
├── plugin.json
├── .gitignore
└── skills/
    └── whatsapp-wame/
        ├── SKILL.md
        └── scripts/
            └── make-link.mjs
```

Publique somente esses arquivos. Mantenha listas reais de clientes, mensagens privadas e registros de envio fora do repositório público. O `.gitignore` ajuda no uso de Git; ele não impede upload manual de arquivos pela página do GitHub.

## 2. Carregar no Grok Bot do PC

Abra uma conversa com seu Bot e cole o texto abaixo, trocando `SEU_USUARIO`:

> Leia o repositório https://github.com/SEU_USUARIO/grok-whatsapp-wame, especialmente skills/whatsapp-wame/SKILL.md. Salve essas instruções como uma skill privada chamada whatsapp-wame. Se você tiver acesso a arquivos e Node.js, disponibilize também o helper scripts/make-link.mjs. Use suas ferramentas de navegador/computador para abrir links wa.me e operar o WhatsApp. Primeiro prepare uma prévia; não envie nenhuma mensagem neste teste. Informe se a skill foi salva e se você consegue controlar o WhatsApp Web nesta sessão.

A documentação do Grok Bot descreve salvar skills a partir de uma conversa. **Não está confirmado que o aplicativo instala automaticamente este repositório como plugin pelo URL.** O texto acima pede ao Bot para ler os arquivos e salvar a skill; verifique a resposta e a biblioteca de skills.

Se ele não conseguir acessar o repositório, anexe o `SKILL.md` ou cole seu conteúdo e peça para salvá-lo. Em repositório privado, conceda acesso pelo conector GitHub da sua conta ou use o arquivo local. Não cole token GitHub no chat.

Confira em **Marketplace → Your plugins → Manage plugins and skills → Private skills** e procure `whatsapp-wame`. Use `/` no compositor para selecioná-la. Os nomes e a disponibilidade das opções podem variar conforme sua versão/conta. Se o Bot não conseguir salvar a skill, use as instruções na conversa atual sem afirmar que houve instalação permanente.

O `plugin.json` identifica o pacote para ambientes que aceitam esse formato; ele não dá acesso ao navegador ou ao WhatsApp. Você não precisa configurar os comandos `grok plugin install` para este procedimento no Bot.

## 3. Usar

Primeiro conecte seu WhatsApp Web no navegador que o Bot consegue controlar. Faça o login/QR Code pessoalmente quando solicitado.

Pedido de prévia:

> Use /whatsapp-wame. Prepare uma mensagem da minha loja para este contato que autorizou receber ofertas: [telefone com DDI]. Oferta: [descrição e validade]. Mostre a mensagem e o link, sem enviar.

Depois de revisar:

> Envie exatamente essa mensagem para esse número pelo WhatsApp Web.

Para uma lista:

> Use /whatsapp-wame. Leia a lista local de contatos autorizados e a lista de quem pediu saída. Prepare a campanha [nome] com [oferta]. Mostre os destinatários e a mensagem final para eu revisar antes do envio. Registre o resultado de cada contato em arquivo privado.

A skill orienta a conferência e o registro. Ela não instala um serviço de disparo em segundo plano e não possui deduplicação automática própria. O Bot precisa seguir as instruções e consultar seu registro/conversa. Pedidos de saída devem ser mantidos pelo atendimento; a skill não monitora mensagens sozinha.

## Helper opcional para links

Se houver Node.js instalado, salve o texto em um arquivo UTF-8 e execute:

```powershell
node .\skills\whatsapp-wame\scripts\make-link.mjs "+55 (11) 99999-9999" --text-file "C:\pasta-privada\mensagem.txt"
```

Troque o telefone de exemplo pelo destinatário correto. O resultado é um link. O helper não acessa o WhatsApp nem envia. Usar um arquivo evita problemas de aspas, acentos e caracteres especiais no terminal.

## Verificação

O helper foi verificado localmente para normalização de números, codificação de acentos, emoji, quebras de linha e rejeição de entradas inválidas. Não foi instalado/testado na sua conta Grok e nenhuma mensagem real foi enviada.

## Fontes

- [WhatsApp: links wa.me e texto preenchido](https://faq.whatsapp.com/5913398998672934)
- [Grok Bot: salvar e usar skills](https://docs.x.ai/grok-bot/skills-routines-and-automations)
- [Grok Build: estrutura de skills/plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces)
